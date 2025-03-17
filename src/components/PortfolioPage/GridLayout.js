"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getAssetUrl } from "@/utils/imageUtils";
import { IoLogoGithub } from "react-icons/io";
import { ImEye } from "react-icons/im";

/**
 * GridLayout Component
 *
 * Displays portfolio projects in a grid layout.
 * - Filters projects based on the selected technology tag.
 * - Uses `ProjectCard` to render individual project details.
 *
 * Props:
 * - portfolio: Object containing portfolio projects.
 * - selectedTag: String representing the selected technology filter.
 */

const GridLayout = ({ portfolio, selectedTag }) => {
  // Access the referenced projects
  const projectsRef = portfolio?.projects?.map((project) => project.fields);

  // Filter projects based on the selected tag
  const filteredProjects = selectedTag
    ? projectsRef.filter((project) =>
        project.techTags.some(
          (tag) => tag.toLowerCase().replace(/\s+/g, "-") === selectedTag
        )
      )
    : projectsRef;

  return (
    <div className="w-full grid max-[490px]:grid-cols-1 grid-cols-2 gap-4 xl:gap-6 pt-6 pb-8 px-2 border-b border-accent-border max-md:bg-bg-mobile-primary max-md:border-t max-md:mt-4">
      {filteredProjects.map((project, index) => {
        const {
          projectTitle,
          projectSlug,
          smallDescription,
          mainLanguage,
          mainLanguageColor,
          demoLink,
          codeLink,
          mainImage,
        } = project;

        return (
          <ProjectCard
            key={index}
            projectTitle={projectTitle}
            projectSlug={projectSlug}
            smallDescription={smallDescription}
            mainLanguage={mainLanguage}
            mainLanguageColor={mainLanguageColor}
            demoLink={demoLink}
            codeLink={codeLink}
            mainImage={mainImage}
          />
        );
      })}
    </div>
  );
};

export default GridLayout;

/**
 * ProjectCard Component
 *
 * Represents an individual portfolio project.
 * - Displays project title, description, and main language.
 * - Includes a project image with a hover effect.
 * - Provides links to the live demo and source code (if available).
 *
 * Props:
 * - projectTitle: String, title of the project.
 * - projectSlug: String, unique identifier for project URL.
 * - smallDescription: String, short description of the project.
 * - mainLanguage: String, primary language used in the project.
 * - mainLanguageColor: String, color associated with the main language.
 * - demoLink: String, URL for the project demo.
 * - codeLink: String, URL for the source code repository.
 * - mainImage: Object, contains image data for the project.
 */

const ProjectCard = ({
  projectTitle,
  projectSlug,
  smallDescription,
  mainLanguage,
  mainLanguageColor,
  demoLink,
  codeLink,
  mainImage,
  key,
}) => {
  return (
    <div
      key={key}
      className={`relative px-3 md:px-2 lg:px-4 pt-3 md:pt-2 lg:pt-4 max-[490px]:pb-10 max-[508px]:pb-20 max-md:pb-10 max-[852px]:pb-20 min-[853px]:pb-10 rounded-md border border-accent-border block overflow-hidden group hover:bg-bg-hover transition-all duration-300 max-md:bg-bg-tertiary`}
    >
      {/* Main Image */}

      <Link href={`/portfolio/${projectSlug}`} legacyBehavior>
        <a className="group block w-full">
          <div className="relative w-full max-[380px]:h-[190px] max-[490px]:h-[250px] h-[190px] sm:h-[220px] lg:h-[265px] xl:h-[290px] overflow-hidden rounded-md">
            {mainImage && mainImage.fields?.file?.url && (
              <Image
                src={getAssetUrl(mainImage)}
                alt={projectTitle}
                fill
                className="object-cover object-center w-full h-full transform group-hover:scale-105 transition-all duration-700 rounded-md"
              />
            )}
          </div>
        </a>
      </Link>

      {/* Text Content */}
      <div className=" pt-4 flex flex-col">
        <div className="flex-1 flex flex-col gap-2">
          {/* Project Title */}

          <Link
            href={`/portfolio/${projectSlug}`}
            className="w-fit text-lg md:text-xl lg:text-3xl font-bold leading-tight  text-text-link hover:underline"
          >
            {projectTitle}
          </Link>

          {/* Small Description */}
          <p className="text-text-secondary mb-2 sm:mb-3">{smallDescription}</p>
        </div>
      </div>

      {/* Language and links */}
      <div className="absolute left-4 bottom-4 flex items-center gap-4 flex-wrap mt-4">
        <div className="flex items-center gap-1">
          <div
            className="w-[12px] h-[12px] rounded-full"
            style={{ backgroundColor: mainLanguageColor }}
          />
          <p className="text-xs text-text-secondary mr-4">{mainLanguage}</p>
        </div>

        <div className="flex items-center gap-4">
          {demoLink && demoLink !== "none" ? (
            <Link
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="max-[265px]:hidden text-text-secondary hover:text-text-link hover:underline text-xs flex items-center gap-1 "
            >
              <ImEye size={18} />
              Demo
            </Link>
          ) : (
            <div className="max-[265px]:hidden relative w-fit group/item">
              <p className="text-text-secondary text-xs flex items-center gap-1 opacity-50 cursor-not-allowed ">
                <ImEye size={18} />
                Demo
              </p>
              <span className="absolute -bottom-6 left-1/2 tranform -translate-x-1/2 rounded-md px-[3px] py-[1px] border border-accent-border bg-bg-button text-[11px] text-text-secondary text-nowrap invisible group-hover/item:visible opacity-0 group-hover/item:opacity-100 translate-y-6 group-hover/item:translate-y-0 transition-all duration-300">
                Demo not available for this project
              </span>
            </div>
          )}

          {codeLink && codeLink !== "none" ? (
            <Link
              href={codeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="max-[265px]:hidden text-text-secondary hover:text-text-link hover:underline text-xs flex items-center gap-1 "
            >
              <IoLogoGithub size={18} />
              Code
            </Link>
          ) : (
            <div className="max-[265px]:hidden relative w-fit group/item">
              <p className="text-text-secondary text-xs flex items-center gap-1 opacity-50 cursor-not-allowed ">
                <IoLogoGithub size={18} />
                Code
              </p>
              <span className="absolute -bottom-6 left-1/2 tranform -translate-x-1/2 rounded-md px-[3px] py-[1px] border border-accent-border bg-bg-button text-[11px] text-text-secondary text-nowrap invisible group-hover/item:visible opacity-0 group-hover/item:opacity-100 translate-y-6 group-hover/item:translate-y-0 transition-all duration-300">
                Source code not available for this project
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
