import React from "react";

const Blog = ({ writingsContent }) => {
  const { blogTitle } = writingsContent;
  return (
    <div className="w-full center px-4 py-12">
      <div className="relative w-full max-w-[1280px]">
        <div className="flex">
          <h1 className="text-7xl font-bold whitespace-nowrap text-nowrap">
            {blogTitle}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Blog;
