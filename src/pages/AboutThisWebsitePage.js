"use client";

import React, { useState, useEffect, useRef } from "react";
import { useGeneralInfoContent } from "@/hooks/useGeneralInfoContent";
import {
  SiteDocContent,
  SiteDocNavigationMenu,
  SiteDocContentRight,
  Loading,
  ErrorMessage,
} from "@/components";

const AboutThisWebsitePage = () => {
  const { generalInfoContent, isGeneralInfoError, isGeneralInfoLoading } =
    useGeneralInfoContent();

  if (isGeneralInfoLoading || !generalInfoContent) {
    return <Loading />;
  }

  if (isGeneralInfoError) {
    return <ErrorMessage />;
  }

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
