// import { cookies, headers } from "next/headers";

// const SUPPORTED = ["en", "it"];

// export function getCurrentLanguageServer() {
//   //  Try the cookie first
//   const cookieStore = cookies();
//   const saved = cookieStore.get("preferredLanguage")?.value;
//   if (saved && SUPPORTED.includes(saved)) {
//     return saved;
//   }

//   // No cookie? Fallback to Accept-Language header
//   const accept = headers().get("accept-language") || "";
//   const browser = accept.split(",")[0].trim().slice(0, 2);
//   const detected = SUPPORTED.includes(browser) ? browser : "en";

//   return detected;
// }

// utils/getCurrentLanguageServer.ts
import { cookies, headers } from "next/headers";

const SUPPORTED = ["en", "it"];

export function getCurrentLanguageServer() {
  /* Try cookie — but swallow the error when there is no request */
  let saved;
  try {
    saved = cookies().get("preferredLanguage")?.value;
  } catch {
    /* outside request – ignore */
  }
  if (saved && SUPPORTED.includes(saved)) return saved;

  /* Accept-Language */
  let browser;
  try {
    const accept = headers().get("accept-language") ?? "";
    browser = accept.split(",")[0].trim().slice(0, 2);
  } catch {
    /* same reason – ignore */
  }
  if (SUPPORTED.includes(browser)) return browser;

  return "en"; // fallback
}
