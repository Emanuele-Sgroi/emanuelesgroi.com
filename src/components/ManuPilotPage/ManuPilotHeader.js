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

const ManuPilotHeader = ({ onClickReset, conversation }) => {
  return (
    <div className="w-full p-4 bg-bg-primary center relative">
      <AlertDialog>
        <AlertDialogTrigger
          disabled={conversation.length < 1}
          className="absolute left-4"
        >
          <TooltipProvider delayDuration={100} skipDelayDuration={500}>
            <Tooltip>
              <TooltipTrigger
                disabled={conversation.length < 1}
                className=" p-2 bg-bg-button hover:bg-bg-hover border border-accent-border rounded-md disabled:hover:bg-bg-button disabled:opacity-50"
              >
                <BiEdit size={18} className="text-accent-icon" />
              </TooltipTrigger>
              <TooltipContent
                disabled={conversation.length < 1}
                className="max-md:!hidden"
              >
                <p className="text-xs">Reset conversation</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to Reset the chat?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Your current conversation with ManuPilot will be lost and cannot
              be recovered.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onClickReset}>Reset</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
