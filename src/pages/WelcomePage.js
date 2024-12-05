"use client";

import React from "react";
import { ProfileBar, WelcomeReadMe, Loading, ErrorMessage } from "@/components";
import { useWelcomeContent } from "@/hooks/useWelcomeContent";
import { useGeneralInfoContent } from "@/hooks/useGeneralInfoContent";

const WelcomePage = () => {
  const { welcomeContent, isWelcomeLoading, isWelcomeError } =
    useWelcomeContent();
  const { generalInfoContent, isGeneralInfoLoading, isGeneralInfoError } =
    useGeneralInfoContent();

  if (
    isGeneralInfoLoading ||
    isWelcomeLoading ||
    !welcomeContent ||
    !generalInfoContent
  ) {
    return <Loading />;
  }

  if (isWelcomeError || isGeneralInfoError) {
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
