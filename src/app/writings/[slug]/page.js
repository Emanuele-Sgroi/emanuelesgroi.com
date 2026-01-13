export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Loading, ErrorMessage } from "@/components";
import BlogPostPage from "@/pages/BlogPostPage";
import {
  fetchBlogPost,
  fetchBlogPostSlugs,
  fetchWritingsContent,
} from "@/utils/fetchCMSContent";
import { getAssetUrl } from "@/utils/imageUtils";
import { getCurrentLanguageServer } from "@/utils/getCurrentLanguageServer";
import metadataFallbacks from "@/translations/metadataFallbacks";

/* ------------------------------------------------------------------ */
/*  Static params (unchanged)                                         */
/* ------------------------------------------------------------------ */
export async function generateStaticParams() {
  try {
    const { data, error } = await fetchBlogPostSlugs();
    if (error || !data?.length) {
      console.error("No blog post slugs found:", error);
      return [];
    }
    return data.map((slug) => ({ slug }));
  } catch (err) {
    console.error("Error generating blog post slugs:", err);
    return [];
  }
}

/* ------------------------------------------------------------------ */
/*  Metadata (unchanged, but uses lang for the post)                  */
/* ------------------------------------------------------------------ */
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const lang = "en"; // Force English fallback, or default
  const { data: blogPost, error } = await fetchBlogPost(
    resolvedParams.slug,
    lang
  );

  const metadataBase = new URL(process.env.NEXT_PUBLIC_BASE_URL);

  if (error || !blogPost) {
    const fallback =
      metadataFallbacks[lang]?.blogNotFound ||
      metadataFallbacks.en.blogNotFound;
    return {
      metadataBase,
      title: fallback.title,
      description: fallback.description,
    };
  }

  const ogImage = getAssetUrl(blogPost.mainImage) || "/images/og-image.jpg";

  return {
    metadataBase,
    title: blogPost.postTitle ?? "Blog Post | Emanuele Sgroi",
    description: blogPost.smallDescription ?? "Read this blog post.",
    keywords: blogPost.metaKeywords?.split(", ") ?? [
      "Web Development",
      "React",
      "Next.js",
      "Tech Blog",
    ],
    openGraph: {
      title: blogPost.postTitle ?? "Blog Post | Emanuele Sgroi",
      description: blogPost.smallDescription ?? "Read this blog post.",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}writings/${resolvedParams.slug}`,
      type: "article",
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: blogPost.postTitle ?? "Blog Post | Emanuele Sgroi",
      description: blogPost.smallDescription ?? "Read this blog post.",
      images: [ogImage],
    },
  };
}

/* ------------------------------------------------------------------ */
/*  Server component that fetches *both* datasets                     */
/* ------------------------------------------------------------------ */
async function BlogPostContent({ slug, lang }) {
  // run the two queries in parallel
  const [
    { data: blogPost, error: postErr },
    { data: writingsContent, error: writingsErr },
  ] = await Promise.all([
    fetchBlogPost(slug, lang),
    fetchWritingsContent(lang),
  ]);

  if (postErr || !blogPost) {
    notFound(); // 404 if the post itself is missing
  }

  const error = postErr || writingsErr || null;

  return (
    <BlogPostPage
      blogPost={blogPost}
      writingsContent={writingsContent}
      error={error}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Error boundary                                                    */
/* ------------------------------------------------------------------ */
function ErrorBoundary({ children }) {
  try {
    return children;
  } catch (err) {
    console.error("ErrorBoundary caught an error:", err);
    return <ErrorMessage />;
  }
}

/* ------------------------------------------------------------------ */
/*  Page wrapper with Suspense                                        */
/* ------------------------------------------------------------------ */
export default async function BlogPost({ params }) {
  const resolvedParams = await params;
  const lang = await getCurrentLanguageServer();

  return (
    <Suspense fallback={<Loading />}>
      <ErrorBoundary>
        <BlogPostContent slug={resolvedParams.slug} lang={lang} />
      </ErrorBoundary>
    </Suspense>
  );
}
