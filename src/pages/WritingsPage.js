"use client";

import React from "react";
import { TopHeaderAnimated, Blog, Loading, ErrorMessage } from "@/components";
import { useWritingsContent } from "@/hooks/useWritingsContent";

const WritingsPage = () => {
  const { writingsContent, isWritingsLoading, isWritingsError } =
    useWritingsContent();

  if (isWritingsLoading || !writingsContent) {
    return <Loading />;
  }

  if (isWritingsError) {
    return <ErrorMessage />;
  }

  return (
    <div className="w-full center flex-col">
      <TopHeaderAnimated writingsContent={writingsContent} />
      <Blog writingsContent={writingsContent} />
    </div>
  );
};

export default WritingsPage;
