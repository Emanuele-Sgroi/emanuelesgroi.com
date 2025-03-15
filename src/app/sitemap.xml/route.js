import { fetchProjectSlugs, fetchBlogPostSlugs } from "@/utils/fetchCMSContent";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  // Fetch dynamic content for projects and blog posts
  const { data: projectSlugs, error: projectError } = await fetchProjectSlugs();
  const { data: blogPostSlugs, error: blogError } = await fetchBlogPostSlugs();

  if (projectError)
    console.error("Error fetching project slugs:", projectError);
  if (blogError) console.error("Error fetching blog post slugs:", blogError);

  // Define static routes that should always be included in the sitemap
  const staticRoutes = [
    "/",
    "/portfolio",
    "/writings",
    "/dev-quiz",
    "/discussions",
    "/contact",
    "/manupilot",
    "/about-this-website",
  ]
    .map((route) => `<url><loc>${baseUrl}${route}</loc></url>`)
    .join("");

  // Include dynamic project pages in the sitemap
  const projectRoutes =
    projectSlugs
      ?.map((slug) => `<url><loc>${baseUrl}/portfolio/${slug}</loc></url>`)
      .join("") || "";

  // Include dynamic blog post pages in the sitemap
  const blogRoutes =
    blogPostSlugs
      ?.map((slug) => `<url><loc>${baseUrl}/writings/${slug}</loc></url>`)
      .join("") || "";

  // Generate XML structure
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticRoutes}
    ${projectRoutes}
    ${blogRoutes}
  </urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
