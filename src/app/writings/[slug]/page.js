// import { notFound } from "next/navigation";
// import client from "@/utils/contentfulClient";
// import { Suspense } from "react";
// import { Loading, ErrorMessage } from "@/components";
// import BlogPostPage from "@/pages/BlogPostPage";

// export async function generateStaticParams() {
//   try {
//     const response = await client.getEntries({
//       content_type: "blogPost",
//       select: "fields.postSlug",
//     });

//     if (!response.items.length) {
//       console.error("No blog posts found");
//       return [];
//     }

//     return response.items
//       .map((item) => item.fields?.postSlug)
//       .filter(Boolean) // Remove any undefined values
//       .map((slug) => ({ slug })); // Ensure correct format
//   } catch (error) {
//     console.error("Error fetching blog post slugs:", error);
//     return [];
//   }
// }

// async function fetchBlogPost(slug) {
//   try {
//     const response = await client.getEntries({
//       content_type: "blogPost",
//       "fields.postSlug": slug,
//       limit: 1,
//     });

//     if (!response.items.length || !response.items[0].fields) {
//       console.warn(`No blog post found for slug: ${slug}`);
//       return null;
//     }

//     // Log the fetched data for debugging
//     // console.log("Fetched blog post:", response.items[0].fields);

//     return response.items[0].fields;
//   } catch (error) {
//     console.error("Error fetching blog post:", error);
//     return null;
//   }
// }

// async function BlogPostContent({ slug }) {
//   const blogPost = await fetchBlogPost(slug);

//   if (!blogPost) {
//     console.error(`Blog post not found for slug: ${slug}`);
//     return notFound();
//   }

//   return <BlogPostPage blogPost={blogPost} />;
// }

// export default function BlogPost({ params }) {
//   return (
//     <Suspense fallback={<Loading />}>
//       <ErrorBoundary>
//         <BlogPostContent slug={params.slug} />
//       </ErrorBoundary>
//     </Suspense>
//   );
// }

// // Error Boundary Component (to catch errors)
// function ErrorBoundary({ children }) {
//   try {
//     return children;
//   } catch (error) {
//     return <ErrorMessage />;
//   }
// }

import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Loading, ErrorMessage } from "@/components";
import BlogPostPage from "@/pages/BlogPostPage";
import { fetchBlogPost, fetchBlogPostSlugs } from "@/utils/fetchCMSContent";

// Generate Static Paths
export async function generateStaticParams() {
  try {
    const { data, error } = await fetchBlogPostSlugs();
    if (error || !data?.length) {
      console.error("No blog post slugs found:", error);
      return [];
    }
    return data.map((slug) => ({ slug }));
  } catch (error) {
    console.error("Error generating blog post slugs:", error);
    return [];
  }
}

// Fetch blog post details
async function BlogPostContent({ slug }) {
  const { data: blogPost, error } = await fetchBlogPost(slug);

  if (error || !blogPost) {
    console.error(`Error fetching blog post for slug: ${slug}`, error);
    notFound();
  }

  return <BlogPostPage blogPost={blogPost} />;
}

// Main Component
export default function BlogPost({ params }) {
  return (
    <Suspense fallback={<Loading />}>
      <BlogPostContent slug={params.slug} />
    </Suspense>
  );
}
