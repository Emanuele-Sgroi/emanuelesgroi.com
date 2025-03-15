"use client";
import React, { useState, useEffect, useRef } from "react";
import { useChat } from "@/context/ChatProvider";
import { VscSend } from "react-icons/vsc";
import { AiOutlineRedo, AiOutlineClose } from "react-icons/ai";
import { FaFileCode } from "react-icons/fa";
import { GoCodeSquare } from "react-icons/go";
import { GrAttachment } from "react-icons/gr";
import { IoClose } from "react-icons/io5";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
} from "@/components/ui/dialog";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { allowedExtensions } from "@/utils/allowedExtensions";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function ChatInput({
  manuPilotContent,
  activeChat,
  setActiveChat,
  isThinking,
  setIsThinking,
  error,
  setError,
  droppedFile,
  setDroppedFile,
  switchToGeneralChat,
}) {
  const { messages, setMessages } = useChat();
  const [inputValue, setInputValue] = useState("");
  const [suggestionValue, setSuggestionValue] = useState("");
  const [lastUserMessage, setLastUserMessage] = useState(null);
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  //const [isMobile, setIsMobile] = useState(false);

  // Input states
  const textAreaRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFileLoading, setIsFileLoading] = useState(false);
  const [fileLoadingProgress, setFileLoadingProgress] = useState(0);
  const [showBadge, setShowBadge] = useState(false);
  const [openAttachDialog, setOpenAttachDialog] = useState(false);
  const [fileContent, setFileContent] = useState(null);
  const [pendingFile, setPendingFile] = useState(null);
  const [pendingError, setPendingError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState(""); // for file upload only

  const MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024; // 2 MB

  useEffect(() => {
    if (droppedFile) {
      // Drag & drop => we read the file right away (triggerType "direct")
      readFileWithProgress(droppedFile, "direct");
      setDroppedFile(null);
    }
  }, [droppedFile, setDroppedFile]);

  // function to read the file uploaded and handling visual spinner
  function readFileWithProgress(file, triggerType) {
    const ext = file.name.split(".").pop().toLowerCase();

    // Validate extension
    if (!allowedExtensions.includes(`.${ext}`)) {
      setErrorMessage("This file type is not supported.");
      return;
    }
    // Validate size
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setErrorMessage("File exceeds 2 MB limit.");
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
      setErrorMessage("Failed to read the file.");
      setSelectedFile(null);
    };

    reader.readAsText(file);
  }

  // Popover handling
  // useEffect(() => {
  //   const checkIfMobile = () => {
  //     setIsMobile(
  //       typeof window !== "undefined" &&
  //         ("ontouchstart" in window || navigator.maxTouchPoints > 0)
  //     );
  //   };

  //   checkIfMobile();
  //   window.addEventListener("resize", checkIfMobile);

  //   return () => window.removeEventListener("resize", checkIfMobile);
  // }, []);

  const handleMouseEnter = () => {
    if (!isMobile) {
      setOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setOpen(false);
    }
  };

  // function to build the AI instructions
  function buildSystemMessage(aiInstructions, activeChat) {
    if (activeChat?.type === "project") {
      return {
        role: "system",
        content: `
          ${aiInstructions.trim()}
          The user highlighted the project "${activeChat.project.projectName}". 
          Please focus on that project context in your responses. 
        `,
      };
    } else {
      return {
        role: "system",
        content: `
          ${aiInstructions.trim()}
          No specific project was highlighted, so this is a general conversation.
        `,
      };
    }
  }

  // handle sending suggested questions
  function handleSendSuggestion(suggestion) {
    setSuggestionValue(suggestion);
  }

  // Call handle send when the suggested value changes
  useEffect(() => {
    handleSend();
  }, [suggestionValue]);

  // functions to handle conversations with AI
  async function handleSend(userMsgOverride) {
    // Combine text + file check => allow sending if we have EITHER text OR file
    const typedText = userMsgOverride || inputValue.trim() || suggestionValue;
    const hasFile = selectedFile && fileContent;
    const canSend = typedText.length > 0 || hasFile;
    if (!canSend) return;

    setError(null);
    setIsThinking(true);

    // Always define `updatedMessages` so it’s not undefined
    let updatedMessages = [...messages];

    if (!userMsgOverride) {
      // Adding a new user message
      const newUserMsg = {
        role: "user",
        // content: text,
        content: typedText,
        file: selectedFile
          ? { name: selectedFile.name, content: fileContent }
          : null,
      };
      updatedMessages = [...messages, newUserMsg];
      setMessages(updatedMessages);
      // setLastUserMessage(text);
      setLastUserMessage(typedText);
    } else {
      // Regenerating; userMsg is already in the conversation
      setLastUserMessage(typedText);
    }

    setInputValue("");
    setSuggestionValue("");

    // Clear the file from state after attaching it once if you want to remove the file automatically after sending:
    handleRemoveFile();

    const systemMsg = buildSystemMessage(
      manuPilotContent.aiInstructions,
      activeChat
    );

    // Build final messages array
    const finalUserMessages = convertMessagesForApi(updatedMessages);
    const messagesForApi = [systemMsg, ...finalUserMessages];

    try {
      const response = await fetch("/api/manupilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: messagesForApi }),
      });

      if (!response.ok) {
        const errText = await response.text().catch(() => "");
        console.error("Error response text:", errText);
        setError("There was an error generating a response.");
        setIsThinking(false);
        return;
      }

      // Check if streaming
      const contentType = response.headers.get("content-type") || "";
      if (contentType.includes("text/plain")) {
        // Create an assistant message in state
        const newAssistantMsg = { role: "assistant", content: "" };
        setMessages((prev) => [...prev, newAssistantMsg]);

        if (!response.body) {
          throw new Error("ReadableStream not supported in this environment.");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        let done = false;
        let firstChunkReceived = false;

        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;

          if (value) {
            const chunkValue = decoder.decode(value);

            if (!firstChunkReceived) {
              setIsThinking(false);
              firstChunkReceived = true;
            }

            // Append chunk to the last assistant message
            setMessages((prev) => {
              const lastMsg = prev[prev.length - 1];
              if (lastMsg.role !== "assistant") {
                return [...prev, { role: "assistant", content: chunkValue }];
              }

              const updatedMsg = {
                ...lastMsg,
                content: lastMsg.content + chunkValue,
              };
              return [...prev.slice(0, -1), updatedMsg];
            });
          }
        }
      } else {
        // Non-streaming fallback
        const data = await response.json();
        if (data.error) {
          setError(data.error || "Error generating response.");
        } else {
          const newAssistantMsg = {
            role: "assistant",
            content: data.content || "",
          };
          setMessages((prev) => [...prev, newAssistantMsg]);
        }
      }
    } catch (err) {
      console.error("API error:", err);
      setError("There was an error generating a response.");
    } finally {
      setIsThinking(false);
    }
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
            handleSend();
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

  // retry message in case of error
  function handleRegenerate() {
    // Clear the error
    setError(null);
    // Re-send the last user message
    handleSend(lastUserMessage);
  }

  // Handling file change
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
      setPendingError("This file type is not supported.");
      return;
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setPendingFile(null);
      setPendingError("File exceeds 2 MB limit.");
      return;
    }

    // If OK => store it as pending
    setPendingFile(file);
    setPendingError("");
  };

  // handle uploading file
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

  // function to truncate text
  const truncateText = (text, maxLenght) => {
    if (!text || typeof text !== "string") {
      return text || "";
    }
    if (activeChat?.type === "project") {
      if (text.length > maxLenght) {
        return text.substring(0, maxLenght) + "...";
      }
    }

    return text;
  };

  // function to remove uploaded files
  function handleRemoveFile() {
    setSelectedFile(null);
    setFileContent(null);
    setShowBadge(false);
    setErrorMessage("");
    setIsFileLoading(false);
    setFileLoadingProgress(0);
  }

  // function to convert files uploaded for api
  function convertMessagesForApi(convo) {
    return convo.map((msg) => {
      if (msg.role === "user") {
        let combined = msg.content || "";
        if (msg.file && msg.file.content) {
          combined += `\n\nAttached file: ${msg.file.name}\n${msg.file.content}`;
        }
        return { role: "user", content: combined };
      }
      // For system/assistant, just pass them on
      return { role: msg.role, content: msg.content };
    });
  }

  return (
    <>
      <div className="w-full flex justify-center ">
        {error === null ? (
          <div className="w-full center flex-col gap-4">
            {/* suggestions */}
            {activeChat?.type === "project" &&
              activeChat.project.questions &&
              messages.length < 1 && (
                <div className="w-full flex jusstify-start items-start flex-col gap-2 ">
                  {activeChat.project.questions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendSuggestion(q)}
                      className="flex items-center gap-2 text-sm border border-accent-border rounded-md hover:bg-bg-hover2 px-2 py-[5px]"
                    >
                      <VscSend size={18} className="text-accent-icon" />
                      {q}
                    </button>
                  ))}
                </div>
              )}

            <div className="w-full center flex-col">
              {/* topic badge */}
              {activeChat?.type === "project" && (
                <div className="w-full flex items-center justify-between border-t border-l border-r border-accent-border rounded-t-2xl pb-4 px-2 pt-1 -mb-4">
                  <p className="text-xs flex items-center text-text-secondary gap-2">
                    <span>
                      <GoCodeSquare size={16} className="text-accent-icon" />
                    </span>
                    <span>
                      Emanuele-Sgroi/
                      {truncateText(activeChat.project.projectName, 40)}
                    </span>
                  </p>
                  {/* Close Topic */}
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <button
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        aria-expanded={open}
                        onClick={switchToGeneralChat}
                        className={`relative w-[32px] h-[32px]  center rounded-md hover:bg-bg-hover2`}
                      >
                        <IoClose size={18} className="text-accent-icon" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent
                      className={`absolute -right-3 w-max p-1 bg-bg-button border-accent-border z-[9991]`}
                    >
                      <p className="text-xs">Remove topic</p>
                    </PopoverContent>
                  </Popover>
                </div>
              )}

              <div
                className={` relative w-full flex items-end  gap-3 bg-bg-primary border border-accent-border rounded-2xl  ${
                  isFocused ? "ring-1 sm:ring-2 ring-text-link" : ""
                }`}
                tabIndex={0}
              >
                <div className="flex-1 flex flex-col ">
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
                          Uploading file
                        </p>
                        <p className="text-text-secondary text-sm">...</p>
                      </div>
                    </div>
                  )}

                  <textarea
                    ref={textAreaRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask ManuPilot"
                    className="w-full h-auto min-h-[10px] max-h-[200px] resize-none overflow-auto
                     bg-transparent border-none placeholder:text-text-secondary rounded-2xl
                     focus:outline-none focus:ring-0
                     text-sm text-text-primary font-medium leading-tight pt-3 sm:pt-5 pr-2 pl-4 sm:pb-1 thin-scrollbar"
                    onInput={handleInput}
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

                <div className="flex  items-center gap-4 max-sm:px-3 sm:pr-4 pb-3 sm:pb-4">
                  <TooltipProvider delayDuration={100} skipDelayDuration={500}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => setOpenAttachDialog(true)}
                          disabled={isFileLoading}
                          className="sm:p-1 flex items-center rounded-sm hover:bg-bg-hover disabled:opacity-50 disabled:hover:bg-transparent max-md:hover:bg-transparent"
                        >
                          <GrAttachment
                            size={20}
                            className="text-accent-icon"
                          />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="max-md:hidden">
                        <p className="text-xs">
                          Attach code or txt file{" "}
                          <span className="px-1 rounded-sm bg-bg-button">
                            ^⇧@
                          </span>
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider delayDuration={100} skipDelayDuration={500}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => {
                            if (!isFileLoading) {
                              handleSend(); // same function as pressing Enter
                              if (textAreaRef.current) {
                                textAreaRef.current.style.height = "auto";
                              }
                            }
                          }}
                          disabled={isThinking}
                          className="sm:p-1 flex items-center rounded-sm hover:bg-bg-hover disabled:hover:bg-transparent disabled:opacity-50 max-md:hover:bg-transparent"
                        >
                          <VscSend size={20} className="text-accent-icon" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="max-md:hidden">
                        <p className="text-xs">
                          Send now{" "}
                          <span className="px-1 rounded-sm bg-bg-button">
                            ⏎
                          </span>
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="center flex-col gap-2">
            <p className="text-sm text-red-600 text-center">
              There was an error generating a response
            </p>
            <button
              onClick={handleRegenerate}
              className="center gap-2 px-2 py-1 rounded-full bg-gray-800 dark:bg-text-primary text-white dark:text-gray-800 text-sm font-semibold"
            >
              <AiOutlineRedo
                size={18}
                className="text-white dark:text-gray-800"
              />
              Regenerate
            </button>
          </div>
        )}
      </div>
      <Dialog open={openAttachDialog} onOpenChange={setOpenAttachDialog}>
        <DialogContent className="z-[999999]">
          <DialogHeader>
            <DialogTitle>Attach a File</DialogTitle>
            <DialogDescription>
              Upload a text or code file to share with ManuPilot.
            </DialogDescription>
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
                Upload
              </button>
              <button
                onClick={() => setOpenAttachDialog(false)}
                className="px-4 py-2 text-sm font-medium text-text-primary rounded-md border border-accent-border"
              >
                Cancel
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
