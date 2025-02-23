"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { GoCopilot } from "react-icons/go";
import { usePathname } from "next/navigation";
import { useChat } from "@/context/ChatProvider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PiCornersOutBold } from "react-icons/pi";

const NavManuPilotLink = () => {
  const pathname = usePathname();
  const { openChat } = useChat();
  const [open, setOpen] = useState(false);
  const [immersiveOpen, setImmersiveOpen] = useState(false);
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

  const handleMouseEnterImmersive = () => {
    if (!isMobile) {
      setImmersiveOpen(true);
    }
  };

  const handleMouseLeaveImmersive = () => {
    if (!isMobile) {
      setImmersiveOpen(false);
    }
  };

  const isManupilot = pathname === "/manupilot";

  return (
    <div className={`${isManupilot && "!hidden"} flex`}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`${
            isManupilot && "!hidden"
          } popover-1-trigger relative center outline-none`}
          aria-expanded={open}
        >
          <button
            onClick={openChat}
            className={`relative w-[32px] h-[32px] btn-secondary center !rounded-br-none !rounded-tr-none ${
              isManupilot && "!hidden"
            }`}
          >
            <GoCopilot size={18} className={`text-text-primary`} />

            {/* <p className="w-[13px] h-[13px] absolute -top-1 -left-1 inline-block whitespace-nowrap text-[8px] font-bold text-white p-[1px] rounded-full shadow bg-gradient-to-r from-pink-500 to-purple-500 transform -rotate-12">
              AI
            </p> */}
          </button>
        </PopoverTrigger>
        <PopoverContent
          className={`w-fit p-1 bg-bg-button border-accent-border ${
            isManupilot && "!hidden"
          }`}
        >
          <p className="text-xs">Chat with ManuPilot</p>
        </PopoverContent>
      </Popover>

      <Popover open={immersiveOpen} onOpenChange={setImmersiveOpen}>
        <PopoverTrigger
          onMouseEnter={handleMouseEnterImmersive}
          onMouseLeave={handleMouseLeaveImmersive}
          className={`${
            isManupilot && "!hidden"
          } popover-1-trigger relative center outline-none`}
          aria-expanded={immersiveOpen}
        >
          <Link
            href="/manupilot"
            className={`relative w-[32px] h-[32px] btn-secondary center !rounded-bl-none !rounded-tl-none !border-l-0 ${
              isManupilot && "!hidden"
            }`}
          >
            <PiCornersOutBold size={18} className={`text-text-primary`} />
          </Link>
        </PopoverTrigger>
        <PopoverContent
          className={`w-fit p-1 bg-bg-button border-accent-border ${
            isManupilot && "!hidden"
          }`}
        >
          <p className="text-xs">Immersive conversation with ManuPilot</p>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default NavManuPilotLink;
