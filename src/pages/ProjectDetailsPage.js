"use client";

import React from "react";
import {
  Loading,
  ProjectTopSection,
  ProjectContentContainer,
  ProjectSideBar,
} from "@/components";

const ProjectDetailsPage = ({ project, error }) => {
  if (!project) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage />;
  }

  return (
    <div className="w-full center flex-col   md:pt-10 md:pb-8 md:px-6">
      <ProjectTopSection project={project} />
      <div className="w-full max-w-[1216px] flex justify-center max-[850px]:flex-col-reverse gap-6 mt-6 z-50">
        <ProjectContentContainer project={project} />
        <ProjectSideBar project={project} />
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
