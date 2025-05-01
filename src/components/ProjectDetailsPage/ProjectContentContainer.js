"use client";

import React, { useState } from "react";
import Link from "next/link";
import { IoCode } from "react-icons/io5";
import { SiKdenlive } from "react-icons/si";
import { FiBookOpen } from "react-icons/fi";
import { ProjectReadme, ProjectGallery } from "@/components";

/**
 * ProjectContentContainer Component
 *
 * Manages the main content of a project details page, including:
 * - Navigation tabs for switching between "Readme" and "Screenshots."
 * - Links to the project's demo and source code, with fallback messages if unavailable.
 * - Displays either the project Readme or a gallery of screenshots based on user selection.
 *
 * Features:
 * - Uses state to control active tabs ("Readme" or "Screenshots").
 * - Provides visual feedback for selected tabs with underlines and font changes.
 * - Buttons for demo and source code dynamically adjust based on availability.
 * - Responsive and accessible layout with adaptive UI elements.
 *
 * Props:
 * - project: Object containing project details such as demo link, source code link, and readme content.
 */

const ProjectContentContainer = ({ project, t }) => {
  const { demoLink, codeLink, readme } = project;
  const [activeTab, setActiveTab] = useState("readme");

  const getTabClassDiv = (tab) => {
    return activeTab === tab
      ? "absolute bottom-[-8px] h-[2px] bg-accent-active "
      : "hidden";
  };
  const getTabClassText = (tab) => {
    return activeTab === tab ? "font-semibold" : "";
  };

  return (
    <div
      className="flex-1 max-w-[894px] flex flex-col gap-6 md:gap-4 max-md:border-t max-md:border-accent-border max-md:bg-bg-mobile-primary max-md:pt-6 "
      suppressHydrationWarning
    >
      {/* Top link bar */}
      <div className="flex items-center justify-between gap-4 max-md:px-4">
        {demoLink && demoLink !== "none" ? (
          <Link
            href={demoLink}
            target="blank"
            rel="noopener noreferrer"
            className="btn-primary !bg-[#0969da] max-sm:!text-sm center gap-2"
          >
            <SiKdenlive size={18} />
            {t.demo}
          </Link>
        ) : (
          <div className="relative w-fit group/item">
            <button
              className="btn-primary !bg-[#0969da] max-sm:!text-sm !opacity-60"
              disabled
            >
              {t.demo}
            </button>
            <span className="absolute -bottom-6 left-0 rounded-md px-[3px] py-[1px] border border-accent-border bg-bg-button text-[11px] text-text-secondary text-nowrap invisible group-hover/item:visible opacity-0 group-hover/item:opacity-100 translate-y-6 group-hover/item:translate-y-0 transition-all duration-300 z-[999]">
              {t.demoNotAvailable}
            </span>
          </div>
        )}
        {codeLink && codeLink !== "none" ? (
          <Link
            href={codeLink}
            target="blank"
            rel="noopener noreferrer"
            className="btn-primary !bg-[#238636] max-sm:!text-sm center gap-2"
          >
            <IoCode size={18} />
            {t.code}
          </Link>
        ) : (
          <div className="relative w-fit group/item">
            <button
              className="btn-primary max-sm:!text-sm !bg-[#238636] opacity-60"
              disabled
            >
              {t.code}
            </button>
            <span className="absolute -bottom-6 right-0 rounded-md px-[3px] py-[1px] border border-accent-border bg-bg-button text-[11px] text-text-secondary text-nowrap invisible group-hover/item:visible opacity-0 group-hover/item:opacity-100 translate-y-6 group-hover/item:translate-y-0 transition-all duration-300 z-[999]">
              {t.codeNotAvailable}
            </span>
          </div>
        )}
      </div>

      {/* Readme & Screenshots */}
      <div className="w-full md:rounded-md md:border max-md:border-t max-md:border-b border-accent-border">
        {/* Navigation bar for readme and screenshots */}
        <div className="sticky top-0 w-full flex items-center justify-between px-6 md:px-4 py-2 border-b border-accent-border bg-bg-tertiary rounded-t-md z-[99]">
          {/* Big buttons */}
          <div className="flex items-center gap-6 flex-wrap">
            {/* Readme button*/}
            <div className="relative center">
              <button
                onClick={() => setActiveTab("readme")}
                className={`relative center gap-1 max-sm:!text-sm text-text-primary hover-box ${getTabClassText(
                  "readme"
                )}`}
              >
                <FiBookOpen size={18} className="text-accent-icon " />
                Readme
              </button>

              <div
                className={getTabClassDiv("readme")}
                style={{ width: `calc(100% + 10px)` }}
              />
            </div>
            {/* Screenshots button*/}
            <div className="relative center">
              <button
                onClick={() => setActiveTab("screenshots")}
                className={`relative center gap-1 max-sm:!text-sm text-text-primary hover-box ${getTabClassText(
                  "screenshots"
                )}`}
              >
                <FiBookOpen size={18} className="text-accent-icon " />
                Screenshots
              </button>

              <div
                className={getTabClassDiv("screenshots")}
                style={{ width: `calc(100% + 10px)` }}
              />
            </div>
          </div>
        </div>
        {activeTab === "readme" ? (
          <ProjectReadme project={project} t={t} />
        ) : (
          <ProjectGallery project={project} t={t} />
        )}
      </div>
    </div>
  );
};

export default ProjectContentContainer;
