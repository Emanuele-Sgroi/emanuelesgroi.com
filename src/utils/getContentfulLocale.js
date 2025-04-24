export function getContentfulLocale(lang) {
  const map = {
    en: "en-US",
    it: "it-IT",
  };

  return map[lang] || "en-US"; // fallback
}
