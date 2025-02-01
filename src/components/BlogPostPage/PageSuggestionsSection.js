"use client";

import React from "react";
import Link from "next/link";
import { GoCodeSquare, GoCommentDiscussion } from "react-icons/go";
import { LuBrain } from "react-icons/lu";
import { GoCopilot } from "react-icons/go";

const PageSuggestionsSection = () => {
  const suggestions = [
    {
      title: "Portfolio",
      description: "A collection of projects I've worked on",
      link: "/portfolio",
      linkName: "Browse projects",
      icon: <GoCodeSquare size={18} className="text-accent-icon " />,
    },
    {
      title: "ManuPilot",
      description: "An AI-powered assistant inspired by GitHub Copilot",
      link: "/manupilot",
      linkName: "Chat with ManuPilot",
      icon: <GoCopilot size={18} className="text-accent-icon " />,
    },
    {
      title: "Dev Quiz",
      description: "Challenge yourself with questions across different topics",
      link: "/dev-quiz",
      linkName: "Take the quiz",
      icon: <LuBrain size={18} className="text-accent-icon" />,
    },
    {
      title: "Discussions",
      description: "Have something to say? Join the discussion!",
      link: "/discussions",
      linkName: "Join now",
      icon: <GoCommentDiscussion size={18} className="text-accent-icon" />,
    },
  ];
  return (
    <div className="w-full max-w-[1232px] pt-20 flex flex-col items-start justify-start">
      {/* Suggestions */}
      <div className="w-full">
        <h3 className="text-text-primary text-left poppins-bold text-3xl">
          Explore More from My Website
        </h3>
        <div className="w-full h-[2px] bg-accent-border mt-3 mb-6"></div>
        {/* Show suggestions */}
        <div className="w-full grid gap-6 grid-cols-3 "></div>
      </div>
      {/* Scroll to top */}
    </div>
  );
};

export default PageSuggestionsSection;
