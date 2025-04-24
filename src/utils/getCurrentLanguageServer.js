// export function getCurrentLanguageServer() {
//   const cookies = require("next/headers").cookies();
//   const lang = cookies.get("preferredLanguage")?.value;
//   return lang === "it" ? "it" : "en"; // fallback to English
// }

import { cookies, headers } from "next/headers";

const SUPPORTED = ["en", "it"];

export function getCurrentLanguageServer() {
  // 1) Try the cookie first
  const cookieStore = cookies();
  const saved = cookieStore.get("preferredLanguage")?.value;
  if (saved && SUPPORTED.includes(saved)) {
    return saved;
  }

  // 2) No cookie? Fallback to Accept-Language header
  const accept = headers().get("accept-language") || "";
  const browser = accept.split(",")[0].trim().slice(0, 2);
  const detected = SUPPORTED.includes(browser) ? browser : "en";

  return detected;
}
