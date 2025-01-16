"use client";

import React, { useState } from "react";
import { ManuPilotHeader, ManuPilotBody, ManuPilotInput } from "@/components";

const ManuPilotPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    setError(null);

    const userMessage = { role: "user", content: input };

    try {
      // Send the user's message to the API
      const response = await fetch("/api/manupilot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch the AI response");
      }

      const data = await response.json();

      // Add user and AI messages to the chat log
      setMessages((prevMessages) => [
        ...prevMessages,
        userMessage,
        { role: "assistant", content: data.content },
      ]);
      setInput("");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="manupilot-main-container">
      <ManuPilotHeader />
      <ManuPilotBody />
      <ManuPilotInput />
    </div>
  );
};

export default ManuPilotPage;

// {/* <div className="max-w-3xl mx-auto p-4">
// <h1 className="text-2xl font-bold mb-4">ManuPilot Chat</h1>

// {/* Chat Messages */}
// <div className="border rounded-lg p-4 mb-4 bg-white max-h-[400px] overflow-y-auto">
//   {messages.map((message, index) => (
//     <div
//       key={index}
//       className={`mb-3 ${
//         message.role === "user" ? "text-right" : "text-left"
//       }`}
//     >
//       <p
//         className={`p-2 rounded-md ${
//           message.role === "user"
//             ? "bg-blue-100 text-blue-800"
//             : "bg-gray-100 text-gray-800"
//         }`}
//       >
//         {message.content}
//       </p>
//     </div>
//   ))}
//   {!messages.length && (
//     <p className="text-gray-500">
//       No messages yet. Start the conversation!
//     </p>
//   )}
// </div>

// {/* Input Field */}
// <form onSubmit={handleSubmit} className="flex gap-2">
//   <input
//     type="text"
//     className="flex-1 p-2 border rounded-md"
//     value={input}
//     onChange={(e) => setInput(e.target.value)}
//     placeholder="Type your message..."
//     disabled={isLoading}
//   />
//   <button
//     type="submit"
//     className="p-2 bg-blue-500 text-white rounded-md"
//     disabled={isLoading}
//   >
//     {isLoading ? "Loading..." : "Send"}
//   </button>
// </form>

// {/* Error Message */}
// {error && <p className="text-red-500 mt-2">{error}</p>}
// </div> */}
