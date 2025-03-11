"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  ManuPilotHeader,
  ManuPilotBody,
  ManuPilotInput,
  AttachFileOverlay,
  Loading,
  ErrorMessage,
} from "@/components";
import { useManuPilotContent } from "@/hooks/useManuPilotContent";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ToastContainer, toast } from "react-toastify";

const MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024; // 2 MB

const allowedExtensions = [
  ".txt",
  ".csv",
  ".json",
  ".js",
  ".jsx",
  ".ts",
  ".tsx",
  ".html",
  ".css",
  ".scss",
  ".sass",
  ".php",
  ".py",
  ".java",
  ".c",
  ".cpp",
  ".h",
  ".hpp",
  ".cs",
  ".rb",
  ".swift",
  ".kt",
  ".go",
  ".rs",
  ".sh",
  ".bash",
  ".yaml",
  ".yml",
  ".xml",
  ".ini",
  ".md",
  ".sql",
  ".env",
  ".gitignore",
  ".npmrc",
  ".editorconfig",
  ".babelrc",
  ".prettierrc",
  ".eslintrc",
  ".prisma",
  ".db",
  ".dbml",
  ".psql",
  ".pgsql",
  ".mongo",
  ".nosql",
  ".sqlite",
  ".mjs",
  ".vue",
  ".svelte",
  ".angular",
  ".elm",
  ".ejs",
  ".hbs",
  ".njk",
  ".lit",
  ".mjml",
  ".sol",
  ".vyper",
  ".wasm",
  ".ipynb",
  ".r",
  ".dvc",
  ".pkl",
  ".dart",
  ".erl",
  ".ex",
  ".exs",
  ".scala",
  ".clj",
  ".lisp",
  ".ml",
  ".hs",
  ".scheme",
  ".nim",
  ".toml",
  ".makefile",
  ".cmake",
  ".gradle",
  ".dockerfile",
  ".compose",
  ".zshrc",
  ".bashrc",
  ".bash_profile",
  ".profile",
  ".fish",
  ".rst",
  ".asciidoc",
  ".tex",
  ".latex",
  ".bib",
  ".adoc",
];

