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
import { useLanguage } from "@/context/LanguageContext";
import blogPostTranslations from "@/translations/blogPost";

/**
 * Blog Post Page
 * Renders a blog post with details, content, and related sections.
 */
const BlogPostPage = ({ blogPost, writingsContent, error }) => {
  // translation
  const { language } = useLanguage();
  const t = blogPostTranslations[language];

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
      <BlogPostTopSection blogPost={blogPost} t={t} />
      <BlogInfoAndShareSection blogPost={blogPost} t={t} />
      <BlogContentSection blogPost={blogPost} t={t} />
      <KeepReadingSection
        blogPost={blogPost}
        writingsContent={writingsContent}
        error={error}
        language={language}
        t={t}
      />
      <PageSuggestionsSection t={t} />
    </div>
  );
};

export default BlogPostPage;
