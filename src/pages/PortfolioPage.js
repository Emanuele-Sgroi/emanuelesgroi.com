"use client";

import React from "react";
import {
  ProfileBar,
  PortfolioContainer,
  Loading,
  ErrorMessage,
} from "@/components";

const PortfolioPage = ({ portfolioContent, generalInfoContent, error }) => {
  if (!portfolioContent || !generalInfoContent) {
    return <Loading />;
  }

  if (error) {
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
