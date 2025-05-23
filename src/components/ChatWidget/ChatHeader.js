"use client";

import React, { useState } from "react";
import Image from "next/image";
import { getAssetUrl } from "@/utils/imageUtils";
import { IoClose, IoCodeSharp } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { FiArrowRight } from "react-icons/fi";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useChat } from "@/context/ChatProvider";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useQuota } from "@/context/QuotaProvider";

/**
 * ChatHeader Component
 *
 * This is the header section of ManuPilot's chat interface. It includes:
 * - A title for the chat window
 * - Buttons to start a new conversation or attach a project
 * - A close button to exit the chat
 * - A dialog for selecting a project to chat about
 * - An alert dialog for confirming when starting a new conversation
 */

export default function ChatHeader({
  isOpen,
  closeChat,
  activeChat,
  setActiveChat,
  setError,
  portfolioContent,
  isPortfolioError,
  t,
}) {
  // Quota
  const { remaining, secondsLeft } = useQuota();
  const reachedLimit =
    remaining <= 0 && secondsLeft !== null && secondsLeft > 0;

  const { messages, setMessages } = useChat();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const [openProjects, setOpenProjects] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const [openProjectsDialog, setOpenProjectsDialog] = useState(false);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);

  // Access the referenced projects
  const projectsRef = portfolioContent?.projects?.map(
    (project) => project.fields
  );

  // Open Popover for closing chat
  const handleMouseEnter = () => {
    if (!isMobile) {
      setOpen(true);
    }
  };

  // Close Popover for closing chat
  const handleMouseLeave = () => {
    if (!isMobile) {
      setOpen(false);
    }
  };

  // Open Popover for projects list
  const handleMouseEnterProject = () => {
    if (!isMobile) {
      setOpenProjects(true);
    }
  };

  // Close Popover for projects list
  const handleMouseLeaveProject = () => {
    if (!isMobile) {
      setOpenProjects(false);
    }
  };

  // Open Popover for starting a new conversation
  const handleMouseEnterNew = () => {
    if (!isMobile) {
      setOpenNew(true);
    }
  };

  // Close Popover for starting a new conversation
  const handleMouseLeaveNew = () => {
    if (!isMobile) {
      setOpenNew(false);
    }
  };

  // function to start new conversation
  function handleNewConversation() {
    setOpenAlertDialog(false);
    // Clear messages array
    setMessages([]);
    // Reset the chat to "no activeChat"
    // (so the user sees the intro screen again)
    setActiveChat(null);
    setError(null);
  }

  // function to attach projects
  function handleAttachProject(projectName, questions) {
    setActiveChat({ type: "project", project: { projectName, questions } });
    setOpenProjectsDialog(false);
  }

  const truncateText = (text = "", maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <>
      <div className="border-b border-accent-border flex justify-between items-center py-2 pr-2 pl-4">
        <h2 className="text-sm font-semibold">{t.quickChat}</h2>
        <div className="h-full flex items-center gap-2">
          {activeChat && messages.length < 1 && (
            <>
              <Popover open={openNew} onOpenChange={setOpenNew}>
                <PopoverTrigger asChild>
                  <button
                    onClick={handleNewConversation}
                    onMouseEnter={handleMouseEnterNew}
                    onMouseLeave={handleMouseLeaveNew}
                    aria-expanded={openNew}
                    disabled={reachedLimit}
                    className="relative w-[32px] h-[32px] center rounded-md hover:bg-bg-hover2 disabled:opacity-50 disabled:hover:bg-transparent"
                  >
                    <AiOutlinePlus size={18} className="text-accent-icon" />
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  className={`absolute -right-3 w-max p-1 bg-bg-button border-accent-border z-[9991]`}
                >
                  <p className="text-xs">{t.restart}</p>
                </PopoverContent>
              </Popover>
            </>
          )}

          {activeChat && (
            <>
              <Popover open={openProjects} onOpenChange={setOpenProjects}>
                <PopoverTrigger asChild>
                  <button
                    onMouseEnter={handleMouseEnterProject}
                    onMouseLeave={handleMouseLeaveProject}
                    aria-expanded={openProjects}
                    onClick={() => {
                      setOpenProjectsDialog(true);
                    }}
                    disabled={reachedLimit}
                    className={`relative w-[32px] h-[32px]  center rounded-md hover:bg-bg-hover2 disabled:opacity-50 disabled:hover:bg-transparent`}
                  >
                    <IoCodeSharp size={18} className="text-accent-icon" />
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  className={`absolute -right-3 w-max p-1 bg-bg-button border-accent-border z-[9991]`}
                >
                  <p className="text-xs">{t.viewProjects}</p>
                </PopoverContent>
              </Popover>
              <div className="bg-accent-border h-[25px] w-px mx-1"></div>
            </>
          )}

          {activeChat && messages.length > 0 && (
            <>
              <Popover open={openNew} onOpenChange={setOpenNew}>
                <PopoverTrigger asChild>
                  <button
                    onClick={() => setOpenAlertDialog(true)}
                    onMouseEnter={handleMouseEnterNew}
                    onMouseLeave={handleMouseLeaveNew}
                    aria-expanded={openNew}
                    disabled={reachedLimit}
                    className="relative w-[32px] h-[32px] center rounded-md hover:bg-bg-hover2 disabled:opacity-50 disabled:hover:bg-transparent"
                  >
                    <AiOutlinePlus size={18} className="text-accent-icon" />
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  className={`absolute -right-3 w-max p-1 bg-bg-button border-accent-border z-[9991]`}
                >
                  <p className="text-xs">{t.restart}</p>
                </PopoverContent>
              </Popover>
              <div className="bg-accent-border h-[25px] w-px mx-1"></div>
            </>
          )}

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <button
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                aria-expanded={open}
                onClick={closeChat}
                className={`relative w-[32px] h-[32px]  center rounded-md hover:bg-bg-hover2`}
              >
                <IoClose size={18} className="text-accent-icon" />
              </button>
            </PopoverTrigger>
            <PopoverContent
              className={`absolute -right-3 w-max p-1 bg-bg-button border-accent-border z-[9991]`}
            >
              <p className="text-xs">{t.close}</p>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Dialog to change project topic */}
      <Dialog open={openProjectsDialog} onOpenChange={setOpenProjectsDialog}>
        <DialogContent className="!bg-bg-secondary !z-[999999]">
          <DialogHeader>
            <DialogTitle>{t.attachProject}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 my-2">
            {/* Project List */}
            <Command className="!h-fit border border-accent-border bg-bg-primary !rounded-t-md  !pb-0">
              <CommandInput placeholder={t.searchAProjectToAttach} />
              {!isPortfolioError ? (
                <CommandList className="bg-bg-tertiary">
                  <CommandEmpty>{t.noResults}</CommandEmpty>
                  <CommandGroup
                    heading="Portfolio"
                    className="!max-h-[160px] !overflow-y-auto thin-scrollbar !bg-bg-tertiary !pb-1"
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
                              handleAttachProject(projectTitle, aiQuestions)
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
            <div className="flex gap-2 justify-end mt-4">
              <button
                onClick={() => setOpenProjectsDialog(false)}
                className="px-4 py-2 text-sm font-medium text-text-primary rounded-md border border-accent-border"
              >
                {t.cancel}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Alert dialog for starting new conversation */}

      <AlertDialog open={openAlertDialog} onOpenChange={setOpenAlertDialog}>
        <AlertDialogContent className="!z-[999999999999]">
          <AlertDialogHeader>
            <AlertDialogTitle>{t.alertDialogTitle}</AlertDialogTitle>
            <AlertDialogDescription>
              {t.alertDialogDescription}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t.cancel}</AlertDialogCancel>
            <AlertDialogAction onClick={handleNewConversation}>
              {t.alertDialogButton}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
