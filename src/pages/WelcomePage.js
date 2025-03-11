"use client";

import React from "react";
import { ProfileBar, WelcomeReadMe, Loading, ErrorMessage } from "@/components";

const WelcomePage = ({ welcomeContent, generalInfoContent, error }) => {
  if (!welcomeContent || !generalInfoContent) {
    return <Loading />;
  }

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
