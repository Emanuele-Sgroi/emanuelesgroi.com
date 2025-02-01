import { notFound } from "next/navigation";
import client from "@/utils/contentfulClient";
import { Suspense } from "react";
import { Loading, ErrorMessage } from "@/components";
import BlogPostPage from "@/pages/BlogPostPage";

export async function generateStaticParams() {
  const response = await client.getEntries({
    content_type: "blogPost",
    select: "fields.postSlug",
  });

  return response.items.map((item) => ({
    postSlug: item.fields.postSlug,
  }));
}

async function fetchBlogPost(slug) {
  try {
    const response = await client.getEntries({
      content_type: "blogPost",
      "fields.postSlug": slug,
      limit: 1,
    });

    if (response.items.length === 0) {
      return null;
    }

    return response.items[0].fields;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    throw new Error("Failed to fetch blog post");
  }
}

async function BlogPostContent({ slug }) {
  const blogPost = await fetchBlogPost(slug);

  if (!blogPost) {
    notFound();
  }

  return <BlogPostPage blogPost={blogPost} />;
}

export default function BlogPost({ params }) {
  return (
    <Suspense fallback={<Loading />}>
      <ErrorBoundary>
        <BlogPostContent slug={params.slug} />
      </ErrorBoundary>
    </Suspense>
  );
}

// Error Boundary Component (to catch errors)
function ErrorBoundary({ children }) {
  try {
    return children;
  } catch (error) {
    return <ErrorMessage />;
  }
}
