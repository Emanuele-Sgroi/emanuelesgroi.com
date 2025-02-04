import React from "react";
import {
  BlogPostTopSection,
  BlogInfoAndShareSection,
  BlogContentSection,
  KeepReadingSection,
  PageSuggestionsSection,
  Loading,
} from "@/components";

const BlogPostPage = ({ blogPost }) => {
  if (!blogPost) {
    return <Loading />;
  }

  return (
    <div className="w-full center flex-col max-md:bg-bg-mobile-primary">
      <BlogPostTopSection blogPost={blogPost} />
      <BlogInfoAndShareSection blogPost={blogPost} />
      <BlogContentSection blogPost={blogPost} />
      <KeepReadingSection blogPost={blogPost} />
      <PageSuggestionsSection />
    </div>
  );
};

export default BlogPostPage;
