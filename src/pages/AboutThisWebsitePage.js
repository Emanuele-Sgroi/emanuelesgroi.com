"use client";

import React from "react";
import {
  SiteDocContent,
  SiteDocNavigationMenu,
  SiteDocContentRight,
} from "@/components";

/**
 * About This Website Page
 * Renders the documentation-style layout with navigation and content sections.
 */
const AboutThisWebsitePage = () => {
  return (
    <div className="w-full relative center flex-col pt-0">
      {/* Main container with navigation and content */}
      <div className="relative w-full mt-[76px] flex justify-start max-sm:flex-col z-50">
        <SiteDocNavigationMenu /> {/* Sidebar navigation */}
        <SiteDocContent /> {/* Main content */}
        <SiteDocContentRight /> {/* Right-side additional content */}
      </div>
    </div>
  );
};

export default AboutThisWebsitePage;
