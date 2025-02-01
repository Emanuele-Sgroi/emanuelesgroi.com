import React from "react";
import {
  BlogPostTopSection,
  BlogInfoAndShareSection,
  BlogContentSection,
  KeepReadingSection,
  PageSuggestionsSection,
} from "@/components";

const BlogPostPage = ({ blogPost }) => {
  return (
    <div className="w-full center flex-col">
      <BlogPostTopSection blogPost={blogPost} />
      <BlogInfoAndShareSection blogPost={blogPost} />
      <BlogContentSection blogPost={blogPost} />
      <KeepReadingSection blogPost={blogPost} />
      <PageSuggestionsSection />
    </div>
  );
};

export default BlogPostPage;
