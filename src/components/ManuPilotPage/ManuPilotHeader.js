"use client";

import React, { useState, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IoCaretDown } from "react-icons/io5";
import { AiOutlineOpenAI } from "react-icons/ai";
import { FaCheck } from "react-icons/fa6";
import { BiEdit } from "react-icons/bi";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ManuPilotHeader = () => {
  return (
    <div className="w-full p-4 bg-bg-primary center relative">
      <TooltipProvider delayDuration={100} skipDelayDuration={500}>
        <Tooltip>
          <TooltipTrigger className="absolute left-4">
            <button className=" p-2 bg-bg-button hover:bg-bg-hover border border-accent-border rounded-md">
              <BiEdit size={18} className="text-accent-icon" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">Reset conversation</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className="flex items-center sm:gap-2">
        <p className="text-text-primary font-bold mr-2 max-sm:hidden">
          ManuPilot
        </p>{" "}
        <p className="max-sm:hidden">-</p>
        <Popover>
          <PopoverTrigger className="text-text-primary font-bold center gap-1 p-2 rounded-md hover:bg-bg-hover">
            GPT 4o <IoCaretDown size={10} className="text-accent-icon" />
          </PopoverTrigger>
          <PopoverContent>
            <div>
              <div className="flex items-start gap-2 border-b border-accent-border pb-4">
                <div className="center gap-2">
                  <FaCheck size={14} className="text-accent-icon" />
                  <div className="bg-[#059669] p-[2px] rounded-sm">
                    <AiOutlineOpenAI size={18} />
                  </div>
                </div>
                <div className="center flex-col gap-1 mt-[-1px]">
                  <p className="text-text-primary font-bold">GPT 4o</p>{" "}
                  <p className="text-text-secondary text-xs font-light">
                    OpenAI API
                  </p>
                </div>
              </div>
              <p className="text-sm text-text-primary  mt-4">
                There are currently no other models to choose from.
              </p>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default ManuPilotHeader;
