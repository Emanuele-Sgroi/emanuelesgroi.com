import React from "react";
import AboutThisWebsitePage from "@/pages/AboutThisWebsitePage";
import { getCurrentLanguageServer } from "@/utils/getCurrentLanguageServer";
import { getDefaultMetadata, getMetadataByPage } from "@/config/metadata";

// Generate metadata for SEO
export const generateMetadata = () => {
  const lang = getCurrentLanguageServer();
  return {
    ...getDefaultMetadata(lang),
    ...getMetadataByPage("/about-this-website", lang),
  };
};

const AboutThisWebsite = () => {
  return <AboutThisWebsitePage />;
};

export default AboutThisWebsite;
