"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { getAssetUrl } from "@/utils/imageUtils";
import { useChat } from "@/context/ChatProvider";
import { GoCopilot } from "react-icons/go";
import { FiArrowRight } from "react-icons/fi";
import { FaFileCode } from "react-icons/fa";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Spinner } from "@/components";
import ChatInput from "./ChatInput";
import { images } from "@/utils/imageImport";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import ChatCodeBlock from "./ChatCodeBlock";
import { useQuota } from "@/context/QuotaProvider";

const customComponents = {
  hr: () => <hr className="border-accent-border my-2" />,

  p: ({ children }) => (
    <p className="text-sm text-text-primary leading-normal whitespace-normal break-words !p-0 !m-0">
      {children}
    </p>
  ),
  h1: ({ children }) => (
    <h1 className="text-2xl font-semibold text-text-primary break-words !p-0 !m-0">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-lg font-semibold text-text-primary break-words !p-0 !m-0">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-base font-medium text-text-primary break-words !p-0 !m-0">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-sm font-medium text-text-primary break-words !p-0 !m-0">
      {children}
    </h4>
  ),
  h5: ({ children }) => (
    <h5 className="text-xs font-medium  text-text-primary break-words !p-0 !m-0">
      {children}
    </h5>
  ),
  h6: ({ children }) => (
    <h6 className="text-xs font-semibold text-text-primary break-words !p-0 !m-0">
      {children}
    </h6>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 text-xs border-text-primary pl-2 opacity-80 italic break-words">
      {children}
    </blockquote>
  ),
  ul: ({ children }) => (
    <ul className="list-disc pl-4 text-text-primary text-sm !py-0 !m-0 !gap-0">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal pl-4 text-text-primary text-sm !py-0 !m-0 !gap-0">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="text-sm leading-snug !p-0 !m-0">{children}</li>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-text-link text-sm underline"
    >
      {children}
    </a>
  ),
  code: ({ inline, className, children }) => {
    const language = /language-(\w+)/.exec(className || "")?.[1] || "plaintext";
    if (!inline && language !== "plaintext") {
      return (
        <ChatCodeBlock
          code={String(children).replace(/\n$/, "")}
          lang={language}
        />
      );
    }
    return (
      <code className="inline-block px-1 py-[1px] text-xs rounded-sm bg-bg-button text-text-primary break-words">
        {children}
      </code>
    );
  },
};

/**
 * ChatBody Component
 *
 * This is the main AI chat interface for ManuPilot Quick Chat. It allows users to:
 * - Select and chat about projects from the portfolio
 * - Start a general-purpose chat
 * - View AI-generated responses with support for Markdown & code blocks
 */

