"use client";

import React, { useState } from "react";
import { ProfileBar, WelcomeReadMe } from "@/components";
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
    <p>Loading</p>;
  }

  if (isWelcomeError || isGeneralInfoError) {
    <p>error</p>;
  }

  return (
    <section className="with-profile-bar">
      <ProfileBar generalInfo={generalInfoContent} />
      <WelcomeReadMe welcome={welcomeContent} />
    </section>
  );
};

export default WelcomePage;
