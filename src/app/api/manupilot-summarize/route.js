// API for OpenAI summarization (ManuPilot)
// Called when the conversation exceeds the token limit.
// The AI summarizes the entire conversation, allowing users to continue chatting.

import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const MAX_PROMPT_TOKENS = 100000; // Token limit before summarization

export async function POST(req) {
  try {
    const { messages } = await req.json();

    // Validate messages
    if (!messages || !Array.isArray(messages)) {
      console.error("Invalid messages structure:", messages);
      return new Response(
        JSON.stringify({ error: "Messages must be a valid array" }),
        {
          status: 400,
        }
      );
    }

    // Approximate token usage
    let tokenCount = approximateTokenCount(messages);

    if (tokenCount > MAX_PROMPT_TOKENS) {
      // Summarize if toke count exceeds the limit
      const shortened = await summarizeIfNeeded(messages);
      tokenCount = approximateTokenCount(shortened);

      if (tokenCount > MAX_PROMPT_TOKENS) {
        return new Response(
          JSON.stringify({
            error: `Even after summarizing, we still exceed ${MAX_PROMPT_TOKENS} tokens.`,
          }),
          { status: 400 }
        );
      }

      // Generate AI response with the summarized conversation
      const chatCompletion = await openai.chat.completions.create({
        //  model: "chatgpt-4o-latest",
        model: "gpt-4o-mini",
        messages: shortened,
      });
      return new Response(JSON.stringify(chatCompletion.choices[0].message), {
        status: 200,
      });
    } else {
      // If token count is within limits, proceed normally
      const chatCompletion = await openai.chat.completions.create({
        // model: "chatgpt-4o-latest",
        model: "gpt-4o-mini",
        messages,
      });
      return new Response(JSON.stringify(chatCompletion.choices[0].message), {
        status: 200,
      });
    }
  } catch (error) {
    console.error("Error in /api/manupilot-summarize:", error);

    // Handle OpenAI-specific errors
    if (error instanceof OpenAI.APIError) {
      return new Response(
        JSON.stringify({
          status: error.status,
          message: error.message,
          code: error.code,
          type: error.type,
        }),
        { status: error.status || 500 }
      );
    }
    return new Response(
      JSON.stringify({ error: "An error occurred", details: error.message }),
      { status: 500 }
    );
  }
}

/**
 * Summarizes conversation by keeping only the last 20 messages.
 * This prevents hitting token limits while maintaining context.
 */
function summarizeIfNeeded(messages) {
  return messages.slice(-8);
}

/**
 * Approximates the token count for messages.
 * Assumes ~4 characters per token.
 */
function approximateTokenCount(messages) {
  if (!Array.isArray(messages)) {
    throw new TypeError("Messages must be an array to count tokens.");
  }

  let totalChars = 0;
  for (const msg of messages) {
    if (msg?.content) {
      totalChars += msg.content.length;
    }
  }
  return Math.floor(totalChars / 4);
}
