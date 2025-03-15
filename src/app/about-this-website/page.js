import React from "react";
import AboutThisWebsitePage from "@/pages/AboutThisWebsitePage";
import { metadataByPage, defaultMetadata } from "@/config/metadata";

// Generate metadata for SEO
export const generateMetadata = () => ({
  ...defaultMetadata,
  ...metadataByPage["/about-this-website"],
});

const AboutThisWebsite = () => {
  return <AboutThisWebsitePage />;
};

export default AboutThisWebsite;
