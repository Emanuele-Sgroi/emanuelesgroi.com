"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Create Context
const ChatContext = createContext({});

// Create Hook to use this context
export const useChat = () => useContext(ChatContext);

//  Create Provider
export function ChatProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);

  // When component mounts, read from localStorage
  useEffect(() => {
    const storedData = localStorage.getItem("manuPilotChat");
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        // Expect something like { messages: [...], isOpen: boolean, etc. }
        if (parsed.messages) setMessages(parsed.messages);
      } catch (e) {
        console.error("Error parsing stored chat data:", e);
      }
    }
  }, []);

  // Whenever messages changes, save to localStorage
  useEffect(() => {
    const dataToStore = {
      messages,
    };
    localStorage.setItem("manuPilotChat", JSON.stringify(dataToStore));
  }, [messages]);

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
