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

const BlogPostPage = ({ blogPost, writingsContent, error }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensure component is mounted on the client
  }, []);

  if (!blogPost || !isClient) {
    return <Loading />;
  }

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
