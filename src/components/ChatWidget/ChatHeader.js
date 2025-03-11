"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getAssetUrl } from "@/utils/imageUtils";
import { useRouter } from "next/navigation";
import { IoClose, IoCodeSharp } from "react-icons/io5";
import { PiCornersOutBold } from "react-icons/pi";
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

export default function ChatHeader({
  isOpen,
  closeChat,
  activeChat,
  setActiveChat,
  setError,
  portfolioContent,
  isPortfolioError,
}) {
  const { messages, setMessages } = useChat();
  const [open, setOpen] = useState(false);
  const [openProjects, setOpenProjects] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [openProjectsDialog, setOpenProjectsDialog] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile("ontouchstart" in window || navigator.maxTouchPoints > 0);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

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

  const truncateText = (text, maxLenght) => {
    if (text.length > maxLenght) {
      return text.substring(0, maxLenght) + "...";
    }
    return text;
  };

  return (
    <>
      <div className="border-b border-accent-border flex justify-between items-center py-2 pr-2 pl-4">
        <h2 className="text-sm font-semibold">Quick chat</h2>
        <div className="h-full flex items-center gap-2">
          {activeChat && messages.length < 1 && (
            <>
              <Popover open={openNew} onOpenChange={setOpenNew}>
                <PopoverTrigger
                  onMouseEnter={handleMouseEnterNew}
                  onMouseLeave={handleMouseLeaveNew}
                  aria-expanded={openNew}
                >
                  <button
                    onClick={handleNewConversation}
                    className={`relative w-[32px] h-[32px]  center rounded-md hover:bg-bg-hover2`}
                  >
                    <AiOutlinePlus size={18} className="text-accent-icon" />
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  className={`absolute -right-3 w-max p-1 bg-bg-button border-accent-border z-[9991]`}
                >
                  <p className="text-xs">Start a new conversation</p>
                </PopoverContent>
              </Popover>
            </>
          )}

          {activeChat && (
            <>
              <Popover open={openProjects} onOpenChange={setOpenProjects}>
                <PopoverTrigger
                  onMouseEnter={handleMouseEnterProject}
                  onMouseLeave={handleMouseLeaveProject}
                  aria-expanded={openProjects}
                >
                  <button
                    onClick={() => {
                      setOpenProjectsDialog(true);
                    }}
                    className={`relative w-[32px] h-[32px]  center rounded-md hover:bg-bg-hover2`}
                  >
                    <IoCodeSharp size={18} className="text-accent-icon" />
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  className={`absolute -right-3 w-max p-1 bg-bg-button border-accent-border z-[9991]`}
                >
                  <p className="text-xs">View projects list</p>
                </PopoverContent>
              </Popover>
              <div className="bg-accent-border h-[25px] w-px mx-1"></div>
            </>
          )}

          {activeChat && messages.length > 0 && (
            <>
              <AlertDialog>
                <AlertDialogTrigger>
                  <Popover open={openNew} onOpenChange={setOpenNew}>
                    <PopoverTrigger
                      onMouseEnter={handleMouseEnterNew}
                      onMouseLeave={handleMouseLeaveNew}
                      aria-expanded={openNew}
                    >
                      <button
                        className={`relative w-[32px] h-[32px]  center rounded-md hover:bg-bg-hover2`}
                      >
                        <AiOutlinePlus size={18} className="text-accent-icon" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent
                      className={`absolute -right-3 w-max p-1 bg-bg-button border-accent-border z-[9991]`}
                    >
                      <p className="text-xs">Start a new conversation</p>
                    </PopoverContent>
                  </Popover>
                </AlertDialogTrigger>
                <AlertDialogContent className="!z-[999999]">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Your current conversation with ManuPilot will be lost and
                      cannot be recovered.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleNewConversation}>
                      I&apos;m sure
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <div className="bg-accent-border h-[25px] w-px mx-1"></div>
            </>
          )}

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              aria-expanded={open}
            >
              <button
                onClick={closeChat}
                className={`relative w-[32px] h-[32px]  center rounded-md hover:bg-bg-hover2`}
              >
                <IoClose size={18} className="text-accent-icon" />
              </button>
            </PopoverTrigger>
            <PopoverContent
              className={`absolute -right-3 w-max p-1 bg-bg-button border-accent-border z-[9991]`}
            >
              <p className="text-xs">Close chat</p>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Dialog to change project topic */}
      <Dialog open={openProjectsDialog} onOpenChange={setOpenProjectsDialog}>
        <DialogContent className="!bg-bg-secondary !z-[999999]">
          <DialogHeader>
            <DialogTitle>Attach a Project</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 my-2">
            {/* Project List */}
            <Command className="!h-fit border border-accent-border bg-bg-primary !rounded-t-md  !pb-0">
              <CommandInput placeholder="Search a project to attach" />
              {!isPortfolioError ? (
                <CommandList className="bg-bg-tertiary">
                  <CommandEmpty>No results found.</CommandEmpty>
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
            <div className="flex gap-2 justify-end mt-4">
              <button
                onClick={() => setOpenProjectsDialog(false)}
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
