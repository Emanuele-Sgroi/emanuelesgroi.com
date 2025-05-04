"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getAssetUrl } from "@/utils/imageUtils";
import { RiBookMarkedFill } from "react-icons/ri";
import { VscPinned } from "react-icons/vsc";
import { ContributionChart } from "@/components";
import ProfileViews from "./ProfileViews";
import { useLanguage } from "@/context/LanguageContext";
import welcomeTranslation from "@/translations/welcome";

/**
 * WelcomeReadMe Component
 *
 * Displays a GitHub-style README section on the welcome page, including:
 * - A welcome message and brief about section.
 * - A technology stack showcasing skills with icons and colors.
 * - Pinned projects or tabs for quick access.
 * - A contribution chart with a customizable word display.
 *
 * Features:
 * - Dynamically loads skills and pinned tabs from the provided data.
 * - Utilizes a structured layout with headers, descriptions, and visual elements.
 * - Integrates a contribution chart similar to GitHub's activity chart.
 *
 * Props:
 * - `welcome`: Object containing all the necessary content, including:
 *   - `readmeTitle`: Title of the README section.
 *   - `welcomeTitle`: Main welcome message.
 *   - `aboutText`: A short introduction about the developer.
 *   - `stackTitle`: Title for the tech stack section.
 *   - `stackReference`: List of skills (with icons, colors, and names).
 *   - `exploreText`: Text inviting users to explore more.
 *   - `pinnedTitle`: Title for the pinned tabs section.
 *   - `pinnedTabReference`: List of pinned projects or tabs.
 *   - `chartWord`: Word displayed in the contribution chart.
 */

const WelcomeReadMe = ({ welcome }) => {
  // translation
  const { language } = useLanguage();
  const t = welcomeTranslation[language];

  const {
    readmeTitle,
    welcomeTitle,
    aboutText,
    stackTitle,
    stackReference,
    exploreText,
    pinnedTitle,
    pinnedTabReference,
    chartWord,
  } = welcome;

  // Access the referenced Skills
  const skillsRef = stackReference?.map((skill) => skill.fields);

  // Access the referenced Pinned Tabs
  const pinnedTabsRef = pinnedTabReference?.map((tab) => tab.fields);

  return (
    <div className="main-container">
      <div className="borded-container">
        <div className="w-full flex justify-start max-md:px-4">
          <ReadmeTitle title={readmeTitle} />
        </div>
        <div className="w-full center mt-4 border-b border-accent-border pb-3 md:pb-1 max-md:px-4 text-center">
          <h1 className="font-semibold max-[375px]:text-[24px]">
            {welcomeTitle}
          </h1>
        </div>
        <div className="w-full center mt-6 max-md:px-4">
          <p className="font-semibold text-[17.5px]">{aboutText}</p>
        </div>
        {/* Contact CTA */}
        <div className="w-full flex items-center justify-start mt-6 max-md:px-4">
          <Link href="/contact" className="btn-primary">
            {t.contact}
          </Link>
        </div>
        <div className="w-full mt-6 mb-4 border-b border-accent-border pb-1 max-md:px-4">
          <h4 className="font-semibold max-[375px]:text-[20px]">
            {stackTitle}
          </h4>
        </div>
        <div className="w-full flex justify-start gap-2 md:gap-3 flex-wrap max-md:px-4">
          {skillsRef.map((skill, index) => (
            <div
              key={index}
              className="py-[3px] md:py-1 px-[7px] md:px-2 center gap-[5px] rounded-[2px]"
              style={{ backgroundColor: skill.skillColor }}
            >
              <Image
                src={getAssetUrl(skill.skillIcon)}
                alt={`${skill.skillName} icon`}
                width={20}
                height={20}
                className="max-md:w-[18px] max-md:h-[18px]"
              />
              <p className="text-sm" style={{ color: skill.skillTextColor }}>
                {skill.skillName}
              </p>
            </div>
          ))}
        </div>
        <div className="w-full center mt-8 max-md:px-4">
          <p className="text-sm">{exploreText}</p>
        </div>
        <ProfileViews t={t} />
      </div>
      {/* Pinned tabs */}
      <PinnedTabs t={t} title={pinnedTitle} pinnedTabs={pinnedTabsRef} />
      {/*Contribution chart */}
      <ContributionChart t={t} word={chartWord.toUpperCase()} />
    </div>
  );
};

export default WelcomeReadMe;

