"use client";

import React, { useState, useEffect } from "react";
import {
  Loading,
  ProjectTopSection,
  ProjectContentContainer,
  ProjectSideBar,
  ErrorMessage,
} from "@/components";

const ProjectDetailsPage = ({ project, error }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensure component is mounted on the client
  }, []);

  if (!project || !isClient) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage />;
  }

  return (
    <div className="w-full center flex-col   md:pt-10 md:pb-8 md:px-6">
      <ProjectTopSection project={project} isClient={isClient} />
      <div className="w-full max-w-[1216px] flex justify-center max-[850px]:flex-col-reverse gap-6 mt-6 z-50">
        <ProjectContentContainer project={project} />
        <ProjectSideBar project={project} />
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
