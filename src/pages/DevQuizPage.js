"use client";

import React from "react";
import {
  ProfileBar,
  Loading,
  ErrorMessage,
  DevQuizComponent,
} from "@/components";

/**
 * Dev Quiz Page
 * Displays the profile bar and interactive Dev Quiz component.
 */
const DevQuizPage = ({ generalInfoContent, error }) => {
  // Show error message if data fetching fails
  if (error) {
    return <ErrorMessage />;
  }

  // Show loading state if general info is not available
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
