"use client";

import React from "react";
import {
  TopHeaderAnimated,
  Blog,
  Academic,
  Loading,
  ErrorMessage,
} from "@/components";
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
      <div className="max-md:hidden w-full max-w-[1280px] h-px bg-accent-border" />
      <Academic writingsContent={writingsContent} />
    </div>
  );
};

export default WritingsPage;
