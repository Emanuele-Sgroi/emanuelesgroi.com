"use client";

import React, { useState } from "react";
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

/**
 * ManuPilotHeader Component
 *
 * Displays the header for ManuPilot, featuring:
 * - A reset conversation button with a confirmation dialog
 * - A dropdown to display the current AI model (GPT-4o)
 *
 * Props:
 * - onClickReset: Function to reset the chat conversation
 * - conversation: Array representing the current chat messages
 */

const ManuPilotHeader = ({ onClickReset, conversation, t, reachedLimit }) => {
  const [openAlertDialog, setOpenAlertDialog] = useState(false);

  return (
    <div className="w-full px-4 py-2 sm:py-4 bg-bg-primary center relative">
      <TooltipProvider delayDuration={100} skipDelayDuration={500}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => {
                setOpenAlertDialog(true);
              }}
              disabled={conversation.length < 1 || reachedLimit}
              className="absolute left-6 p-1 sm:p-2 bg-bg-button hover:bg-bg-hover border border-accent-border cursor-pointer rounded-md disabled:hover:bg-bg-button disabled:opacity-50"
            >
              <BiEdit size={18} className="text-accent-icon" />
            </button>
          </TooltipTrigger>
          <TooltipContent
            disabled={conversation.length < 1}
            className="max-md:!hidden"
          >
            <p className="text-xs">{t.reset}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <AlertDialog open={openAlertDialog} onOpenChange={setOpenAlertDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t.alertResetTitle}</AlertDialogTitle>
            <AlertDialogDescription>
              {t.alertResetDescription}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t.cancel}</AlertDialogCancel>
            <AlertDialogAction onClick={onClickReset}>
              {t.alertResetButton}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="flex items-center sm:gap-2">
        <p className="text-text-primary font-bold mr-2 max-sm:hidden">
          ManuPilot
        </p>{" "}
        <p className="max-sm:hidden">-</p>
        <Popover>
          <PopoverTrigger className="text-text-primary font-bold max-sm:text-sm center gap-1 p-2 rounded-md hover:bg-bg-hover">
            GPT 4o <IoCaretDown size={10} className="text-accent-icon" />
          </PopoverTrigger>
          <PopoverContent>
            <div>
              <div className="flex items-start gap-2 border-b border-accent-border pb-2 sm:pb-4">
                <div className="center gap-2">
                  <FaCheck size={14} className="text-accent-icon" />
                  <div className="bg-[#059669] p-[2px] rounded-sm">
                    <AiOutlineOpenAI size={18} />
                  </div>
                </div>
                <div className="center flex-col gap-1 mt-[-1px]">
                  <p className="text-text-primary max-sm:text-sm font-bold">
                    GPT 4o
                  </p>{" "}
                  <p className="text-text-secondary text-xs font-light max-sm:ml-2">
                    OpenAI API
                  </p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-text-primary  mt-2 sm:mt-4">
                {t.noModels}
              </p>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default ManuPilotHeader;
