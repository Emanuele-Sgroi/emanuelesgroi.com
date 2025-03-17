"use client";

import React, { createContext, useContext, useState } from "react";

/**
 * Chat Context Provider
 *
 * This file contains the context and provider for managing chat state across the application.
 * The `ChatContext` allows different components to share and manipulate the chat-related state, including:
 * - **isOpen**: A boolean representing whether the chat is open or closed.
 * - **messages**: An array storing the messages in the chat.
 *
 * The `useChat` hook provides access to the context values, allowing components to access and update the chat state.
 *
 * The `ChatProvider` component wraps the application and provides the chat state and functions to control it.
 *
 * Functions:
 * - **openChat**: A function that opens the chat by setting `isOpen` to `true`.
 * - **closeChat**: A function that closes the chat by setting `isOpen` to `false`.
 * - **setMessages**: A function to update the messages in the chat.
 *
 * Usage:
 * - To use the chat state or functions in any component, simply call `useChat()` to access the context.
 * - The `ChatProvider` should wrap the top-level component to make the context available to the entire app.
 */

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
