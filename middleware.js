import { NextResponse } from "next/server";

const SUPPORTED = ["en", "it"];

export function middleware(req) {
  // 1 — use stored choice if it exists
  const saved = req.cookies.get("preferredLanguage")?.value;
  if (saved && SUPPORTED.includes(saved)) {
    return NextResponse.next();
  }

  // 2 — detect from Accept‑Language header
  const accept = req.headers.get("accept-language") || "";
  const browser = accept.split(",")[0].trim().slice(0, 2);
  const detected = SUPPORTED.includes(browser) ? browser : "en";

  // 3 — set cookie so server components (and next visits) use it
  const res = NextResponse.next();
  res.cookies.set("preferredLanguage", detected, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: "lax",
  });
  return res;
}

export const config = { matcher: "/:path*" };
