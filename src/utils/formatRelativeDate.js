import discussionsTranslations from "@/translations/discussions";

/**
 * Formats a date string into a relative time (e.g., "2 minutes ago").
 *
 * @param {string} dateString - The date to format.
 * @param {string} language - Current language ('en' or 'it').
 * @returns {string} - Formatted relative time string.
 */
export const formatRelativeDate = (dateString, language = "en") => {
  const t =
    discussionsTranslations[language]?.time ||
    discussionsTranslations["en"].time;

  const now = new Date();
  const givenDate = new Date(dateString);
  const diffInSeconds = Math.floor((now - givenDate) / 1000);

  if (diffInSeconds < 60) {
    return t.justNow;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes > 1 ? t.minutes : t.minute} ${
      t.ago
    }`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}${t.hours} ${t.ago}`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} ${diffInDays > 1 ? t.days : t.day} ${t.ago}`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  return `${diffInWeeks}${t.weeks} ${t.ago}`;
};
