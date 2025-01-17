"use client";

import React, { useState, useRef, useEffect } from "react";
import { GoCopilot } from "react-icons/go";
import { MdLightbulb } from "react-icons/md";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FaRobot, FaFutbol, FaArrowDown } from "react-icons/fa";
import { SiReact } from "react-icons/si";
import { FiRefreshCw } from "react-icons/fi";
import {
  IoCodeWorkingOutline,
  IoBrushOutline,
  IoCodeSharp,
  IoArrowDown,
} from "react-icons/io5";
import { TfiInfoAlt } from "react-icons/tfi";
import { LuGithub } from "react-icons/lu";

const ManuPilotBody = ({ conversation, loading }) => {
  const containerRef = useRef(null);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    // Scroll to bottom
    containerRef.current.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [conversation, loading]);

  // Listen for scroll to detect if user is near the top
  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop } = containerRef.current;
    // Show the button if the user is near the top, e.g. top < 100
    if (scrollTop < 50) {
      setShowScrollToBottom(true);
    } else {
      setShowScrollToBottom(false);
    }
  };

  // Scroll user back to the bottom
  const scrollToBottom = () => {
    if (!containerRef.current) return;
    containerRef.current.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

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
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="
      flex-1 
      min-h-0         
      w-full 
      relative 
      overflow-y-auto 
      medium-scrollbar 
      flex 
      flex-col       
      items-start     
      "
    >
      {conversation.length > 0 || loading ? (
        <div className=" w-full center px-4">
          <div className=" w-full max-w-[850px] flex flex-col gap-4 px-4 py-4">
            {conversation.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user"
                    ? "justify-end"
                    : "justify-start items-start gap-4 my-4"
                }`}
              >
                {message.role !== "user" && (
                  <div className="pt-[3px]">
                    <GoCopilot size={20} className="text-accent-icon" />
                  </div>
                )}
                <div
                  className={`rounded-lg ${
                    message.role === "user"
                      ? "bg-bg-tertiary text-text-primary px-4 py-2"
                      : "text-text-primary"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {/* Loading State */}
            {loading && (
              <div className="flex justify-start items-center gap-4 my-4">
                <GoCopilot size={20} className="text-accent-icon" />
                <div className="manupilot-shimmer">
                  ManuPilot is thinking...
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-full center flex-col gap-12 p-4">
          {/* Conversation is resetted */}
          <div className="relative center">
            <div className="w-[78px] h-[78px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-bg-primary z-[1] rounded-full " />
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

      {/* Conditionally show the "Scroll to Bottom" button if near top */}
      {showScrollToBottom && (
        <button
          onClick={scrollToBottom}
          className="
            absolute bottom-4 left-1/2 transform -translate-x-1/2
            bg-bg-button text-text-primary border border-accent-border
            rounded-full p-3 z-10
          "
        >
          <IoArrowDown size={20} className="text-accent-icon" />
        </button>
      )}
    </div>
  );
};

export default ManuPilotBody;
