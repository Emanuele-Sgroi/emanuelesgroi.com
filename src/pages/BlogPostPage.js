import React from "react";
import {
  BlogPostTopSection,
  BlogInfoAndShareSection,
  BlogContentSection,
  KeepReadingSection,
  PageSuggestionsSection,
  Loading,
} from "@/components";

const BlogPostPage = ({ blogPost, writingsContent, error }) => {
  if (!blogPost) {
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