const ManuPilotPage = () => {
  const { isManuPilotError, isManuPilotLoading, manuPilotContent } =
    useManuPilotContent();
  //const [showNavigationWarning, setShowNavigationWarning] = useState(false);
  //const [pendingUrl, setPendingUrl] = useState(null);
  const router = useRouter();
  const originalPushRef = useRef(router.push);

  const [conversation, setConversation] = useState([]); // Store messages
  const [isThinking, setIsThinking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [droppedFile, setDroppedFile] = useState(null);
  const [dragCounter, setDragCounter] = useState(0);
  const [abortController, setAbortController] = useState(null);

  // handle tab close or route changes
  const { showNavigationWarning, setShowNavigationWarning, pendingUrl } =
    useNavigationProtection(conversation, router, originalPushRef);

  // ----- DRAG & DROP LOGIC -----

  useEffect(() => {
    function handleDragEnter(e) {
      if (e.dataTransfer.types?.includes("Files")) {
        e.preventDefault();
        e.stopPropagation();
        setDragCounter((prev) => prev + 1);
        setIsDraggingFile(true);
      }
    }

    function handleDragOver(e) {
      if (e.dataTransfer.types?.includes("Files")) {
        e.preventDefault();
        e.stopPropagation();
      }
    }

    function handleDragLeave(e) {
      if (e.dataTransfer.types?.includes("Files")) {
        e.preventDefault();
        e.stopPropagation();
        setDragCounter((prevCount) => {
          const newCount = prevCount - 1;
          if (newCount <= 0) {
            setIsDraggingFile(false);
            return 0;
          }
          return newCount;
        });
      }
    }

    function handleDrop(e) {
      e.preventDefault();
      e.stopPropagation();
      setDragCounter(0);
      setIsDraggingFile(false);

      if (!e.dataTransfer.files?.length) return;
      const file = e.dataTransfer.files[0];
      const ext = file.name.split(".").pop().toLowerCase();

      if (!allowedExtensions.includes(`.${ext}`)) {
        toast.error("This file type is not supported.");
        return;
      }

      if (file.size > MAX_FILE_SIZE_BYTES) {
        toast.error("File exceeds 2 MB limit.");
        return;
      }

      setDroppedFile(file);
    }

    window.addEventListener("dragenter", handleDragEnter);
    window.addEventListener("dragover", handleDragOver);
    window.addEventListener("dragleave", handleDragLeave);
    window.addEventListener("drop", handleDrop);

    return () => {
      window.removeEventListener("dragenter", handleDragEnter);
      window.removeEventListener("dragover", handleDragOver);
      window.removeEventListener("dragleave", handleDragLeave);
      window.removeEventListener("drop", handleDrop);
    };
  }, []);

  if (isManuPilotLoading || !manuPilotContent) {
    return <Loading />;
  }

  if (isManuPilotError) {
    return <ErrorMessage />;
  }

  // handleSendMessage takes an object
  const handleSendMessage = async (newMessage) => {
    if (!newMessage) return;
    const { text, file } = newMessage;

    if (!text && !file) return;

    // Clear previous AbortController and create a new one
    if (abortController) abortController.abort();
    const newAbortController = new AbortController();
    setAbortController(newAbortController);

    // Add the user's new message to conversation state
    setConversation((prev) => [...prev, { role: "user", text, file }]);

    setIsThinking(true);
    setLoading(true);
    setError(null);

    try {
      // Prepare the "messages" array for the server
      const conversationWithNew = [
        ...conversation,
        { role: "user", text, file },
      ];
      const messagesForApi = [
        { role: "system", content: manuPilotContent.aiInstructions }, // System instructions
        ...convertConversationToApiMessages(conversationWithNew),
      ];

      // Make the request
      const response = await fetch("/api/manupilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: messagesForApi }),
        signal: newAbortController.signal,
      });

      if (!response.ok) {
        // If server responded with 4xx or 5xx
        const errText = await response.text().catch(() => "");
        console.error("Error response text:", errText);
        setError({
          type: "chat",
          message: "There was an error generating a response.",
        });
        return;
      }

      // Check Content-Type to see if it's streaming or JSON
      const contentType = response.headers.get("content-type") || "";

      if (contentType.includes("text/plain")) {
        // -------------------------
        // STREAMING RESPONSE LOGIC
        // -------------------------
        // The server is returning raw text in chunks (because we used stream: true)
        if (!response.body) {
          throw new Error("ReadableStream not supported in this environment.");
        }

        // Stop showing "thinking message"
        setIsThinking(false);

        // Create an 'assistant' message with empty content
        setConversation((prev) => [
          ...prev,
          { role: "assistant", content: "" },
        ]);

        // Get a reader to read the stream chunk by chunk
        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        let done = false;

        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;
          if (value) {
            // Decode the current chunk into a string
            const chunkValue = decoder.decode(value, { stream: true });

            // Append this chunk to the last message in conversation
            setConversation((prev) => {
              // The last message should be the assistant's
              const lastMsg = prev[prev.length - 1];
              // If for some reason it's not assistant, create one:
              if (lastMsg.role !== "assistant") {
                return [...prev, { role: "assistant", content: chunkValue }];
              }
              // Otherwise, append
              const updatedMsg = {
                ...lastMsg,
                content: lastMsg.content + chunkValue,
              };
              return [...prev.slice(0, -1), updatedMsg];
            });
          }
        }
      } else {
        // ----------------------
        // JSON RESPONSE LOGIC
        // ----------------------
        // This happens if we triggered summarization or an error
        const data = await response.json();

        // Stop showing "thinking message"
        setIsThinking(false);

        if (data.error) {
          // The server might send { error: "...", ... }
          console.error("API error:", data.error);
          setError({
            type: "chat",
            message: data.error || "There was an error generating a response.",
          });
          return;
        }
        // Otherwise, we assume data is the summarized assistant message
        // e.g. { role: "assistant", content: "some summary" }
        setConversation((prev) => [
          ...prev,
          { role: "assistant", content: data.content || "" },
        ]);
      }

      // const data = await response.json();
      // if (response.ok) {
      //   setConversation((prev) => [
      //     ...prev,
      //     { role: "assistant", content: data.content },
      //   ]);
      // } else {
      //   console.error("Error:", data.error);
      //   setError({
      //     type: "chat",
      //     message: "There was an error generating a response.",
      //   });
      // }
    } catch (error) {
      setIsThinking(false);
      console.error("API error:", error);
      setError({
        type: "system",
        message:
          "ManuPilot is experiencing an issue. Please try regenerating your response. If the problem persists, try again later.",
      });
    } finally {
      setIsThinking(false);
      setLoading(false);
    }
  };

  function convertConversationToApiMessages(convo) {
    return convo.map((msg) => {
      if (msg.role === "user") {
        let combined = msg.text || "";
        if (msg.file) {
          combined += `\n\nAttached file: ${msg.file.name}\n${msg.file.content}`;
        }
        return { role: "user", content: combined.trim() };
      }
      return { role: msg.role, content: msg.content };
    });
  }

  const handleResetConversation = () => {
    if (abortController) {
      abortController.abort(); // Cancel ongoing request
    }
    setIsThinking(false);
    setConversation([]);
    localStorage.removeItem("manuPilotChat");
    setError(null);
    clearError();
  };

  const clearError = () => setError(null);

  return (
    <div className="!relative manupilot-main-container">
      <ManuPilotHeader
        onClickReset={handleResetConversation}
        conversation={conversation}
      />
      <ManuPilotBody
        conversation={conversation}
        isThinking={isThinking}
        loading={loading}
        handleSendMessage={handleSendMessage}
      />
      <ManuPilotInput
        loading={loading}
        handleSendMessage={handleSendMessage}
        error={error}
        clearError={clearError}
        droppedFile={droppedFile}
        setDroppedFile={setDroppedFile}
      />
      <NavigationWarningDialog
        showNavigationWarning={showNavigationWarning}
        setShowNavigationWarning={setShowNavigationWarning}
        pendingUrl={pendingUrl}
        originalPushRef={originalPushRef}
        router={router}
      />

      <AttachFileOverlay isDraggingFile={isDraggingFile} />
    </div>
  );
};

