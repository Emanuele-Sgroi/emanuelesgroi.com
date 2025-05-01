// utils/fetchCMSContent.js
import client from "@/utils/contentfulClient";
import { getContentfulLocale } from "@/utils/getContentfulLocale";

/* ------------------------------------------------------------ */
/*  Core helper                                                 */
/* ------------------------------------------------------------ */
async function fetchContentfulData(contentType, errorMessage, lang) {
  try {
    const locale = getContentfulLocale(lang); // "en-US" | "it-IT"

    const response = await client.getEntries({
      content_type: contentType,
      locale,
      limit: 1,
    });

    if (response.items.length) {
      return { data: response.items[0].fields, error: null };
    }
    return { data: null, error: errorMessage };
  } catch (err) {
    console.error(errorMessage, err);
    return { data: null, error: errorMessage };
  }
}

/* ------------------------------------------------------------ */
/*  Page‑level wrappers                                         */
/* ------------------------------------------------------------ */
export const fetchGeneralInfoContent = (lang) =>
  fetchContentfulData(
    "generalInfo",
    "Error fetching General Info Content",
    lang
  );
export const fetchDiscussionContent = (lang) =>
  fetchContentfulData(
    "discussionPage",
    "Error fetching Discussion Page Content",
    lang
  );
export const fetchManuPilotContent = (lang) =>
  fetchContentfulData(
    "manuPilotPage",
    "Error fetching ManuPilot Page Content",
    lang
  );
export const fetchPortfolioContent = (lang) =>
  fetchContentfulData(
    "portfolioPage",
    "Error fetching Portfolio Page Content",
    lang
  );
export const fetchWelcomeContent = (lang) =>
  fetchContentfulData(
    "welcomePage",
    "Error fetching Welcome Page Content",
    lang
  );
export const fetchWritingsContent = (lang) =>
  fetchContentfulData(
    "writingPage",
    "Error fetching Writing Page Content",
    lang
  );

/* ------------------------------------------------------------ */
/*  Single‑entry helpers                                        */
/* ------------------------------------------------------------ */
export async function fetchProject(slug, lang = "en") {
  const locale = getContentfulLocale(lang); // "en-US" | "it-IT"
  try {
    // 1. try in the selected locale
    let res = await client.getEntries({
      content_type: "project",
      "fields.projectSlug": slug,
      locale,
      limit: 1,
    });

    // 2. fallback to default locale if nothing found
    if (!res.items.length && lang !== "en") {
      res = await client.getEntries({
        content_type: "project",
        "fields.projectSlug": slug,
        locale: "en-US",
        limit: 1,
      });
    }

    if (!res.items.length) {
      return { data: null, error: "No project found" };
    }
    return { data: res.items[0].fields, error: null };
  } catch (err) {
    console.error("Error fetching project:", err);
    return { data: null, error: "Error fetching project" };
  }
}

export async function fetchProjectSlugs() {
  try {
    const res = await client.getEntries({
      content_type: "project",
      select: "fields.projectSlug",
    });
    if (!res.items.length) return { data: [], error: "No project slugs found" };

    const slugs = res.items.map((i) => i.fields?.projectSlug).filter(Boolean);

    return { data: slugs, error: null };
  } catch (err) {
    console.error("Error fetching project slugs:", err);
    return { data: [], error: "Error fetching project slugs" };
  }
}

export async function fetchBlogPost(slug, lang = "en") {
  const locale = getContentfulLocale(lang);

  try {
    const res = await client.getEntries({
      content_type: "blogPost",
      "fields.postSlug": slug,
      locale,
      limit: 1,
    });
    if (!res.items.length) return { data: null, error: "No blog post found" };
    return { data: res.items[0].fields, error: null };
  } catch (err) {
    console.error("Error fetching blog post:", err);
    return { data: null, error: "Error fetching blog post" };
  }
}

export async function fetchBlogPostSlugs() {
  try {
    const res = await client.getEntries({
      content_type: "blogPost",
      select: "fields.postSlug",
    });
    if (!res.items.length)
      return { data: [], error: "No blog post slugs found" };

    const slugs = res.items.map((i) => i.fields?.postSlug).filter(Boolean);

    return { data: slugs, error: null };
  } catch (err) {
    console.error("Error fetching blog post slugs:", err);
    return { data: [], error: "Error fetching blog post slugs" };
  }
}
