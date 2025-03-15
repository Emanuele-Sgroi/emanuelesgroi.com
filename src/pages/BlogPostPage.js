"use client";

import React, { useState, useEffect } from "react";
import {
  BlogPostTopSection,
  BlogInfoAndShareSection,
  BlogContentSection,
  KeepReadingSection,
  PageSuggestionsSection,
  Loading,
  ErrorMessage,
} from "@/components";

/**
 * Blog Post Page
 * Renders a blog post with details, content, and related sections.
 */
const BlogPostPage = ({ blogPost, writingsContent, error }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensures component is mounted before rendering content
  }, []);

  // Show loading state while waiting for client-side rendering
  if (!blogPost || !isClient) {
    return <Loading />;
  }

  // Show error message if data fetching fails
  if (error) {
    return <ErrorMessage />;
  }

  return (
    <div className="w-full center flex-col max-md:bg-bg-mobile-primary">
      <BlogPostTopSection blogPost={blogPost} />
      <BlogInfoAndShareSection blogPost={blogPost} />
      <BlogContentSection blogPost={blogPost} />
      <KeepReadingSection
        blogPost={blogPost}
        writingsContent={writingsContent}
        error={error}
      />
      <PageSuggestionsSection />
    </div>
  );
};

export default BlogPostPage;
