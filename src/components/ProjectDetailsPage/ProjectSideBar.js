"use client";

import React, { useState } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { TfiClose } from "react-icons/tfi";
import { IoCodeDownloadSharp } from "react-icons/io5";

/**
 * ProjectSideBar Component
 *
 * Displays project-related metadata, including:
 * - A short project description.
 * - Technology tags.
 * - Indicators for whether the project was designed and developed.
 * - A categorized breakdown of the tech stack used.
 * - A language distribution bar showing programming languages used.
 *
 * Features:
 * - **Expandable Section**: On smaller screens, the content is initially collapsed and can be expanded.
 * - **Categorized Tech Stack**: Groups technologies into categories (e.g., Frontend, Backend, Database).
 * - **Designed & Developed Indicators**: Uses checkmarks for Yes or No
 * - **Language Usage Bar**: Displays a colour-coded distribution of programming languages used in the project.
 *
 * Props:
 * - `project`: Object containing:
 *   - `smallDescription`: A brief summary of the project.
 *   - `techTagsBulk`: An array of tech-related tags.
 *   - `designed`: Boolean indicating if the project was designed by the owner.
 *   - `developed`: Boolean indicating if the project was developed by the owner.
 *   - `techStack`: Array of technologies used, categorized by type.
 *   - `languages`: JSON string or array containing programming language distribution details.
 */

const ProjectSideBar = ({ project, t, language }) => {
  const {
    smallDescription,
    techTagsBulk,
    designed,
    developed,
    techStack,
    languages,
  } = project;

  const [isExpanded, setIsExpanded] = useState(false);

  const itLabels = {
    "Frameworks & Libraries": "Frameworks & Librerie",
    "Styling & UI": "Stilizzazione & UI",
    "Databases & Backend Services": "Database & Servizi Backend",
    "CMS & APIs": "CMS & APIs",
    "Hosting & Deployment": "Hosting & Distribuzione",
    "Developer Tools & Misc": "Strumenti Dev e Varie",
  };

  // Access the referenced project tech stack
  const techStackRef = techStack?.map((tech) => tech.fields);

  // Parse JSON for languages
  const parsedLanguages =
    typeof languages === "string" ? JSON.parse(languages) : languages || [];

  // Group technologies by category
  const categorizedTechStack = techStackRef?.reduce((acc, tech) => {
    const category = tech.category;

    if (!acc[category]) {
      acc[category] = [];
    }

    acc[category].push(tech.name);
    return acc;
  }, {});

  return (
    <div
      className="
      max-[855px]:w-full 
      max-[855px]:max-w-full 
      min-w-[240px] 
      max-w-[296px] 
      flex 
      flex-col 
      justify-start 
      items-start 
      gap-4 
      md:pt-1 
      max-md:bg-bg-mobile-primary 
      max-md:border-t 
      max-md:border-b 
      max-md:border-accent-border 
      max-md:py-6 
      max-md:px-6 
      max-sm:px-4
    "
    >
      <div
        className={` 
      w-full 
      flex 
      flex-col 
      justify-start 
      items-start 
      gap-4 
      max-md:border-b max-md:border-accent-border max-md:pb-2
      ${!isExpanded ? "max-md:max-h-40 max-md:overflow-hidden" : ""}
    `}
      >
        {/* Small description */}
        <p className="font-semibold">{t.about}</p>
        <p>{smallDescription}</p>
        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {techTagsBulk.map((tag, i) => (
            <div key={i} className="tag-primary">
              {tag}
            </div>
          ))}
        </div>

        {/* Designed & developed */}
        <div className="w-full flex flex-col gap-2 border-b border-accent-border pb-4">
          <p className="flex items-center text-sm text-text-secondary gap-2">
            <span>
              {designed ? (
                <IoMdCheckmark
                  size={16}
                  className="text-[#216e39] dark:text-[#30a14e]"
                />
              ) : (
                <TfiClose
                  size={15}
                  className="text-red-700 dark:text-red-600"
                />
              )}
            </span>
            {t.designed}
          </p>
          <p className="flex items-center text-sm text-text-secondary gap-2">
            <span>
              {developed ? (
                <IoMdCheckmark
                  size={16}
                  className="text-[#216e39] dark:text-[#30a14e]"
                />
              ) : (
                <TfiClose
                  size={15}
                  className="text-red-700 dark:text-red-600"
                />
              )}
            </span>
            {t.developed}
          </p>
        </div>

        {/* Development summary */}

        <div className="w-full border-b border-accent-border pb-4">
          <h2 className="text-base font-semibold mb-3">{t.devSummary}</h2>
          <ul className="flex flex-col justify-start items-start gap-2">
            {categorizedTechStack &&
              Object.entries(categorizedTechStack).map(
                ([category, technologies]) => (
                  <li key={category}>
                    <p className="text-sm font-medium flex items-center gap-2">
                      <span>
                        <IoCodeDownloadSharp
                          size={19}
                          className="text-[#3fb950]"
                        />
                      </span>
                      {/* {category} */}
                      {language === "it"
                        ? itLabels[category] ?? category
                        : category}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1 ml-[27px]">
                      {technologies.map((tech, index) => (
                        <p
                          key={index}
                          className="text-sm text-text-secondary cursor-default"
                        >
                          <span className="hover:text-text-link hover:underline">
                            {tech}
                          </span>
                          {index !== technologies.length - 1 && <span>,</span>}
                        </p>
                      ))}
                    </div>
                  </li>
                )
              )}
          </ul>
        </div>

        {/* Languages */}
        <div className="w-full">
          <h2 className="text-base font-semibold mb-3">{t.languages}</h2>
          <div className="w-full h-[8px] center gap-[2px] rounded-full overflow-hidden mb-2">
            {parsedLanguages.map((lang, index) => (
              <div
                key={index}
                className="h-full"
                style={{
                  width: `${lang.percentage}%`,
                  backgroundColor: lang.color,
                }}
              ></div>
            ))}
          </div>
          <div className="w-full flex flex-wrap gap-[2px]">
            {parsedLanguages.map((lang, index) => (
              <div key={index} className="flex items-center gap-2">
                {/* Language Color Indicator */}
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: lang.color }}
                />
                {/* Language Name */}
                <p className="text-xs text-text-primary font-medium">
                  {lang.name}
                </p>
                {/* Language Percentage */}
                <p className="text-xs text-text-secondary">
                  {lang.percentage}
                  %&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* The Expand/Collapse Button (placed *outside* the overflow-hidden div) */}
      <div className="block md:hidden w-fit">
        <button
          className="text-sm font-semibold text-text-link"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? t.collapse : t.expand}
        </button>
      </div>
    </div>
  );
};

export default ProjectSideBar;
