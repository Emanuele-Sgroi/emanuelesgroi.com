"use client";

import React, { useState, useRef, useEffect } from "react";
import { VscSend } from "react-icons/vsc";
import { GrAttachment } from "react-icons/gr";
import { AiOutlineRedo, AiOutlineClose } from "react-icons/ai";
import { FaFileCode } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { allowedExtensions } from "@/utils/allowedExtensions";
import { useIsMobile } from "@/hooks/useIsMobile";

const MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024; // 2 MB max file size

/**
 * ManuPilotInput Component
 *
 * Handles user input for ManuPilot, including:
 * - A text input area with auto-resize and auto-scroll
 * - File attachment support for text and code files
 * - A send button to submit messages
 * - Keyboard shortcuts for improved usability
 *
 * Props:
 * - loading: Boolean indicating if a message is being sent
 * - handleSendMessage: Function to send a message
 * - error: Object representing an error state
 * - clearError: Function to clear an error
 * - droppedFile: File object representing a dropped file
 * - setDroppedFile: Function to update the dropped file state
 */

const ManuPilotInput = ({
  loading,
  handleSendMessage,
  error,
  clearError,
  droppedFile,
  setDroppedFile,
  t,
}) => {
  const isMobile = useIsMobile();
  const [openAttachDialog, setOpenAttachDialog] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [lastMessage, setLastMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState(null);
  const [pendingFile, setPendingFile] = useState(null);
  const [pendingError, setPendingError] = useState("");

  // Spinner/Progress
  const [isFileLoading, setIsFileLoading] = useState(false);
  const [fileLoadingProgress, setFileLoadingProgress] = useState(0);
  const [showBadge, setShowBadge] = useState(false);
  const textAreaRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (droppedFile) {
      // Drag & drop => we read the file right away (triggerType "direct")
      readFileWithProgress(droppedFile, "direct");
      setDroppedFile(null);
    }
  }, [droppedFile, setDroppedFile]);

  function readFileWithProgress(file, triggerType) {
    const ext = file.name.split(".").pop().toLowerCase();

    // Validate extension
    if (!allowedExtensions.includes(`.${ext}`)) {
      setErrorMessage(t.fileNotSupported);
      return;
    }
    // Validate size
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setErrorMessage(t.fileTooBig);
      return;
    }

    // We want spinner to be visible if user intentionally "upload" or "dropped"
    const shouldShowSpinnerImmediately =
      triggerType === "direct" || triggerType === "manual";

    // If so, hide old data + show spinner
    if (shouldShowSpinnerImmediately) {
      setIsFileLoading(true);
      setFileLoadingProgress(0);
      setShowBadge(false);
    }

    const reader = new FileReader();

    // Time for a min 1-second spin
    const startTime = Date.now();

    // onprogress => update
    reader.onprogress = (e) => {
      if (e.lengthComputable) {
        const percent = Math.round((e.loaded / e.total) * 100);
        setFileLoadingProgress(percent);
      }
    };

    // onloadend => done reading
    reader.onloadend = () => {
      // compute how long it took
      const actualReadDuration = Date.now() - startTime;
      const minDuration = 1000; // 1 second
      const remaining = Math.max(0, minDuration - actualReadDuration);

      // We'll do a small setTimeout so spinner is visible at least 1s
      setTimeout(() => {
        setIsFileLoading(false);
        setFileLoadingProgress(100);
        setFileContent(reader.result);
        setSelectedFile(file); // store the file as "fully attached"
        setShowBadge(true);
        setErrorMessage("");
      }, remaining);
    };

    reader.onerror = () => {
      setIsFileLoading(false);
      setErrorMessage(t.readFail);
      setSelectedFile(null);
    };

    reader.readAsText(file);
  }

  // Auto-resize and auto-scroll on input
  const handleInput = (e) => {
    const target = e.target;
    target.style.height = "auto";
    target.style.height = `${target.scrollHeight}px`;
    target.scrollTop = target.scrollHeight;
  };

  const handleKeyDown = (e) => {
    if (isMobile) {
      // For MOBILE: "Enter" => always newline, user must tap the send button
      if (e.key === "Enter") {
        e.preventDefault();
        insertNewLine(e);
      }
    } else {
      // For DESKTOP: "Enter" => send, SHIFT+Enter => newline
      if (e.key === "Enter") {
        if (e.shiftKey) {
          e.preventDefault();
          insertNewLine(e);
        } else {
          // ENTER => send
          e.preventDefault();
          if (!isFileLoading) {
            sendUserMessage();
            e.target.style.height = "auto";
          }
        }
      } else if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "@") {
        setOpenAttachDialog(true);
      }
    }
  };

  // Helper function to insert newline
  function insertNewLine(e) {
    const { selectionStart, selectionEnd, value } = e.target;
    e.target.value =
      value.substring(0, selectionStart) + "\n" + value.substring(selectionEnd);
    e.target.selectionStart = e.target.selectionEnd = selectionStart + 1;
    handleInput(e); // re-auto-size
  }

  function sendUserMessage() {
    const typedText = textAreaRef.current.value.trim();
    if (!typedText && !selectedFile) return;

    const newMessage = {
      text: typedText || "",
      file: selectedFile
        ? { name: selectedFile.name, content: fileContent }
        : null,
    };

    setLastMessage(newMessage);
    handleSendMessage(newMessage);

    // reset
    textAreaRef.current.value = "";
    setSelectedFile(null);
    setFileContent(null);
    setShowBadge(false);
  }

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      setPendingFile(null);
      setPendingError("");
      return;
    }

    // Quick extension check, size check so we can show an immediate error
    const ext = file.name.split(".").pop().toLowerCase();
    if (!allowedExtensions.includes(`.${ext}`)) {
      setPendingFile(null);
      setPendingError(t.fileNotSupported);
      return;
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setPendingFile(null);
      setPendingError(t.fileTooBig);
      return;
    }

    // If OK => store it as pending
    setPendingFile(file);
    setPendingError("");
  };

  function handleUpload() {
    if (!pendingFile) return;

    // Now we read the file + show spinner/badge
    readFileWithProgress(pendingFile, "manual");

    // Clear pendingFile so we can re-open the dialog if needed
    setPendingFile(null);
    setPendingError("");
    // Close the dialog
    setOpenAttachDialog(false);
  }

  function handleRemoveFile() {
    setSelectedFile(null);
    setFileContent(null);
    setShowBadge(false);
    setErrorMessage("");
    setIsFileLoading(false);
    setFileLoadingProgress(0);
  }

  return (
    <>
      <div className=" w-full flex justify-center px-4 pb-2 sm:pb-4">
        {error === null ? (
          <div
            className={` relative w-full max-w-[850px] flex max-sm:justify-start items-start sm:items-end max-sm:flex-col gap-3 max-sm:bg-bg-mobile-primary border border-accent-border rounded-2xl  ${
              isFocused ? "ring-1 sm:ring-2 ring-text-link" : ""
            }`}
            tabIndex={0}
          >
            <div className="max-sm:w-full sm:flex-1 flex flex-col ">
              {/* File Badge */}
              {selectedFile && showBadge && (
                <div className="relative w-fit center cursor-default gap-2 bg-bg-button pl-3 pr-6 py-1 rounded-md text-sm text-text-primary mt-3 ml-2">
                  <FaFileCode size={22} className="text-accent-icon" />
                  <div className="flex flex-col">
                    <p className="text-text-primary font-bold text-sm">
                      {selectedFile.name}
                    </p>
                    <p className="text-text-secondary text-sm">File</p>
                  </div>
                  <button
                    onClick={handleRemoveFile}
                    className="absolute -right-[6px] -top-[6px] bg-text-primary rounded-full p-[2px]"
                  >
                    <AiOutlineClose size={15} className="text-red-600" />
                  </button>
                </div>
              )}

              {/* Show circular progress if isFileLoading */}
              {isFileLoading && (
                <div className="relative w-fit center cursor-default gap-2 bg-bg-button pl-3 pr-6 py-1 rounded-md text-sm text-text-primary mt-3 ml-2">
                  <div className="w-[30px] h-[30px]">
                    <CircularProgressbar
                      value={fileLoadingProgress}
                      styles={{
                        path: {
                          stroke: "var(--accent-extra)",

                          strokeLinecap: "butt",

                          transition: "stroke-dashoffset 0.5s ease 0s",
                          strokeWidth: "3px",
                        },
                        trail: {
                          stroke: "transparent",
                          strokeWidth: "1px",
                        },
                      }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-text-primary font-bold text-sm animate-pulse duration-700">
                      {t.uploadingFile}
                    </p>
                    <p className="text-text-secondary text-sm">...</p>
                  </div>
                </div>
              )}

              <textarea
                ref={textAreaRef}
                placeholder="Ask ManuPilot"
                className="w-full h-auto min-h-[10px] max-h-[280px] resize-none overflow-auto
                     bg-transparent border-none placeholder:text-text-secondary
                     focus:outline-none focus:ring-0
                     text-sm text-text-primary font-medium leading-tight pt-3 sm:pt-5 pr-2 pl-4 sm:pb-1 thin-scrollbar"
                onInput={handleInput}
                onKeyDown={handleKeyDown}
                onFocus={() => {
                  setIsFocused(true);
                  setTimeout(() => {
                    textAreaRef.current?.scrollIntoView({
                      block: "nearest",
                      behavior: "smooth",
                    });
                  }, 300);
                }}
                onBlur={() => setIsFocused(false)}
              />
            </div>

            <div className="max-sm:w-full flex max-sm:justify-between items-center gap-4 max-sm:px-3 sm:pr-4 pb-2 sm:pb-4">
              <TooltipProvider delayDuration={100} skipDelayDuration={500}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setOpenAttachDialog(true)}
                      disabled={isFileLoading}
                      className="sm:p-1 flex items-center rounded-sm hover:bg-bg-hover disabled:opacity-50 disabled:hover:bg-transparent max-md:hover:bg-transparent"
                    >
                      <GrAttachment size={20} className="text-accent-icon" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="max-md:hidden">
                    <p className="text-xs">
                      {t.attachAFile}{" "}
                      <span className="px-1 rounded-sm bg-bg-button">^⇧@</span>
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider delayDuration={100} skipDelayDuration={500}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={sendUserMessage}
                      disabled={loading || isFileLoading}
                      className="sm:p-1 flex items-center rounded-sm hover:bg-bg-hover disabled:hover:bg-transparent disabled:opacity-50 max-md:hover:bg-transparent"
                    >
                      <VscSend size={20} className="text-accent-icon" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="max-md:hidden">
                    <p className="text-xs">
                      {t.send}{" "}
                      <span className="px-1 rounded-sm bg-bg-button">⏎</span>
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        ) : (
          <div className="w-full px-4 py-1 center">
            {error && error.type === "chat" ? (
              <div className="center flex-col gap-2">
                <p className="text-sm text-text-primary text-center">
                  {error.message}
                </p>
                <button
                  onClick={() => {
                    clearError();
                    handleSendMessage(lastMessage);
                    setShowBadge(false);
                  }}
                  className="center gap-2 px-2 py-1 rounded-full bg-gray-800 dark:bg-text-primary text-white dark:text-gray-800 text-lg font-semibold"
                >
                  <AiOutlineRedo
                    size={21}
                    className="text-white dark:text-gray-800"
                  />
                  {t.regenerate}
                </button>
              </div>
            ) : (
              <div className="center flex-col gap-2">
                <p className="text-sm text-red-600 text-center">
                  {error.message}
                </p>
                <button
                  onClick={() => {
                    clearError();
                    handleSendMessage(lastMessage);
                    setShowBadge(false);
                  }}
                  className="center gap-2 px-2 py-1 rounded-full bg-gray-800 dark:bg-text-primary text-white dark:text-gray-800 text-lg font-semibold"
                >
                  <AiOutlineRedo
                    size={21}
                    className="text-white dark:text-gray-800"
                  />
                  {t.regenerate}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <Dialog open={openAttachDialog} onOpenChange={setOpenAttachDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.attachAFile}</DialogTitle>
            <DialogDescription>{t.uploadAndShare}</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 my-2">
            <div className="flex flex-col gap-2 items-start">
              <input
                id="fileUpload"
                type="file"
                accept={allowedExtensions.join(",")}
                onChange={handleFileChange}
                className="flex flex-col w-full text-sm text-text-secondary cursor-pointer focus:outline-none focus:ring-0"
              />
              {pendingError && (
                <p className="text-red-600 text-sm">{pendingError}</p>
              )}
            </div>
            <div className="flex gap-2 justify-end mt-4">
              <button
                onClick={handleUpload}
                disabled={!pendingFile}
                className="px-4 py-2 text-sm font-medium text-text-primary bg-bg-button rounded-md hover:bg-bg-hover disabled:hover:bg-bg-button disabled:opacity-50"
              >
                {t.upload}
              </button>
              <button
                onClick={() => setOpenAttachDialog(false)}
                className="px-4 py-2 text-sm font-medium text-text-primary rounded-md border border-accent-border"
              >
                {t.cancel}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ManuPilotInput;
