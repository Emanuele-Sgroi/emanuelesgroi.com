"use client";

import React from "react";
import {
  ProfileBar,
  Loading,
  ErrorMessage,
  DevQuizComponent,
} from "@/components";
import { useGeneralInfoContent } from "@/hooks/useGeneralInfoContent";

const WelcomePage = () => {
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
      <DevQuizComponent />
    </section>
  );
};

export default WelcomePage;
