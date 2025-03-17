"use client";

import React from "react";
import Link from "next/link";
import { IoLogoGithub } from "react-icons/io";
import { ImEye } from "react-icons/im";

/**
 * ListLayout Component
 *
 * Displays portfolio projects in a list layout.
 * - Filters projects based on the selected technology tag.
 * - Shows project title, description, main language, and links to demo/code (if available).
 *
 * Props:
 * - portfolio: Object containing portfolio projects.
 * - selectedTag: String representing the selected technology filter.
 */

const ListLayout = ({ portfolio, selectedTag }) => {
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
    <div className="w-full center flex-col max-md:bg-bg-mobile-primary max-md:mt-4 max-md:border-t max-md:border-accent-border">
      {filteredProjects.map((project, index) => {
        const {
          projectTitle,
          projectSlug,
          smallDescription,
          mainLanguage,
          mainLanguageColor,
          demoLink,
          codeLink,
        } = project;

        return (
          <div
            key={index}
            className="w-full flex justify-between max-[430px]:px-4 max-md:px-6 py-4 md:py-6 border-b border-accent-border"
          >
            {/* Left */}
            <div className="flex-1">
              <h4 className="flex items-center gap-1 flex-wrap">
                <span>
                  <Link
                    href={`/portfolio/${projectSlug}`}
                    className="text-lg md:text-xl font-semibold text-text-link hover:underline"
                  >
                    {projectTitle}
                  </Link>
                </span>
                <span className="max-md:hidden border border-accent-border rounded-full px-[5px] py-[3px] text-[11.9px] font-semibold text-accent-icon leading-none">
                  Public
                </span>
              </h4>
              <p className="text-sm text-text-secondary mt-1 mb-2 pr-6">
                {smallDescription}
              </p>
              <div className="flex items-center gap-1 mt-4 flex-wrap">
                <div
                  className="w-[12px] h-[12px] rounded-full"
                  style={{ backgroundColor: mainLanguageColor }}
                />
                <p className="text-xs text-text-secondary">{mainLanguage}</p>

                {demoLink && demoLink !== "none" ? (
                  <Link
                    href={demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="max-[265px]:hidden text-text-secondary hover:text-text-link hover:underline text-xs flex items-center gap-1 ml-4"
                  >
                    <ImEye size={18} />
                    Demo
                  </Link>
                ) : (
                  <div className="max-[265px]:hidden relative w-fit group/item">
                    <p className="text-text-secondary text-xs flex items-center gap-1 opacity-50 cursor-not-allowed ml-4">
                      <ImEye size={18} />
                      Demo
                    </p>
                    <span className="absolute -bottom-5 left-0 rounded-md px-[3px] py-[1px] border border-accent-border bg-bg-button text-[11px] text-text-secondary text-nowrap invisible group-hover/item:visible opacity-0 group-hover/item:opacity-100 translate-y-6 group-hover/item:translate-y-0 transition-all duration-300">
                      Demo not available for this project
                    </span>
                  </div>
                )}

                {codeLink && codeLink !== "none" ? (
                  <Link
                    href={codeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="max-[265px]:hidden text-text-secondary hover:text-text-link hover:underline text-xs flex items-center gap-1 ml-4"
                  >
                    <IoLogoGithub size={18} />
                    Code
                  </Link>
                ) : (
                  <div className="max-[265px]:hidden relative w-fit group/item">
                    <p className="text-text-secondary text-xs flex items-center gap-1 opacity-50 cursor-not-allowed ml-4">
                      <IoLogoGithub size={18} />
                      Code
                    </p>
                    <span className="absolute -bottom-5 right-0 rounded-md px-[3px] py-[1px] border border-accent-border bg-bg-button text-[11px] text-text-secondary text-nowrap invisible group-hover/item:visible opacity-0 group-hover/item:opacity-100 translate-y-6 group-hover/item:translate-y-0 transition-all duration-300">
                      Source code not available for this project
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListLayout;
