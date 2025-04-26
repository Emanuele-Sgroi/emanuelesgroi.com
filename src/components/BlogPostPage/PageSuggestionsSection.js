"use client";

import React from "react";
import Link from "next/link";
import { GoCodeSquare, GoCommentDiscussion } from "react-icons/go";
import { LuBrain } from "react-icons/lu";
import { GoCopilot } from "react-icons/go";
import { MdOutlineNavigateNext } from "react-icons/md";

/**
 * PageSuggestionsSection Component
 *
 * Displays a set of links to other key sections of the website.
 * Each suggestion includes:
 * - An icon
 * - A title
 * - A short description
 * - A button link to the section
 */

const PageSuggestionsSection = ({ t }) => {
  const suggestions = [
    {
      title: t.suggestions.portfolio.title,
      description: t.suggestions.portfolio.description,
      link: "/portfolio",
      linkName: t.suggestions.portfolio.linkName,
      icon: <GoCodeSquare size={22} className="text-cyan-500" />,
    },
    {
      title: t.suggestions.manupilot.title,
      description: t.suggestions.manupilot.description,
      link: "/manupilot",
      linkName: t.suggestions.manupilot.linkName,
      icon: (
        <GoCopilot size={22} className="text-[#006d32] dark:text-[#39d353]" />
      ),
    },
    {
      title: t.suggestions.devquiz.title,
      description: t.suggestions.devquiz.description,
      link: "/dev-quiz",
      linkName: t.suggestions.devquiz.linkName,
      icon: <LuBrain size={22} className="text-[#f44336]" />,
    },
    {
      title: t.suggestions.discussions.title,
      description: t.suggestions.discussions.description,
      link: "/discussions",
      linkName: t.suggestions.discussions.linkName,
      icon: <GoCommentDiscussion size={22} className="text-[#8f6bb5]" />,
    },
  ];

  return (
    <div className="w-full center max-[500px]:px-4 px-6 pt-12 md:pt-20 pb-12 max-md:pb-32">
      <div className="w-full max-w-[1232px] flex flex-col items-start justify-start">
        {/* Suggestions */}
        <div className="w-full">
          <h3 className="text-text-primary text-left poppins-bold text-xl sm:text-3xl">
            {t.suggestions.explore}
          </h3>
          <div className="w-full h-[2px] bg-accent-border mt-3 mb-6"></div>
          {/* Show suggestions */}
          <div className="w-full grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">
            {suggestions.map((item, i) => (
              <div
                key={i}
                className=" flex flex-col items-start justify-between p-4 sm:p-8 bg-bg-button rounded-md"
              >
                <div className="flex flex-col gap-4">
                  <div className="w-fit p-4 rounded-full bg-bg-hover">
                    {item.icon}
                  </div>
                  <h5 className="text-xl poppins-semibold">{item.title}</h5>
                  <p className="poppins-regular text-text-secondary">
                    {item.description}
                  </p>
                </div>
                <Link
                  href={item.link}
                  className="poppins-medium text-base text-text-primary hover:text-text-link hover:underline flex items-center gap-1 mt-12 md:mt-16"
                >
                  {item.linkName}
                  <MdOutlineNavigateNext size={18} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageSuggestionsSection;
