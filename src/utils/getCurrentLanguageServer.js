import { cookies, headers } from "next/headers";

const SUPPORTED = ["en", "it"];

export async function getCurrentLanguageServer() {
  /* Try cookie — but swallow the error when there is no request */
  let saved;
  try {
    const cookieStore = await cookies();
    saved = cookieStore.get("preferredLanguage")?.value;
  } catch {
    /* outside request – ignore */
  }
  if (saved && SUPPORTED.includes(saved)) return saved;

  /* Accept-Language */
  let browser;
  try {
    const headersList = await headers();
    const accept = headersList.get("accept-language") ?? "";
    browser = accept.split(",")[0].trim().slice(0, 2);
  } catch {
    /* same reason – ignore */
  }
  if (SUPPORTED.includes(browser)) return browser;

  return "en"; // fallback
}
