"use client";

import React, { useState, useEffect } from "react";
import {
  Loading,
  ProjectTopSection,
  ProjectContentContainer,
  ProjectSideBar,
  ErrorMessage,
} from "@/components";
import { useLanguage } from "@/context/LanguageContext";
import projectDetailsTranslation from "@/translations/projectDetails";

/**
 * Project Details Page
 * Displays details of a project, including top section, content, and sidebar.
 */
const ProjectDetailsPage = ({ project, error }) => {
  // translation
  const { language } = useLanguage();
  const t = projectDetailsTranslation[language];

  const [isClient, setIsClient] = useState(false);

  // Ensure the component is mounted on the client before rendering content
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Show loading state while checking for project data
  if (!project || !isClient) {
    return <Loading />;
  }

  // Show error message if fetching fails
  if (error) {
    return <ErrorMessage />;
  }

  return (
    <div className="w-full center flex-col md:pt-10 md:pb-8 md:px-6">
      <ProjectTopSection project={project} isClient={isClient} t={t} />
      <div className="w-full max-w-[1216px] flex justify-center max-[850px]:flex-col-reverse gap-6 mt-6 z-50">
        <ProjectContentContainer project={project} t={t} />
        <ProjectSideBar project={project} t={t} language={language} />
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
