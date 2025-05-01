// ManuPilot AI route

// // API route for OpenAI (ManuPilot AI)
// // Supports streaming responses & token count limit enforcement

// ────────────────────────────────────────────────────────────────
// 1. 30-messages / 2-hour quota  (checkAndCount)
// 2. Token-limit + summarisation fallback
// 3. Streaming response with quota headers
// ----------------------------------------------------------------

export const runtime = "nodejs";

import OpenAI from "openai";
import { checkAndCount } from "@/utils/quota";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const MAX_TOKENS_FOR_PROMPT = 100_000; // summarise threshold

/* rough 1 token ≈ 4 chars */
const approxTokens = (msgs = []) =>
  Math.floor(msgs.reduce((sum, m) => sum + (m?.content?.length || 0), 0) / 4);

export async function POST(req) {
  /* ── Parse body early ─────────────────────────────────────── */
  let body;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }
  const { messages } = body;
  if (!Array.isArray(messages)) {
    return json({ error: "messages must be an array" }, 400);
  }

  /* ── Quota check (increments counter on success) ─────────── */
  const quota = await checkAndCount();
  if (!quota.allowed) {
    return json(
      {
        error: "Quota exceeded – come back later.",
        resetAt: quota.resetAt.toISOString(),
      },
      429,
      quota
    );
  }

  /* ── Summarisation shortcut if >100 k tokens ─────────────── */
  const tokenCount = approxTokens(messages);
  if (tokenCount > MAX_TOKENS_FOR_PROMPT) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/manupilot-summarize`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages }),
      }
    );

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return json(
        { error: data.error || "Summarisation failed" },
        res.status,
        quota
      );
    }
    return json(data, 200, quota); // { role, content }
  }

  /* ── Normal streaming request to OpenAI ──────────────────── */
  const chat = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages,
    stream: true,
  });

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const part of chat) {
          const chunk = part.choices?.[0]?.delta?.content || "";
          if (chunk) controller.enqueue(encoder.encode(chunk));
        }
      } catch (e) {
        controller.error(e);
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "X-Quota-Remaining": String(quota.remaining),
      "X-Quota-Reset": quota.resetAt.toISOString(),
    },
  });
}

/* helper */
function json(obj, status = 200, quota = null) {
  const headers = { "Content-Type": "application/json" };
  if (quota) {
    headers["X-Quota-Remaining"] = String(quota.remaining);
    headers["X-Quota-Reset"] = quota.resetAt.toISOString();
  }
  return new Response(JSON.stringify(obj), { status, headers });
}
