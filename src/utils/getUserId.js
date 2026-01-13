import { cookies, headers } from "next/headers";
import crypto from "node:crypto";

const COOKIE_NAME = "__manu_id";
const COOKIE_SECRET = process.env.SIGNING_SECRET; // 32-byte random

function sign(value) {
  return (
    value +
    "." +
    crypto.createHmac("sha256", COOKIE_SECRET).update(value).digest("base64url")
  );
}

function unsign(raw) {
  const [val, sig] = raw.split(".");
  if (!val || !sig) return null;
  const expected = crypto
    .createHmac("sha256", COOKIE_SECRET)
    .update(val)
    .digest("base64url");
  return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))
    ? val
    : null;
}

/** Returns stable anonymous id & sets cookie if missing */
export async function getUserIdServer() {
  /* try signed cookie ─────────────────────────────── */
  try {
    const cookieStore = await cookies();
    const raw = cookieStore.get(COOKIE_NAME)?.value;
    if (raw) {
      const ok = unsign(raw);
      if (ok) return ok;
    }
  } catch (_) {
    /* no request scope → will fallback */
  }

  /* fallback = sha256( ip + ua ) ───────────────────── */
  let ip = "";
  let ua = "";
  try {
    const headersList = await headers();
    ip = headersList.get("x-forwarded-for")?.split(",")[0] || "";
    ua = headersList.get("user-agent") || "";
  } catch (_) {}

  const fallback = crypto
    .createHash("sha256")
    .update(ip + ua)
    .digest("base64url");

  /* set cookie if we are inside a route handler */
  try {
    const cookieStore = await cookies();
    cookieStore.set({
      name: COOKIE_NAME,
      value: sign(fallback),
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
  } catch (_) {}

  return fallback;
}
