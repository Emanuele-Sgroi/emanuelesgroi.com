"use client";

import React from "react";
import Link from "next/link";
import { GoCodeSquare, GoCommentDiscussion } from "react-icons/go";
import { LuBrain } from "react-icons/lu";
import { GoCopilot } from "react-icons/go";
import { MdOutlineNavigateNext } from "react-icons/md";

const PageSuggestionsSection = () => {
  const suggestions = [
    {
      title: "Portfolio",
      description: "A collection of projects I've worked on",
      link: "/portfolio",
      linkName: "Browse projects",
      icon: <GoCodeSquare size={22} className="text-cyan-500 " />,
    },
    {
      title: "ManuPilot",
      description:
        "A personalised AI-powered assistant inspired by GitHub Copilot",
      link: "/manupilot",
      linkName: "Use the AI",
      icon: (
        <GoCopilot size={22} className="text-[#006d32] dark:text-[#39d353]" />
      ),
    },
    {
      title: "Dev Quiz",
      description: "Challenge yourself with questions across different topics",
      link: "/dev-quiz",
      linkName: "Take the quiz",
      icon: <LuBrain size={22} className="text-[#f44336]" />,
    },
    {
      title: "Discussions",
      description: "Have something to say? Join the discussion!",
      link: "/discussions",
      linkName: "Join now",
      icon: <GoCommentDiscussion size={22} className="text-[#8f6bb5]" />,
    },
  ];
  return (
    <div className="w-full center max-[500px]:px-4 px-6 pt-12 md:pt-20 max-md:pb-32">
      <div className="w-full max-w-[1232px] flex flex-col items-start justify-start">
        {/* Suggestions */}
        <div className="w-full">
          <h3 className="text-text-primary text-left poppins-bold text-xl sm:text-3xl">
            Explore More from My Website
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
        {/* Scroll to top */}
      </div>
    </div>
  );
};

export default PageSuggestionsSection;
