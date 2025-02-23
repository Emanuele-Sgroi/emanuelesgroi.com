"use client";

import React, { createContext, useState, useContext } from "react";

// Create Context
const ChatContext = createContext({});

// Create Hook to use this context
export const useChat = () => useContext(ChatContext);

//  Create Provider
export function ChatProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);

  // functions to toggle open/close
  const openChat = () => setIsOpen(true);
  const closeChat = () => setIsOpen(false);

  return (
    <ChatContext.Provider
      value={{
        isOpen,
        openChat,
        closeChat,
        messages,
        setMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
