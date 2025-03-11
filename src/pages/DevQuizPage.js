"use client";

import React from "react";
import {
  ProfileBar,
  Loading,
  ErrorMessage,
  DevQuizComponent,
} from "@/components";

const DevQuizPage = ({ generalInfoContent, error }) => {
  if (error) {
    return <ErrorMessage />;
  }

  if (!generalInfoContent) {
    return <Loading />;
  }

  return (
    <section className="with-profile-bar">
      <ProfileBar generalInfo={generalInfoContent} />
      <DevQuizComponent />
    </section>
  );
};

export default DevQuizPage;
