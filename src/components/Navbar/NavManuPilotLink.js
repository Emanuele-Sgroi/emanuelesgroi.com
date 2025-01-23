"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { GoCopilot } from "react-icons/go";
import { usePathname } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const NavManuPilotLink = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
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

  const isManupilot = pathname === "/manupilot";

  return (
    <>
      {/* Writings */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative center outline-none"
          aria-expanded={open}
        >
          <Link
            href="/manupilot"
            className={`relative w-[32px] h-[32px] btn-secondary center ${
              isManupilot && "!bg-bg-hover"
            }`}
          >
            <GoCopilot size={18} className={`text-text-primary`} />
            {!isManupilot ? (
              <p className="w-[13px] h-[13px] absolute -top-1 -right-1 inline-block whitespace-nowrap text-[8px] font-bold text-white p-[1px] rounded-full shadow bg-gradient-to-r from-pink-500 to-purple-500 transform rotate-45">
                AI
              </p>
            ) : (
              <div className="w-[10px] h-[10px] absolute -top-1 -right-1 rounded-full bg-accent-active" />
            )}
          </Link>
        </PopoverTrigger>
        <PopoverContent
          className={`w-fit p-1 bg-bg-button border-accent-border ${
            isManupilot && "hidden"
          }`}
        >
          <p className="text-xs">Try ManuPilot AI</p>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default NavManuPilotLink;
