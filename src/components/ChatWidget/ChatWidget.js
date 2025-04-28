"use client";
import React, { useEffect, useState } from "react";
import { useChat } from "@/context/ChatProvider";
import { usePathname } from "next/navigation";
import { ChatHeader, ChatBody } from "@/components";
import { allowedExtensions } from "@/utils/allowedExtensions";
import AttachFileOverlay from "@/components/ManuPilotPage/AttachFileOverlay";
import { useManuPilotContent } from "@/hooks/useManuPilotContent";
import { usePortfolioContent } from "@/hooks/usePortfolioContent";
import { ToastContainer, toast } from "react-toastify";
import { useLanguage } from "@/context/LanguageContext";
import chatWidgetTranslations from "@/translations/chatWidget";

/**
 * ChatWidget Component
 *
 * This component handles:
 * - Displaying the chat UI
 * - Managing active chat states
 * - Handling file drag & drop functionality
 * - Switching between general and project-specific chat
 */

export default function ChatWidget({ portfolioContent, hasError }) {
  // translation
  const { language } = useLanguage();
  const t = chatWidgetTranslations[language];

  const { isOpen, closeChat } = useChat();
  // const { portfolioContent, isPortfolioLoading, isPortfolioError } =
  //   usePortfolioContent();
  const { isManuPilotError, isManuPilotLoading, manuPilotContent } =
    useManuPilotContent();
  const pathname = usePathname();
  const isManuPilot = pathname === "/manupilot";

  // State management
  const [activeChat, setActiveChat] = useState(null); // null | 'general' | { projectName: 'example', questions: [aiQuestions] }
  const [error, setError] = useState(null);
  const MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024; // 2 MB file size limit

  // Drag and drop states
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [droppedFile, setDroppedFile] = useState(null);
  const [dragCounter, setDragCounter] = useState(0);
  const [userSetGeneralChat, setUserSetGeneralChat] = useState(false);

  /**
   * Effect to determine if chat should be focused on a project based on URL
   */
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!portfolioContent?.projects || userSetGeneralChat) return;

    const pathParts = pathname.split("/");
    const projectNameFromURL = pathParts[2];

    if (!projectNameFromURL) return;

    const projectsRef = portfolioContent.projects.map(
      (project) => project.fields
    );

    if (!projectsRef) return;

    const foundProject = projectsRef.find(
      (project) =>
        project.projectSlug ===
        decodeURIComponent(projectNameFromURL).toLowerCase()
    );

    // Only update if the active chat is different
    if (
      foundProject &&
      (!activeChat ||
        activeChat.project?.projectName !== foundProject.projectTitle)
    ) {
      setActiveChat({
        type: "project",
        project: {
          projectName: foundProject.projectTitle,
          questions: foundProject.aiQuestions || [],
        },
      });
    }
  }, [pathname, portfolioContent, activeChat, userSetGeneralChat]);

  /**
   * 🔄 Keep the selected project in sync when the language changes.
   *    If either the title *or* the list of questions differs, refresh state.
   */
  useEffect(() => {
    if (activeChat?.type !== "project" || !portfolioContent?.projects?.length)
      return;

    const projectsRef = portfolioContent.projects.map((p) => p.fields);
    const found = projectsRef.find(
      (p) =>
        p.projectTitle === activeChat.project.projectName ||
        p.projectSlug?.toLowerCase() ===
          activeChat.project.projectSlug?.toLowerCase()
    );

    if (!found) return;

    const newQuestions = found.aiQuestions || [];
    const newTitle = found.projectTitle;

    const sameTitle = newTitle === activeChat.project.projectName;
    const sameQuestions =
      JSON.stringify(newQuestions) ===
      JSON.stringify(activeChat.project.questions);

    if (!sameTitle || !sameQuestions) {
      setActiveChat({
        type: "project",
        project: {
          projectName: newTitle,
          projectSlug: found.projectSlug, // keep a stable identifier
          questions: newQuestions,
        },
      });
    }
  }, [portfolioContent, language]);

  // Function to switch to General Chat manually
  const switchToGeneralChat = () => {
    setUserSetGeneralChat(true); // Mark that user manually switched
    setActiveChat({ type: "general" });
  };

  // ----- DRAG & DROP LOGIC -----
  useEffect(() => {
    if (typeof window === "undefined") return;

    function handleDragEnter(e) {
      if (e.dataTransfer.types?.includes("Files")) {
        e.preventDefault();
        e.stopPropagation();
        setDragCounter((prev) => prev + 1);
        setIsDraggingFile(true);
      }
    }

    function handleDragOver(e) {
      if (e.dataTransfer.types?.includes("Files")) {
        e.preventDefault();
        e.stopPropagation();
      }
    }

    function handleDragLeave(e) {
      if (e.dataTransfer.types?.includes("Files")) {
        e.preventDefault();
        e.stopPropagation();
        setDragCounter((prevCount) => {
          const newCount = prevCount - 1;
          if (newCount <= 0) {
            setIsDraggingFile(false);
            return 0;
          }
          return newCount;
        });
      }
    }

    function handleDrop(e) {
      e.preventDefault();
      e.stopPropagation();
      setDragCounter(0);
      setIsDraggingFile(false);

      if (!e.dataTransfer.files?.length) return;
      const file = e.dataTransfer.files[0];
      const ext = file.name.split(".").pop().toLowerCase();

      if (!allowedExtensions.includes(`.${ext}`)) {
        toast.error(t.fileNotSupported);
        return;
      }

      if (file.size > MAX_FILE_SIZE_BYTES) {
        toast.error(t.fileTooBig);
        return;
      }

      setDroppedFile(file);
    }

    window.addEventListener("dragenter", handleDragEnter);
    window.addEventListener("dragover", handleDragOver);
    window.addEventListener("dragleave", handleDragLeave);
    window.addEventListener("drop", handleDrop);

    return () => {
      window.removeEventListener("dragenter", handleDragEnter);
      window.removeEventListener("dragover", handleDragOver);
      window.removeEventListener("dragleave", handleDragLeave);
      window.removeEventListener("drop", handleDrop);
    };
  }, []);

  if (!isOpen || isManuPilot) return null;

  return (
    <>
      <div
        className={`
      fixed bottom-0 md:bottom-2 right-0 md:right-2 w-full max-w-full md:max-w-[480px] h-full max-h-full md:max-h-[600px]
      flex flex-col md:rounded-xl border border-accent-border shadow-2xl z-[9990]
      bg-bg-tertiary
      
      transform
      ${isOpen && "chat-starting-animation"}
    `}
      >
        {/* Chat Header */}
        <ChatHeader
          isOpen={isOpen}
          closeChat={closeChat}
          activeChat={activeChat}
          setActiveChat={setActiveChat}
          setError={setError}
          portfolioContent={portfolioContent}
          isPortfolioError={hasError}
          t={t}
        />

        {/* Chat Body */}
        <ChatBody
          activeChat={activeChat}
          setActiveChat={setActiveChat}
          portfolioContent={portfolioContent}
          //  isPortfolioLoading={isPortfolioLoading}
          isPortfolioLoading={!portfolioContent}
          isPortfolioError={hasError}
          manuPilotContent={manuPilotContent}
          isManuPilotError={isManuPilotError}
          isManuPilotLoading={isManuPilotLoading}
          error={error}
          setError={setError}
          droppedFile={droppedFile}
          setDroppedFile={setDroppedFile}
          switchToGeneralChat={switchToGeneralChat}
          t={t}
          language={language}
        />
      </div>
      {/* Drag & Drop Overlay */}
      <AttachFileOverlay isDraggingFile={isDraggingFile} t={t} />
    </>
  );
}
