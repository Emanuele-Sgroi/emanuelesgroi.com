"use client";

import React from "react";
import {
  ProfileBar,
  PortfolioContainer,
  Loading,
  ErrorMessage,
} from "@/components";

/**
 * Portfolio Page
 * Displays the profile bar and portfolio projects.
 */
const PortfolioPage = ({ portfolioContent, generalInfoContent, error }) => {
  // Show loading state while data is being fetched
  if (!portfolioContent || !generalInfoContent) {
    return <Loading />;
  }

  // Show error message if fetching fails
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
