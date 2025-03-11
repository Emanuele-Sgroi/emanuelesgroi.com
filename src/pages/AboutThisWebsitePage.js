"use client";

import React from "react";
import {
  SiteDocContent,
  SiteDocNavigationMenu,
  SiteDocContentRight,
} from "@/components";

const AboutThisWebsitePage = () => {
  return (
    <div className="w-full relative center flex-col pt-0 ">
      <div className="relative w-full  mt-[76px] flex justify-start max-sm:flex-col z-50">
        <SiteDocNavigationMenu />
        <SiteDocContent />
        <SiteDocContentRight />
      </div>
    </div>
  );
};

export default AboutThisWebsitePage;