/**
 * A small hook to handle the "are you sure you want to leave" warning
 */
function useNavigationProtection(conversation, router, originalPushRef) {
  const [showNavigationWarning, setShowNavigationWarning] = useState(false);
  const [pendingUrl, setPendingUrl] = useState(null);

  useEffect(() => {
    if (conversation.length > 0) {
      // Warn on browser/tab close
      const handleBeforeUnload = (e) => {
        e.preventDefault();
        e.returnValue = "";
      };
      window.addEventListener("beforeunload", handleBeforeUnload);
      return () =>
        window.removeEventListener("beforeunload", handleBeforeUnload);
    }
  }, [conversation]);

  useEffect(() => {
    if (conversation.length > 0) {
      const originalPush = router.push;

      router.push = (url, as, options) => {
        if (url !== router.asPath) {
          setPendingUrl(() => () => originalPush(url, as, options));
          setShowNavigationWarning(true);
          return Promise.resolve(false); // Prevent immediate navigation
        }
        return originalPush(url, as, options);
      };

      return () => {
        router.push = originalPush; // Restore original push on unmount
      };
    }
  }, [router, conversation]);

  return {
    showNavigationWarning,
    setShowNavigationWarning,
    pendingUrl,
    setPendingUrl,
  };
}

/**
 * Render the AlertDialog for navigation warnings
 */
function NavigationWarningDialog({
  showNavigationWarning,
  setShowNavigationWarning,
  pendingUrl,
  originalPushRef,
  router,
}) {
  const handleNavigationConfirm = () => {
    if (pendingUrl) pendingUrl();
    restoreOriginalPush();
  };

  const handleNavigationCancel = () => {
    setShowNavigationWarning(false);
    restoreOriginalPush();
  };

  const restoreOriginalPush = () => {
    router.push = originalPushRef.current;
  };

  return (
    <AlertDialog open={showNavigationWarning}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to leave?</AlertDialogTitle>
          <AlertDialogDescription>
            Your current conversation with ManuPilot will be lost and cannot be
            recovered.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleNavigationCancel}>
            Stay
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleNavigationConfirm}>
            Leave
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ManuPilotPage;
