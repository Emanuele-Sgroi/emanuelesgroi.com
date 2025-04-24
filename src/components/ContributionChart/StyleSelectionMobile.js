"use client";

import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IoMdPlay } from "react-icons/io";

/**
 * StyleSelectionMobile Component
 *
 * This component provides a mobile-friendly UI for selecting graph styles for the contribution chart.
 * It allows users to switch between different chart styles using a popover menu.
 *
 * Props:
 * - allStyles: Array of available style options.
 * - chartStyle: Currently selected style ID.
 * - setChartStyle: Function to update the selected style.
 * - selectedStyle: Object representing the currently selected style.
 */

const StyleSelectionMobile = ({
  t,
  allStyles,
  chartStyle,
  setChartStyle,
  selectedStyle,
}) => {
  const [open, setOpen] = useState(false);
  const [openStylesMenu, setOpenStylesMenu] = useState(false);

  return (
    <div className="md:hidden w-full mt-4">
      <Popover open={openStylesMenu} onOpenChange={setOpenStylesMenu}>
        <PopoverTrigger
          className="relative center outline-none"
          aria-haspopup="menu"
          aria-expanded={open}
        >
          <div className="center gap-2 bg-bg-button px-2 py-1 rounded-md">
            <p className="text-sm">{t.chart.styleTitle}</p>
            <IoMdPlay size={14} className="text-text-primary" />
            {/* Display the active style */}
            {selectedStyle.id !== "emoji" ? (
              // Display color swatches for color styles
              <div className="flex">
                {selectedStyle.colors.map((color, colorIndex) => (
                  <div
                    key={colorIndex}
                    className="w-[14px] h-[10px]"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            ) : (
              // Display emojis for the emoji style
              <div className="flex ">
                {selectedStyle.symbols.slice(0, 4).map((emoji, emojiIndex) => (
                  <div
                    key={emojiIndex}
                    className="w-[10px] h-[10px] text-[11px] leading-none mx-[2px]"
                  >
                    {emoji}
                  </div>
                ))}
              </div>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-fit p-4 bg-bg-button border-accent-border ml-4">
          {allStyles.map((styleObj, index) => (
            <div
              key={index}
              className={`w-[90px] center cursor-pointer py-3 px-2 rounded-md ${
                chartStyle === styleObj.id
                  ? "bg-bg-hover" // Active state
                  : ""
              }`}
              onClick={() => {
                setChartStyle(styleObj.id);
                setOpenStylesMenu(false);
              }} // Set active style on click and close the menu
            >
              {styleObj.id !== "emoji"
                ? // Display color swatches for color styles
                  styleObj.colors.map((color, colorIndex) => (
                    <div
                      key={colorIndex}
                      className="w-[14px] h-[10px]"
                      style={{ backgroundColor: color }}
                    />
                  ))
                : styleObj.symbols.slice(0, 4).map((emoji, emojiIndex) => (
                    <div
                      key={emojiIndex}
                      className="w-[10px] h-[10px] text-[11px] leading-none mx-[2px]"
                    >
                      {emoji}
                    </div>
                  ))}
            </div>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default StyleSelectionMobile;
