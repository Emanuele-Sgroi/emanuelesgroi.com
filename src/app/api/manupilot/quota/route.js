// GET  /api/manupilot/quota     →  returns   X-Quota-Remaining / X-Quota-Reset
import { getQuotaStatus } from "@/utils/quota";

export async function GET() {
  const q = await getQuotaStatus(); // ⬅ no counter bump
  return new Response(
    JSON.stringify({ remaining: q.remaining, resetAt: q.resetAt }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
        "X-Quota-Remaining": String(q.remaining),
        "X-Quota-Reset": q.resetAt.toISOString(),
      },
    }
  );
}