const ReadmeTitle = ({ title }) => {
  // Match the exact pattern "something/something.md"
  const match = title.match(/^[^/]+\/[^/]+\.md$/);

  // If it doesn't match, return the plain title
  if (!match) {
    return <p className="w-full text-xs text-text-secondary">{title}</p>;
  }

  // If it matches, split the title for styling
  const parts = title.split(/(\/|\.md)/); // Split on "/" and ".md"

  return (
    <p className="w-full text-xs monospace-text">
      {parts.map((part, index) => {
        // Style "/" and ".md" differently
        if (part === "/" || part === ".md") {
          return (
            <span
              key={index}
              className={`text-accent-icon ${part === "/" && "mx-[2px]"}`}
            >
              {part}
            </span>
          );
        }

        // Default style for other parts
        return (
          <span key={index} className="text-text-primary">
            {part}
          </span>
        );
      })}
    </p>
  );
};

const PinnedTabs = ({ t, title, pinnedTabs }) => {
  const truncateText = (text, max) => {
    if (text.length > max) {
      return text.substring(0, max) + "...";
    }
    return text;
  };

  return (
    <div className="w-full mt-[18px] md:mt-6 max-md:bg-bg-mobile-primary max-md:border-y max-md:border-y-accent-border max-md:py-4 max-md:shadow-sm">
      <div className="w-full flex justify-start items-center gap-1 max-md:px-4">
        <VscPinned
          size={18}
          className="md:hidden transform rotate-45 text-accent-icon"
        />
        <p>{title}</p>
      </div>
      <div className="max-md:hidden w-full grid grid-cols-2 gap-4 mt-2">
        {pinnedTabs.map((tab, index) => (
          <div
            key={index}
            className="min-h-[125px] border border-accent-border rounded-md p-4 flex flex-col justify-between"
          >
            {/* Tab header */}
            <div className="w-full flex flex-col">
              <div className="flex justify-start items-center ">
                <RiBookMarkedFill
                  size={18}
                  className="text-accent-icon min-w-[18px] mr-1"
                />
                <Link
                  href={tab.linkTab}
                  className="w-auto text-sm font-semibold hover:underline overflow-hidden text-nowrap"
                >
                  {tab.title.substring(0, 45)}
                </Link>

                <div className="flex items-center">
                  <span className="max-md:hidden mr-2 text-sm font-semibold text-text-link">
                    {tab.title.length > 45 && "..."}
                  </span>
                  <div className="border border-accent-border rounded-full p-1">
                    <p className="text-[11.9px] font-semibold text-accent-icon leading-none">
                      {t.public}
                    </p>
                  </div>
                </div>
              </div>
              {/* Tab decription */}
              <p className="text-xs text-text-secondary my-2">
                {truncateText(tab.description, 140)}
              </p>
            </div>

            {/* Tab footer */}
            <div className="flex justify-start items-center gap-2">
              <span
                className={`w-[12px] h-[12px] rounded-full ${
                  tab.category === "/writings"
                    ? "bg-[#0969da]"
                    : "bg-accent-active"
                }`}
              ></span>
              <Link
                href={tab.linkCategory}
                className="text-xs text-text-secondary hover:underline leading-none"
              >
                {tab.category}
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="md:hidden w-full flex gap-4 mt-3 overflow-x-scroll hide-scrollbar">
        {pinnedTabs.map((tab, index) => (
          <Link key={index} href={tab.linkTab} className="block group">
            <div className="h-[145px] min-w-[270px] border border-accent-border rounded-md p-3 flex flex-col justify-between first:ml-4 last:mr-4 max-md:bg-bg-button">
              {/* Tab header */}
              <div className="w-full flex flex-col">
                <div className="w-fit border border-accent-border rounded-full p-1 mb-2">
                  <p className="text-[11.5px] font-semibold text-accent-icon leading-none">
                    {t.public}
                  </p>
                </div>
                <div className="flex justify-start items-center gap-2">
                  <p className="w-auto text-[13px] leading-4 font-semibold text-text-primary">
                    {tab.title}
                  </p>
                </div>
                {/* Tab description */}
                <p className="text-xs text-text-secondary my-2">
                  {truncateText(tab.description, 40)}
                </p>
              </div>

              {/* Tab footer */}
              <div className="flex justify-start items-center gap-2">
                <span className="w-[12px] h-[12px] bg-accent-active rounded-full"></span>
                {/* Use onClick instead of a nested Link */}
                <span
                  className="text-xs text-text-secondary hover:underline leading-none"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents the parent Link from triggering
                    window.location.href = tab.linkCategory; // Redirects to category
                  }}
                >
                  {tab.category}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
