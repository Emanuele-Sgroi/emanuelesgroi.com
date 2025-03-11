import client from "@/utils/contentfulClient";

/**
 * Fetches data from Contentful based on content type
 */
async function fetchContentfulData(contentType, errorMessage) {
  try {
    const response = await client.getEntries({
      content_type: contentType,
      limit: 1,
    });

    if (response.items.length > 0) {
      return { data: response.items[0].fields, error: null };
    } else {
      return { data: null, error: errorMessage };
    }
  } catch (error) {
    console.error(errorMessage, error);
    return { data: null, error: errorMessage };
  }
}

/**
 * Fetches General Info Content from Contentful
 */
export async function fetchGeneralInfoContent() {
  return fetchContentfulData(
    "generalInfo",
    "Error fetching General Info Content"
  );
}

/**
 * Fetches Discussion Page Content from Contentful
 */
export async function fetchDiscussionContent() {
  return fetchContentfulData(
    "discussionPage",
    "Error fetching Discussion Page Content"
  );
}

/**
 * Fetches ManuPilot Page Content from Contentful
 */
export async function fetchManuPilotContent() {
  return fetchContentfulData(
    "manuPilotPage",
    "Error fetching ManuPilot Page Content"
  );
}

/**
 * Fetches Portfolio Page Content from Contentful
 */
export async function fetchPortfolioContent() {
  return fetchContentfulData(
    "portfolioPage",
    "Error fetching Portfolio Page Content"
  );
}

/**
 * Fetches Welcome Page Content from Contentful
 */
export async function fetchWelcomeContent() {
  return fetchContentfulData(
    "welcomePage",
    "Error fetching Welcome Page Content"
  );
}

/**
 * Fetches Writing Page Content from Contentful
 */
export async function fetchWritingsContent() {
  return fetchContentfulData(
    "writingPage",
    "Error fetching Writing Page Content"
  );
}

/**
 * Fetches a single project by slug
 */
export async function fetchProject(slug) {
  try {
    const response = await client.getEntries({
      content_type: "project",
      "fields.projectSlug": slug,
      limit: 1,
    });

    if (!response.items.length) {
      return { data: null, error: "No project found" };
    }

    return { data: response.items[0].fields, error: null };
  } catch (error) {
    console.error("Error fetching project:", error);
    return { data: null, error: "Error fetching project" };
  }
}

/**
 * Fetches all project slugs
 */
export async function fetchProjectSlugs() {
  try {
    const response = await client.getEntries({
      content_type: "project",
      select: "fields.projectSlug",
    });

    if (!response.items.length) {
      return { data: [], error: "No project slugs found" };
    }

    const slugs = response.items
      .map((item) => item.fields?.projectSlug)
      .filter(Boolean);

    return { data: slugs, error: null };
  } catch (error) {
    console.error("Error fetching project slugs:", error);
    return { data: [], error: "Error fetching project slugs" };
  }
}

/**
 * Fetches a single blog post by slug
 */
export async function fetchBlogPost(slug) {
  try {
    const response = await client.getEntries({
      content_type: "blogPost",
      "fields.postSlug": slug,
      limit: 1,
    });

    if (!response.items.length) {
      return { data: null, error: "No blog post found" };
    }

    return { data: response.items[0].fields, error: null };
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return { data: null, error: "Error fetching blog post" };
  }
}

/**
 * Fetches all blog post slugs
 */
export async function fetchBlogPostSlugs() {
  try {
    const response = await client.getEntries({
      content_type: "blogPost",
      select: "fields.postSlug",
    });

    if (!response.items.length) {
      return { data: [], error: "No blog post slugs found" };
    }

    const slugs = response.items
      .map((item) => item.fields?.postSlug)
      .filter(Boolean);

    return { data: slugs, error: null };
  } catch (error) {
    console.error("Error fetching blog post slugs:", error);
    return { data: [], error: "Error fetching blog post slugs" };
  }
}
