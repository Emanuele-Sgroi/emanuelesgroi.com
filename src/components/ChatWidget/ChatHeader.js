"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import { PiCornersOutBold } from "react-icons/pi";
import { AiOutlinePlus } from "react-icons/ai";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function ChatHeader({ isOpen, closeChat }) {
  const [open, setOpen] = useState(false);
  const [immersiveOpen, setImmersiveOpen] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  // Open Popover for Immersive chat (link to /manupilot)
  const handleMouseEnterImmersive = () => {
    if (!isMobile) {
      setImmersiveOpen(true);
    }
  };

  // Close Popover for Immersive chat (link to /manupilot)
  const handleMouseLeaveImmersive = () => {
    if (!isMobile) {
      setImmersiveOpen(false);
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

  return (
    <div className="border-b border-accent-border flex justify-between items-center py-2 pr-2 pl-4">
      <h2 className="text-sm font-semibold">New Conversation</h2>
      <div className="h-full flex items-center gap-2">
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
        <div className="bg-accent-border h-[25px] w-px mx-1"></div>
        <Popover open={immersiveOpen} onOpenChange={setImmersiveOpen}>
          <PopoverTrigger
            onMouseEnter={handleMouseEnterImmersive}
            onMouseLeave={handleMouseLeaveImmersive}
            aria-expanded={immersiveOpen}
          >
            <Link
              href={`/manupilot`}
              className={`relative w-[32px] h-[32px]  center rounded-md hover:bg-bg-hover2`}
            >
              <PiCornersOutBold size={18} className="text-accent-icon" />
            </Link>
          </PopoverTrigger>
          <PopoverContent
            className={`absolute -right-3 w-max p-1 bg-bg-button border-accent-border z-[9991]`}
          >
            <p className="text-xs">Take conversation to immersive</p>
          </PopoverContent>
        </Popover>
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
  );
}
