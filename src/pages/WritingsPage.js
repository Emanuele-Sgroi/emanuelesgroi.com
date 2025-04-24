"use client";

import React from "react";
import {
  TopHeaderAnimated,
  Blog,
  Academic,
  Loading,
  ErrorMessage,
} from "@/components";
import { useLanguage } from "@/context/LanguageContext";
import writingsTranslations from "@/translations/writings";

/**
 * Writings Page
 * Displays blog posts and academic writings.
 */
const WritingsPage = ({ writingsContent, error }) => {
  // translation
  const { language } = useLanguage();
  const t = writingsTranslations[language];

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
      <Blog writingsContent={writingsContent} t={t} />
      {/* Divider between blog and academic sections (hidden on mobile) */}
      <div className="max-md:hidden w-full max-w-[1280px] h-px bg-accent-border" />
      <Academic writingsContent={writingsContent} t={t} language={language} />
    </div>
  );
};

export default WritingsPage;
