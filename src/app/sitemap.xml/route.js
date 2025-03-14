import { fetchProjectSlugs, fetchBlogPostSlugs } from "@/utils/fetchCMSContent";

export async function GET() {
  const baseUrl = "http://localhost:3000"; // Change this in production

  // Fetch dynamic content
  const { data: projectSlugs, error: projectError } = await fetchProjectSlugs();
  const { data: blogPostSlugs, error: blogError } = await fetchBlogPostSlugs();

  if (projectError)
    console.error("Error fetching project slugs:", projectError);
  if (blogError) console.error("Error fetching blog post slugs:", blogError);

  // Static routes
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

  // Dynamic project pages
  const projectRoutes =
    projectSlugs
      ?.map((slug) => `<url><loc>${baseUrl}/portfolio/${slug}</loc></url>`)
      .join("") || "";

  // Dynamic blog post pages
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
