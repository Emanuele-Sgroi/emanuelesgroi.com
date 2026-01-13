import { PrismaClient } from "@prisma/client";
import { getUserIdServer } from "./getUserId";

const prisma = new PrismaClient();

const LIMIT = 31; // messages per window
const WINDOW_MS = 3 * 60 * 60 * 1000; // 3 hours rolling window

/** ------------------------------------------------------------------
 *  checkAndCount(increment = 1)
 *  ──────────────────────────────────────────────────────────────────
 *  Returns { allowed, remaining, resetAt } and – if `increment > 0`
 *  – adds that many messages to the user’s counter.
 * ---------------------------------------------------------------- */
export async function checkAndCount(increment = 1) {
  const userId = await getUserIdServer();
  const now = new Date();

  // Ensure a row exists
  let usage = await prisma.manuUsage.upsert({
    where: { userId },
    update: {},
    create: { userId, windowStart: now, messageCount: 0 },
  });

  /* ── reset window if expired ───────────────────────────── */
  const age = now.getTime() - usage.windowStart.getTime();
  if (age > WINDOW_MS) {
    usage = await prisma.manuUsage.update({
      where: { userId },
      data: { messageCount: 0, windowStart: now },
    });
  }

  /* ── still within current window ───────────────────────── */
  const wouldBe = usage.messageCount + increment;
  const resetAt = new Date(usage.windowStart.getTime() + WINDOW_MS);

  if (wouldBe > LIMIT) {
    return { allowed: false, remaining: 0, resetAt };
  }

  /* ── persist increment if > 0 ──────────────────────────── */
  if (increment > 0) {
    usage = await prisma.manuUsage.update({
      where: { userId },
      data: { messageCount: { increment } },
    });
  }

  return {
    allowed: true,
    remaining: LIMIT - usage.messageCount,
    resetAt,
  };
}

/* read-only helper – *no* counter bump */
export const getQuotaStatus = () => checkAndCount(0);
