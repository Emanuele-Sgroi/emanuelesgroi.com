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

const ToggleThemeButton = ({ onClick, theme }) => {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  //const [isMobile, setIsMobile] = useState(false);

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
        <PopoverContent className="w-fit p-1 bg-bg-button border-accent-border">
          <p className="text-xs">
            {theme !== "light" ? "Light Mode" : "Dark Mode"}
          </p>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default ToggleThemeButton;
