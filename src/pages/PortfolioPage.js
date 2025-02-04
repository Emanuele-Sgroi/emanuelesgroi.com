"use client";

import React from "react";
import { ProfileBar, Loading, ErrorMessage } from "@/components";
import { useGeneralInfoContent } from "@/hooks/useGeneralInfoContent";

const PortfolioPage = () => {
  const { generalInfoContent, isGeneralInfoLoading, isGeneralInfoError } =
    useGeneralInfoContent();

  if (isGeneralInfoLoading || !generalInfoContent) {
    return <Loading />;
  }

  if (isGeneralInfoError) {
    return <ErrorMessage />;
  }

  return (
    <section className="with-profile-bar">
      <ProfileBar generalInfo={generalInfoContent} />
      <div></div>
    </section>
  );
};

export default PortfolioPage;
