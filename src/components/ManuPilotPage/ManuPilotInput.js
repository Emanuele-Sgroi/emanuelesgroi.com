import React from "react";
import { Input } from "@/components/ui/input";
import { VscSend } from "react-icons/vsc";
import { GrAttachment } from "react-icons/gr";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const ManuPilotInput = () => {
  return (
    <div className="w-full center px-4 pb-4">
      <div
        className="w-full min-h-[50px] max-w-[850px] center gap-4 border border-accent-border rounded-xl py-1 px-4 focus-within:ring-2 focus-within:ring-text-link"
        tabIndex="0"
      >
        <Input
          type="text"
          placeholder="Ask ManuPilot"
          className="min-h-[24px] !bg-transparent !border-none ring-offset-transparent file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-text-secondary placeholder:text-text-secondary focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0  md:text-sm dark:ring-offset-transparent dark:file:text-text-secondary dark:focus-visible:ring-transparent !p-0"
        />
        <div className="center gap-4">
          <TooltipProvider delayDuration={100} skipDelayDuration={500}>
            <Tooltip>
              <TooltipTrigger className="center">
                <button className="p-1 rounded-sm hover:bg-bg-hover">
                  <GrAttachment size={18} className="text-accent-icon" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">
                  Attach code or txt file{" "}
                  <span className="px-1 rounded-sm bg-bg-button">^⇧@</span>
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider delayDuration={100} skipDelayDuration={500}>
            <Tooltip>
              <TooltipTrigger className="center">
                <button className="p-1 rounded-sm hover:bg-bg-hover">
                  <VscSend size={18} className="text-accent-icon" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">
                  Send now{" "}
                  <span className="px-1 rounded-sm bg-bg-button">⏎</span>
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default ManuPilotInput;
