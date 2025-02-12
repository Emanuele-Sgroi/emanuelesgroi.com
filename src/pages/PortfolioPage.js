"use client";

import React from "react";
import {
  ProfileBar,
  PortfolioContainer,
  Loading,
  ErrorMessage,
} from "@/components";
import { useGeneralInfoContent } from "@/hooks/useGeneralInfoContent";
import { usePortfolioContent } from "@/hooks/usePortfolioContent";

const PortfolioPage = () => {
  const { generalInfoContent, isGeneralInfoLoading, isGeneralInfoError } =
    useGeneralInfoContent();
  const { portfolioContent, isPortfolioLoading, isPortfolioError } =
    usePortfolioContent();

  if (
    isGeneralInfoLoading ||
    isPortfolioLoading ||
    !generalInfoContent ||
    !portfolioContent
  ) {
    return <Loading />;
  }

  if (isGeneralInfoError || isPortfolioError) {
    return <ErrorMessage />;
  }

  return (
    <section className="with-profile-bar max-md:!gap-0">
      <ProfileBar generalInfo={generalInfoContent} />
      <PortfolioContainer portfolio={portfolioContent} />
    </section>
  );
};

export default PortfolioPage;
