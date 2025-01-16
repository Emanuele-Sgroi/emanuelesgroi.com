"use client";

import React, { useState } from "react";
import { GoCopilot } from "react-icons/go";
import { MdLightbulb } from "react-icons/md";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FaRobot, FaFutbol } from "react-icons/fa";
import { SiReact } from "react-icons/si";
import { FiRefreshCw } from "react-icons/fi";
import {
  IoCodeWorkingOutline,
  IoBrushOutline,
  IoCodeSharp,
} from "react-icons/io5";
import { HiOutlineLightBulb } from "react-icons/hi";
import { TfiInfoAlt } from "react-icons/tfi";
import { LuGithub } from "react-icons/lu";
import { TiLightbulb } from "react-icons/ti";

const ManuPilotBody = () => {
  const [conversationStarted, setConversationStarted] = useState(false);

  const suggestions = [
    {
      icon: (
        <TfiInfoAlt
          size={18}
          className="text-other-chart-orange4 max-[322px]:hidden"
        />
      ),
      label: "Tell me more about Emanuele Sgroi?",
    },
    {
      icon: (
        <LuGithub
          size={18}
          className="text-other-chart-green3 max-[322px]:hidden"
        />
      ),
      label: "What is this website about?",
    },
    {
      icon: (
        <FaRobot
          size={18}
          className="text-other-chart-purple4 max-[322px]:hidden"
        />
      ),
      label: "How does ManuPilot work?",
    },
    {
      icon: (
        <SiReact
          size={18}
          className="text-other-chart-blue4 max-[322px]:hidden"
        />
      ),
      label: "Explain React hooks to me",
    },
    {
      icon: (
        <IoCodeSharp
          size={18}
          className="text-accent-icon max-[322px]:hidden"
        />
      ),
      label: "Can you review my code?",
    },
    {
      icon: (
        <MdLightbulb
          size={18}
          className="text-other-chart-yellow4 dark:text-other-chart-yellow1 max-[322px]:hidden"
        />
      ),
      label: "Generate a project idea",
    },
  ];

  const mobileSuggestionsStyles = (index) => {
    let styles = "";
    switch (index) {
      case 0:
        styles = "max-sm:hidden";
        break;
      case 1:
        styles = "max-[322px]:border-other-chart-green3";
        break;
      case 2:
        styles = "max-sm:hidden";
        break;
      case 3:
        styles = "max-sm:hidden";
        break;
      case 4:
        styles = "max-[322px]:border-accent-icon";
        break;
      case 5:
        styles =
          "max-[322px]:border-other-chart-yellow4 max-[322px]:dark:border-other-chart-yellow1";
        break;
      default:
        styles = "max-[322px]:border-accent-icon";
        break;
    }
    return styles;
  };

  return (
    <div className="w-full center flex-1 relative overflow-y-auto">
      {conversationStarted ? (
        <div>{/* Ongoing conversation */}</div>
      ) : (
        <div className="w-full h-full center flex-col gap-12 p-4">
          {/* Conversation is resetted */}
          <div className="relative center ">
            <div className="w-[78px] h-[78px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-bg-primary z-[1] rounded-full" />
            <div className="w-[84px] h-[84px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-bg-primary z-[0] manupilot-background-gradient rounded-full" />
            <GoCopilot size={40} className="manupilot-rotate-animation z-10" />
          </div>
          <div className="center gap-4 flex-wrap max-w-[850px]">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                className={`flex items-center gap-2 py-2 px-4 rounded-full border border-accent-border hover:bg-bg-hover text-text-primary text-sm ${mobileSuggestionsStyles(
                  index
                )}`}
              >
                {suggestion.icon}
                {suggestion.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-text-secondary mt-[-24px] text-center">
            ManuPilot uses AI. Check for mistakes.
          </p>
        </div>
      )}
    </div>
  );
};

export default ManuPilotBody;
