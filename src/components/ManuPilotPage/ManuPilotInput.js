"use client";

import React, { useState, useRef } from "react";
import { VscSend } from "react-icons/vsc";
import { GrAttachment } from "react-icons/gr";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ManuPilotInput = ({ addMessage, loading, setLoading }) => {
  const [openAttachDialog, setOpenAttachDialog] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const textAreaRef = useRef(null);

  // Auto-resize and auto-scroll on input
  const handleInput = (e) => {
    const target = e.target;
    // Reset the height so it can shrink on delete
    target.style.height = "auto";
    // Then set it to match the content
    target.style.height = `${target.scrollHeight}px`;
    // Always scroll to the bottom
    target.scrollTop = target.scrollHeight;
  };

  // Manage Enter/Shift+Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // Check if Shift is pressed
      if (e.shiftKey) {
        // SHIFT + ENTER => newline
        e.preventDefault();
        const { selectionStart, selectionEnd, value } = e.target;
        // Insert a newline at the cursor
        e.target.value =
          value.substring(0, selectionStart) +
          "\n" +
          value.substring(selectionEnd);
        // Move the cursor just after the inserted newline
        e.target.selectionStart = e.target.selectionEnd = selectionStart + 1;

        // Also trigger input logic to resize & scroll
        handleInput(e);
      } else {
        // ENTER => send
        e.preventDefault();
        const typedText = e.target.value.trim();

        if (typedText !== "") {
          handleSendMessage();
        }

        // Reset after sending so it goes back to default size
        e.target.style.height = "auto";
      }
    } else if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "@") {
      setOpenAttachDialog(true);
    }
  };

  const handleSendMessage = async () => {
    const content = textAreaRef.current.value.trim();

    if (!content) return;

    // Add user message to the conversation
    addMessage({ role: "user", content });
    textAreaRef.current.value = "";
    console.log("Setting loading = true");
    setLoading(true);

    try {
      // Send the message to the back end
      const response = await fetch("/api/manupilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content }] }),
      });

      const data = await response.json();

      if (response.ok) {
        // Add AI's response to the conversation
        addMessage(data);
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("API error:", error);
    } finally {
      console.log("Setting loading = false");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full flex justify-center px-4 pb-4">
        <div
          className={`relative w-full max-w-[850px] flex items-end gap-3 border border-accent-border rounded-2xl  ${
            isFocused ? "ring-2 ring-text-link" : ""
          }`}
          tabIndex={0}
        >
          <textarea
            ref={textAreaRef}
            placeholder="Ask ManuPilot"
            className="flex-1 h-auto min-h-[10px] max-h-[280px] resize-none overflow-auto
                     bg-transparent border-none placeholder:text-text-secondary
                     focus:outline-none focus:ring-0
                     md:text-sm text-text-primary font-medium leading-tight pt-5 pr-2 pl-4 pb-1 thin-scrollbar"
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />

          <div className="flex items-center gap-4 pr-4 pb-4">
            <TooltipProvider delayDuration={100} skipDelayDuration={500}>
              <Tooltip>
                <TooltipTrigger className="flex items-center">
                  <button
                    onClick={() => setOpenAttachDialog(true)}
                    className="p-1 rounded-sm hover:bg-bg-hover"
                  >
                    <GrAttachment size={20} className="text-accent-icon" />
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
                <TooltipTrigger className="flex items-center">
                  <button
                    onClick={handleSendMessage}
                    disabled={loading}
                    className="p-1 rounded-sm hover:bg-bg-hover disabled:hover:bg-transparent"
                  >
                    <VscSend size={20} className="text-accent-icon" />
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
      <Dialog open={openAttachDialog} onOpenChange={setOpenAttachDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog to attach files</DialogTitle>
            <DialogDescription>Edit this dialog</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ManuPilotInput;