export default function ChatBody({
  activeChat,
  setActiveChat,
  portfolioContent,
  isPortfolioLoading,
  isPortfolioError,
  manuPilotContent,
  isManuPilotLoading,
  isManuPilotError,
  error,
  setError,
  droppedFile,
  setDroppedFile,
  switchToGeneralChat,
  t,
  language,
}) {
  // Access the referenced projects
  const projectsRef = portfolioContent?.projects?.map(
    (project) => project.fields
  );

  const { messages } = useChat(); // get the messages from context

  // Quota
  const { remaining, secondsLeft, updateFromHeaders } = useQuota();
  const reachedLimit =
    remaining <= 0 && secondsLeft !== null && secondsLeft > 0;

  // State for AI processing, scrolling, and UI behavior
  const [isThinking, setIsThinking] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);
  const containerRef = useRef(null);

  // Auto-scroll to bottom when messages change (if autoScroll is enabled)
  useEffect(() => {
    if (autoScroll) {
      const container = containerRef.current;
      if (container) {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: "smooth",
        });
      }
    }
  }, [messages, autoScroll]);

  // Handle scroll events to see if user scrolled away from bottom
  function handleScroll() {
    const container = containerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const isNearBottom = scrollTop + clientHeight >= scrollHeight - 50;
    // If user is near the bottom, keep autoScroll = true; otherwise false
    setAutoScroll(isNearBottom);
  }

  // Function to handle starting project chat
  const handleProjectClick = (projectName, questions) => {
    setActiveChat({ type: "project", project: { projectName, questions } });
  };

  // Function to handle starting general chat
  const handleGeneralChatClick = () => {
    setActiveChat({ type: "general" });
  };

  // Truncate long text
  const truncateText = (text, maxLenght) => {
    if (text.length > maxLenght) {
      return text.substring(0, maxLenght) + "...";
    }
    return text;
  };

  // Loading state
  if (isManuPilotLoading || !manuPilotContent) {
    return (
      <div className="relative w-full h-[549px] center flex-col pt-2 px-4 pb-2">
        <Spinner />
      </div>
    );
  }

  // Error state
  if (isManuPilotError) {
    return (
      <div className="relative w-full h-[549px] center flex-col pt-2 px-4 pb-2">
        <Image
          src={images.deckfailcat}
          alt="please_wait"
          width={100}
          height={100}
          className="w-auto h-[100px]"
        />
        <h5 className="text-base  text-red-500 center flex-col text-center">
          <span>{t.chatUnavailable}</span>
          {t.tryAgain}
        </h5>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full temp-h-chat-widget-body center flex-col pt-2 px-4 pb-2">
      {/* Intro Screen */}
      {!activeChat && (
        <>
          <div className="relative w-[78px] h-[78px] center mt-2">
            <div className="w-[78px] h-[78px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-bg-primary z-[1] rounded-full " />
            <div className="w-[84px] h-[84px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-bg-primary z-[0] manupilot-background-gradient rounded-full" />
            <GoCopilot size={40} className="manupilot-rotate-animation z-10" />
          </div>
          <h1 className="text-xl font-semibold text-center my-2">
            {t.askManupilot}
          </h1>
          <p className="text-sm text-text-secondary text-center mb-4 max-w-[400px] md:max-w-full">
            {t.welcomeSentence}
          </p>
          {/* Loading State */}
          {isPortfolioLoading || !portfolioContent ? (
            <div className="w-full center mt-4">
              <Spinner />
            </div>
          ) : (
            <div className="w-full max-w-[600px] md:max-w-full mt-6 md:mt-0">
              {/* Project List */}
              <Command className="!h-fit border border-accent-border bg-bg-primary !rounded-t-md !rounded-b-none !pb-0 ">
                <CommandInput placeholder={t.searchAProject} />
                {!isPortfolioError ? (
                  <CommandList className="bg-bg-tertiary ">
                    <CommandEmpty>{t.noResults}</CommandEmpty>
                    <CommandGroup
                      heading="Portfolio"
                      className="!max-h-[160px] !overflow-y-auto thin-scrollbar !bg-bg-tertiary "
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
                                <div className="max-[320px]:hidden !w-[21px] !h-[21px] !min-w-[21px] !min-h-[21px] max-w-6 max-h-6 border border-accent-border rounded-full">
                                  <Image
                                    src={getAssetUrl(authorImage)}
                                    alt="Profile_Picture"
                                    width={21}
                                    height={21}
                                    priority
                                    quality={100}
                                    className="!w-[21px] !h-[21px] !min-w-[21px] !min-h-[21px] rounded-full object-cover object-center z-10"
                                  />
                                </div>
                                <p className="text-left text-sm tracking-tight">
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
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  </CommandList>
                ) : (
                  <div className="bg-bg-tertiary min-h-[120px] p-4">
                    <p className="text-sm text-red-600">{t.errorLoading}</p>
                  </div>
                )}
              </Command>

              {/* General purpose chat */}
              <div className="p-2 border-b border-x border-accent-border rounded-b-md ">
                <button
                  onClick={handleGeneralChatClick}
                  className="w-full flex gap-1 items-center justify-between rounded-md hover:bg-bg-hover dark:hover:bg-bg-hover2 p-1 "
                >
                  <div className="relative flex items-center gap-2 z-20 ">
                    <p className="text-sm ">{t.generalButton}</p>
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
        <div className="flex flex-col w-full h-full">
          {/* Note at the top */}
          <p className="text-center text-xs text-text-secondary pb-1">
            {t.advice}
          </p>

          {/* Scrollable Messages Container */}
          <div
            ref={containerRef}
            onScroll={handleScroll}
            className="flex-1 min-h-0 overflow-y-auto p-4 max-md:!px-0 thin-scrollbar"
          >
            {messages.map((msg, idx) => {
              const isUser = msg.role === "user";
              return (
                <div
                  key={idx}
                  className={`mb-2 ${isUser ? "text-right" : "text-left"}`}
                >
                  {isUser ? (
                    <UserBubble message={msg} />
                  ) : (
                    <AssistantBubble message={msg} />
                  )}
                </div>
              );
            })}

            {/* AI Thinking State */}
            {isThinking && (
              <div className="flex justify-start items-center gap-4 my-4">
                <GoCopilot size={20} className="text-accent-icon" />
                <div className="manupilot-shimmer !text-sm">{t.thinking}</div>
              </div>
            )}
          </div>

          {/* Input at the bottom */}
          <ChatInput
            manuPilotContent={manuPilotContent}
            activeChat={activeChat}
            setActiveChat={setActiveChat}
            isThinking={isThinking}
            setIsThinking={setIsThinking}
            error={error}
            setError={setError}
            droppedFile={droppedFile}
            setDroppedFile={setDroppedFile}
            switchToGeneralChat={switchToGeneralChat}
            t={t}
            language={language}
          />
        </div>
      )}

      {/* Use has reached the limit */}
      {reachedLimit && (
        <div className="w-full h-full center flex-col gap-4 absolute bg-[rgba(255,255,255,0.90)] dark:bg-[rgba(13,17,23,0.90)] z-[999] md:rounded-b-xl">
          <p>{t.reachedLimit}</p>
          {secondsLeft > 0 && (
            <p>
              {t.tryAgainIn} {Math.floor(secondsLeft / 60)}:
              {(secondsLeft % 60).toString().padStart(2, "0")}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

/* UserBubble Component */
function UserBubble({ message }) {
  const { content, file } = message;
  return (
    <div className="flex flex-col gap-3 items-end p-4">
      {file && (
        <div className="w-fit center cursor-default gap-2 border border-accent-border px-4 py-1 rounded-xl">
          <FaFileCode size={24} className="text-accent-icon" />
          <div className="flex flex-col">
            <p className="text-text-primary font-bold text-sm">{file.name}</p>
            <p className="text-text-secondary text-sm">File</p>
          </div>
        </div>
      )}

      {content && (
        <div className="rounded-xl bg-bg-button text-text-primary text-sm px-2 py-[6px] max-w-[95%] md:max-w-[239px] whitespace-pre-wrap break-words text-left">
          {content}
        </div>
      )}
    </div>
  );
}

/* AssistantBubble Component */
function AssistantBubble({ message }) {
  return (
    <div className="w-full text-text-primary whitespace-pre-wrap pr-6 break-words flex justify-between items-start gap-4">
      <GoCopilot size={20} className="text-accent-icon mt-[2px]" />
      <div className="w-full max-w-[95%] md:max-w-[372px]">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkBreaks]}
          components={customComponents}
        >
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
