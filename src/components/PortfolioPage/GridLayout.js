"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getAssetUrl } from "@/utils/imageUtils";
import { IoLogoGithub } from "react-icons/io";
import { IoStar, IoStarOutline } from "react-icons/io5";
import { ImEye } from "react-icons/im";

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
  const [approvedProjects, setApprovedProjects] = useState({});

  const toggleApproval = (index) => {
    setApprovedProjects((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div
      key={key}
      className={`p-3 md:p-2 lg:p-4 rounded-md border border-accent-border block overflow-hidden group hover:bg-bg-hover transition-all duration-300 max-md:bg-bg-tertiary`}
    >
      {/* Main Image */}
      <Link href={`/portfolio/${projectSlug}`}>
        {mainImage && mainImage.fields?.file?.url && (
          <div className="group relative w-full max-[380px]:h-[190px] max-[490px]:h-[250px] h-[190px] sm:h-[220px] lg:h-[265px] xl:h-[290px] overflow-hidden rounded-md">
            <Image
              src={getAssetUrl(mainImage)}
              alt={projectTitle}
              fill
              className="object-cover object-center w-full h-full transform group-hover:scale-105 transition-all duration-700 rounded-md"
            />
          </div>
        )}
      </Link>

      {/* Text Content */}
      <div className="pt-4 flex flex-col justify-between">
        <div className="flex flex-col gap-2">
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

        {/* Language and links */}
        <div className="flex items-center gap-4 flex-wrap mt-4">
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

        {/* Approve button */}
        <div className="max-md:hidden w-full flex justify-end items-center mt-4">
          <button
            onClick={() => toggleApproval(key)}
            className="text-xs font-semibold center gap-2 px-3 py-1 border border-accent-border bg-bg-button hover:bg-bg-hover2 rounded-md"
          >
            {approvedProjects[key] ? (
              <IoStar size={16} className="text-[#E3B341]" />
            ) : (
              <IoStarOutline size={16} className="text-accent-icon" />
            )}
            {approvedProjects[key] ? "Approved" : "Approve"}
          </button>
        </div>
      </div>
    </div>
  );
};
