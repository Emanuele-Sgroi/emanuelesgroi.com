"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getAssetUrl } from "@/utils/imageUtils";
import { useChat } from "@/context/ChatProvider";
import { usePathname } from "next/navigation";
import { IoClose } from "react-icons/io5";
import { PiCornersOutBold } from "react-icons/pi";
import { AiOutlinePlus } from "react-icons/ai";
import { GoCopilot } from "react-icons/go";
import { FiArrowRight } from "react-icons/fi";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Spinner } from "@/components";
import ChatInput from "./ChatInput";

export default function ChatBody({
  portfolioContent,
  isPortfolioLoading,
  isPortfolioError,
}) {
  // Access the referenced projects
  const projectsRef = portfolioContent?.projects?.map(
    (project) => project.fields
  );

  const [activeChat, setActiveChat] = useState(null); // null | 'general' | { projectName: 'example', questions: [aiQuestions] }

  // Function to handle starting project chat
  const handleProjectClick = (projectName, questions) => {
    setActiveChat({ type: "project", project: { projectName, questions } });
  };

  // Function to handle starting general chat
  const handleGeneralChatClick = () => {
    setActiveChat({ type: "general" });
  };

  const truncateText = (text, maxLenght) => {
    if (text.length > maxLenght) {
      return text.substring(0, maxLenght) + "...";
    }
    return text;
  };

  return (
    <div className=" w-full center flex-col py-2 px-8">
      {/* Intro Screen */}
      {!activeChat && (
        <>
          <div className="relative w-[78px] h-[78px] center mt-2">
            <div className="w-[78px] h-[78px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-bg-primary z-[1] rounded-full " />
            <div className="w-[84px] h-[84px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-bg-primary z-[0] manupilot-background-gradient rounded-full" />
            <GoCopilot size={40} className="manupilot-rotate-animation z-10" />
          </div>
          <h1 className="text-xl font-semibold text-center my-2">
            Ask ManuPilot
          </h1>
          <p className="text-sm text-text-secondary text-center mb-4">
            Select one of my projects to get started. Ask questions about the
            project to get answers quickly and learn your way around.
          </p>
          {/* Loading State */}
          {isPortfolioLoading || !portfolioContent ? (
            <div className="w-full center mt-4">
              <Spinner />
            </div>
          ) : (
            <div className="w-full">
              {/* Project List */}
              <Command className="!h-fit border border-accent-border bg-bg-primary !rounded-t-md !rounded-b-none !pb-0">
                <CommandInput placeholder="Search a project to chat about" />
                {!isPortfolioError ? (
                  <CommandList className="bg-bg-tertiary">
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup
                      heading="Portfolio"
                      className="!max-h-[160px] !overflow-y-auto thin-scrollbar !bg-bg-tertiary"
                    >
                      {projectsRef.map((project, index) => {
                        const { projectTitle, aiQuestions, authorImage } =
                          project;

                        return (
                          <CommandItem
                            key={index}
                            className="!gap-0 !m-0 !p-0 !rounded-none data-[selected='true']:!bg-transparent dark:data-[selected='true']:!bg-transparent"
                          >
                            <button
                              onClick={() =>
                                handleProjectClick(projectTitle, aiQuestions)
                              }
                              className="w-full flex gap-1 items-center justify-between rounded-md hover:bg-bg-hover dark:hover:bg-bg-hover2 px-1 py-[6px]"
                            >
                              <div className="relative flex items-center gap-2 z-20">
                                <div className="w-[21px] h-[21px] max-w-6 max-h-6 border border-accent-border rounded-full">
                                  <Image
                                    src={getAssetUrl(authorImage)}
                                    alt="Profile_Picture"
                                    width={21}
                                    height={21}
                                    priority
                                    quality={100}
                                    className="w-full h-full rounded-full object-cover object-center z-10"
                                  />
                                </div>
                                <p className="text-sm tracking-tight">
                                  <span className="text-text-secondary">
                                    Emanuele-Sgroi/
                                  </span>
                                  <span className="text-text-primary">
                                    {truncateText(projectTitle, 33)}
                                  </span>
                                </p>
                              </div>
                              <FiArrowRight
                                size={16}
                                className="relative text-accent-icon z-20"
                              />
                            </button>

                            {/* <div className="group/edit invisible group-hover/item:visible absolute top-0 left-0 w-full h-full !bg-bg-hover dark:!bg-bg-hover2 rounded-md  !z-10" /> */}
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  </CommandList>
                ) : (
                  <div className="bg-bg-tertiary min-h-[120px] p-4">
                    <p className="text-sm text-red-600">
                      Couldn&apos;t load the projects here. Start a general
                      purpose chat.
                    </p>
                  </div>
                )}
              </Command>

              {/* General purpose chat */}
              <div className="p-2 border-b border-x border-accent-border rounded-b-md">
                <button
                  onClick={handleGeneralChatClick}
                  className="w-full flex gap-1 items-center justify-between rounded-md hover:bg-bg-hover dark:hover:bg-bg-hover2 p-1"
                >
                  <div className="relative flex items-center gap-2 z-20">
                    <p className="text-sm">General purpose chat</p>
                  </div>
                  <FiArrowRight
                    size={16}
                    className="relative text-accent-icon z-20"
                  />
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Chat Interface */}
      {activeChat && (
        <div className="flex flex-col flex-1 justify-between h-full">
          <div className="flex-1 overflow-y-auto p-4 thin-scrollbar">
            <p className="text-xs text-text-secondary">
              ManuPilot uses AI. Check for mistakes.
            </p>
          </div>

          {/* Chat Input */}
          <ChatInput
            projectName={activeChat.project.projectName || null}
            aiQuestions={activeChat.project.questions || null}
          />
        </div>
      )}
    </div>
  );
}
