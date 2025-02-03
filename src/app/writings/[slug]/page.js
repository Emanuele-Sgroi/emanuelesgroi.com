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

  if (!response.items.length) {
    console.error("No blog posts found");
    return [];
  }

  const path = response.items.map((item) => ({
    slug: item.fields.postSlug,
  }));

  return { paths, fallback: "blocking" };
}

async function fetchBlogPost(slug) {
  try {
    const response = await client.getEntries({
      content_type: "blogPost",
      "fields.postSlug": slug,
      limit: 1,
    });

    if (!response.items.length) {
      console.warn(`No blog post found for slug: ${slug}`);
      return null;
    }

    return response.items[0].fields ?? null;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

async function BlogPostContent({ slug }) {
  const blogPost = await fetchBlogPost(slug);

  if (!blogPost) {
    console.error(`Blog post not found for slug: ${slug}`);
    return notFound();
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
