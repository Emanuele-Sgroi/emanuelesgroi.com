"use client";

import React from "react";
import {
  TopHeaderAnimated,
  Blog,
  Academic,
  Loading,
  ErrorMessage,
} from "@/components";

/**
 * Writings Page
 * Displays blog posts and academic writings.
 */
const WritingsPage = ({ writingsContent, error }) => {
  // Show loading state if content is not available yet
  if (!writingsContent) {
    return <Loading />;
  }

  // Show error message if fetching fails
  if (error) {
    return <ErrorMessage />;
  }

  return (
    <div className="w-full center flex-col">
      <TopHeaderAnimated writingsContent={writingsContent} />
      <Blog writingsContent={writingsContent} />
      {/* Divider between blog and academic sections (hidden on mobile) */}
      <div className="max-md:hidden w-full max-w-[1280px] h-px bg-accent-border" />
      <Academic writingsContent={writingsContent} />
    </div>
  );
};

export default WritingsPage;
