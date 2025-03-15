"use client";

import React from "react";
import { ProfileBar, WelcomeReadMe, Loading, ErrorMessage } from "@/components";

/**
 * Welcome Page
 * Displays the welcome section with profile information and README-style content.
 */
const WelcomePage = ({ welcomeContent, generalInfoContent, error }) => {
  // Show loading state if content is not available yet
  if (!welcomeContent || !generalInfoContent) {
    return <Loading />;
  }

  // Show error message if fetching fails
  if (error) {
    return <ErrorMessage />;
  }

  return (
    <section className="with-profile-bar">
      <ProfileBar generalInfo={generalInfoContent} />
      <WelcomeReadMe welcome={welcomeContent} />
    </section>
  );
};

export default WelcomePage;
