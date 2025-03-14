import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Loading, ErrorMessage } from "@/components";
import BlogPostPage from "@/pages/BlogPostPage";
import { fetchBlogPost, fetchBlogPostSlugs } from "@/utils/fetchCMSContent";
import { getAssetUrl } from "@/utils/imageUtils";

// Generate Static Paths
export async function generateStaticParams() {
  try {
    const { data, error } = await fetchBlogPostSlugs();
    if (error || !data?.length) {
      //  console.error("No blog post slugs found:", error);
      return [];
    }
    return data.map((slug) => ({ slug }));
  } catch (error) {
    // console.error("Error generating blog post slugs:", error);
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { data: blogPost, error } = await fetchBlogPost(params.slug);

  if (error || !blogPost) {
    return {
      title: "Blog Post Not Found | Emanuele Sgroi",
      description: "Oops! This blog post doesn't exist.",
    };
  }

  return {
    title: blogPost.postTitle || "Blog Post | Emanuele Sgroi",
    description: blogPost.smallDescription || "Read this blog post.",
    keywords: blogPost.metaKeywords?.split(", ") || [
      "Web Development",
      "React",
      "Next.js",
      "Tech Blog",
    ],
    openGraph: {
      title: blogPost.postTitle || "Blog Post | Emanuele Sgroi",
      description: blogPost.smallDescription || "Read this blog post.",
      url: `https://somedomain.com/writings/${params.slug}`,
      type: "article",
      images: [
        { url: getAssetUrl(blogPost.mainImage) || "/images/og-image.jpg" },
      ],
    },
  };
}

// Fetch blog post details
async function BlogPostContent({ slug }) {
  const { data: blogPost, error } = await fetchBlogPost(slug);
  // console.log("Blog post data:", blogPost);
  // console.log("Error:", error);

  if (error || !blogPost) {
    //  console.error(`Blog post not found for slug: ${slug}`);
    notFound();
  }

  return <BlogPostPage blogPost={blogPost} />;
}

// Error Boundary Component (to catch errors)
function ErrorBoundary({ children }) {
  try {
    return children;
  } catch (error) {
    console.error("ErrorBoundary caught an error:", error);
    return <ErrorMessage />;
  }
}

// Main Component
export default function BlogPost({ params }) {
  return (
    <Suspense fallback={<Loading />}>
      <ErrorBoundary>
        <BlogPostContent slug={params.slug} />
      </ErrorBoundary>
    </Suspense>
  );
}
