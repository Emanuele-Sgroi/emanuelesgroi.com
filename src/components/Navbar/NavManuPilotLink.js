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
import { useIsMobile } from "@/hooks/useIsMobile";

/**
 * NavManuPilotLink Component
 *
 * Provides navigation links for ManuPilot AI assistant.
 * - Includes a quick chat button for accessing ManuPilot in a popover.
 * - Includes a link to an immersive ManuPilot conversation page.
 * - Supports tooltips on hover for better user experience.
 * - Adjusts behavior for mobile and desktop views.
 *
 * Features:
 * - Uses popovers to provide quick descriptions.
 * - Handles mouse interactions to show tooltips only on non-mobile devices.
 * - Hides the component when already on the ManuPilot page.
 */

const NavManuPilotLink = ({ t, isSiteDoc }) => {
  const pathname = usePathname();
  const { openChat } = useChat();
  const [open, setOpen] = useState(false);
  const [immersiveOpen, setImmersiveOpen] = useState(false);
  const isMobile = useIsMobile();

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
        <PopoverTrigger asChild>
          <button
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            aria-expanded={open}
            onClick={openChat}
            className={`max-md:hidden popover-1-trigger outline-none relative w-[32px] h-[32px] btn-secondary center !rounded-br-none !rounded-tr-none ${
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
          }  ${isSiteDoc && "!z-[9999]"}`}
        >
          <p className={`text-xs`}>{t.tooltips.quickChat}</p>
        </PopoverContent>
      </Popover>

      <Popover open={immersiveOpen} onOpenChange={setImmersiveOpen}>
        <PopoverTrigger asChild>
          <Link
            href="/manupilot"
            onMouseEnter={handleMouseEnterImmersive}
            onMouseLeave={handleMouseLeaveImmersive}
            aria-expanded={immersiveOpen}
            className={`relative popover-1-trigger outline-none w-[32px] h-[32px] btn-secondary center md:!rounded-bl-none md:!rounded-tl-none md:!border-l-0 ${
              isManupilot && "!hidden"
            }`}
          >
            <PiCornersOutBold
              size={18}
              className={`max-md:hidden text-text-primary`}
            />
            <GoCopilot size={18} className={`md:hidden text-text-primary`} />
          </Link>
        </PopoverTrigger>
        <PopoverContent
          className={`w-fit p-1 bg-bg-button border-accent-border ${
            isManupilot && "!hidden"
          } ${isSiteDoc && "!z-[9999]"}`}
        >
          <p className="text-xs">{t.tooltips.immersive}</p>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default NavManuPilotLink;
