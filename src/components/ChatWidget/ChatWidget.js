"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useChat } from "@/context/ChatProvider";
import { usePathname } from "next/navigation";
import { ChatHeader, ChatBody } from "@/components";
import { usePortfolioContent } from "@/hooks/usePortfolioContent";

export default function ChatWidget() {
  const { isOpen, closeChat, messages, setMessages } = useChat();
  const { portfolioContent, isPortfolioLoading, isPortfolioError } =
    usePortfolioContent();
  const pathname = usePathname();
  const isManuPilot = pathname === "/manupilot";

  if (!isOpen || isManuPilot) return null;

  return (
    <div
      className={`
      fixed bottom-2 right-2 w-[480px] h-[600px]
      flex flex-col rounded-xl border border-accent-border shadow-2xl z-[9990]
      bg-bg-tertiary
      transition-all duration-1000 ease-in-out
      transform
      ${isOpen && "chat-starting-animation"}
    `}
    >
      {/* Chat Header */}
      <ChatHeader isOpen={isOpen} closeChat={closeChat} />

      {/* Chat Body */}
      <ChatBody
        portfolioContent={portfolioContent}
        isPortfolioLoading={isPortfolioLoading}
        isPortfolioError={isPortfolioError}
      />
    </div>
  );
}
