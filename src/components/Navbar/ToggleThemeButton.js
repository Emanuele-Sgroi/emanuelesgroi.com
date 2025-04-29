"use client";

import React, { useState, useEffect } from "react";
import { FaSun } from "react-icons/fa";
import { BsMoonStarsFill } from "react-icons/bs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useIsMobile } from "@/hooks/useIsMobile";

/**
 * ToggleThemeButton Component
 *
 * Provides a button for switching between light and dark themes.
 * - Displays a sun icon for dark mode and a moon icon for light mode.
 * - Shows a tooltip on hover (desktop only) indicating the current theme.
 * - Uses a popover for tooltip display.
 *
 * Props:
 * - onClick: Function to toggle the theme.
 * - theme: String indicating the current theme ("light" or "dark").
 */

const ToggleThemeButton = ({ onClick, theme, t, isSiteDoc }) => {
  const [open, setOpen] = useState(false);
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

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            className="max-[400px]:hidden relative center outline-none w-[32px] h-[32px] btn-secondary center"
            aria-expanded={open}
          >
            {theme !== "light" ? (
              <FaSun size={18} />
            ) : (
              <BsMoonStarsFill size={18} />
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent
          className={`w-fit p-1 bg-bg-button border-accent-border ${
            isSiteDoc && "z-[9999]"
          }`}
        >
          <p className="text-xs">
            {theme !== "light" ? t.tooltips.light : t.tooltips.dark}
          </p>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default ToggleThemeButton;
