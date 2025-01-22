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
import "react-toastify/dist/ReactToastify.css";

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
  const [showNavigationWarning, setShowNavigationWarning] = useState(false);
  const [pendingUrl, setPendingUrl] = useState(null);
  const router = useRouter();
  const originalPushRef = useRef(router.push);

  const [conversation, setConversation] = useState([]); // Store messages
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [droppedFile, setDroppedFile] = useState(null);
  const [dragCounter, setDragCounter] = useState(0);

  // handle tab close or route changes
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

      // 1) Check extension
      if (!allowedExtensions.includes(`.${ext}`)) {
        toast.error("This file type is not supported.");
        return;
      }

      // 2) Check size
      if (file.size > MAX_FILE_SIZE_BYTES) {
        toast.error("File exceeds 2 MB limit.");
        return;
      }

      // 3) Pass the raw File object to the child
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

  // useEffect(() => {
  //   function handleDragEnter(e) {
  //     // We only want to react if the user is dragging files
  //     if (e.dataTransfer.types?.includes("Files")) {
  //       e.preventDefault();
  //       e.stopPropagation();

  //       setDragCounter((prev) => prev + 1);
  //       setIsDraggingFile(true); // Show the overlay
  //     }
  //   }

  //   function handleDragOver(e) {
  //     if (e.dataTransfer.types?.includes("Files")) {
  //       e.preventDefault();
  //       e.stopPropagation();
  //       // We do *not* increment here, or you'd quickly inflate dragCounter
  //     }
  //   }

  //   function handleDragLeave(e) {
  //     // If we leave *an element* but still inside the page, we’ll see dragleave.
  //     // We only hide if dragCounter gets to 0
  //     if (e.dataTransfer.types?.includes("Files")) {
  //       e.preventDefault();
  //       e.stopPropagation();

  //       setDragCounter((prevCount) => {
  //         const newCount = prevCount - 1;
  //         if (newCount <= 0) {
  //           // All "drag enters" are gone
  //           setIsDraggingFile(false);
  //           return 0;
  //         }
  //         return newCount;
  //       });
  //     }
  //   }

  //   function handleDrop(e) {
  //     e.preventDefault();
  //     e.stopPropagation();
  //     // Reset our counter and overlay
  //     setDragCounter(0);
  //     setIsDraggingFile(false);

  //     if (!e.dataTransfer.files?.length) return;
  //     const file = e.dataTransfer.files[0];
  //     const ext = file.name.split(".").pop().toLowerCase();

  //     if (!allowedExtensions.includes(`.${ext}`)) {
  //       toast.error("This file type is not supported.");
  //       return;
  //     }

  //     if (file.size > MAX_FILE_SIZE_BYTES) {
  //       toast.error("File exceeds 2 MB limit.");
  //       return;
  //     }

  //     // Read file
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       const result = reader.result;
  //       setDroppedFile({ name: file.name, content: result });
  //     };
  //     reader.onerror = () => {
  //       toast.error("Failed to read the file.");
  //     };
  //     reader.readAsText(file);
  //   }

  //   window.addEventListener("dragenter", handleDragEnter);
  //   window.addEventListener("dragover", handleDragOver);
  //   window.addEventListener("dragleave", handleDragLeave);
  //   window.addEventListener("drop", handleDrop);

  //   return () => {
  //     window.removeEventListener("dragenter", handleDragEnter);
  //     window.removeEventListener("dragover", handleDragOver);
  //     window.removeEventListener("dragleave", handleDragLeave);
  //     window.removeEventListener("drop", handleDrop);
  //   };
  // }, []);

  if (isManuPilotLoading || !manuPilotContent) {
    return <Loading />;
  }

  if (isManuPilotError) {
    return <ErrorMessage />;
  }

  // --------------------------------------
  // NEW: handleSendMessage takes an object
  // --------------------------------------
  const handleSendMessage = async (newMessage) => {
    // newMessage = { text: "...", file: { name: "...", content: "..." } }
    // or possibly { text: "...", file: null } if no file was attached
    if (!newMessage) return;
    const { text, file } = newMessage;

    // Don't send empty if there's no text and no file
    if (!text && !file) return;

    // 1) Add user message to local conversation
    setConversation((prev) => [...prev, { role: "user", text, file }]);

    setLoading(true);
    setError(null);

    try {
      // 2) Build final messages array for the AI (merging file content)
      const conversationWithNew = [
        ...conversation,
        { role: "user", text, file },
      ];
      const messagesForApi = [
        { role: "system", content: manuPilotContent.aiInstructions }, // System instructions
        ...convertConversationToApiMessages(conversationWithNew),
      ];

      // 3) Call your API
      const response = await fetch("/api/manupilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: messagesForApi }),
      });

      const data = await response.json();
      if (response.ok) {
        // 4) AI response => push into conversation
        setConversation((prev) => [
          ...prev,
          { role: "assistant", content: data.content },
        ]);
      } else {
        console.error("Error:", data.error);
        setError({
          type: "chat",
          message: "There was an error generating a response.",
        });
      }
    } catch (error) {
      console.error("API error:", error);
      setError({
        type: "system",
        message:
          "ManuPilot is experiencing an issue. Please try regenerating your response. If the problem persists, try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Helper to transform conversation (local) => ChatGPT API format
  function convertConversationToApiMessages(convo) {
    return convo.map((msg) => {
      if (msg.role === "user") {
        // Combine user’s typed text + file content if present
        let combined = msg.text || "";
        if (msg.file) {
          combined += `\n\nAttached file: ${msg.file.name}\n${msg.file.content}`;
        }
        return { role: "user", content: combined.trim() };
      }
      // assistant messages remain as-is
      return { role: msg.role, content: msg.content };
    });
  }

  const handleResetConversation = () => {
    setConversation([]);
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
 * Summarization logic: if total tokens > MAX_TOKENS_FOR_PROMPT,
 *    we ask the AI to create a short summary of older messages, then replace them
 *    with a single summary message, so the entire conversation is shorter.
 */
// async function maybeSummarizeIfNeeded(fullMessages) {
//   const totalTokens = countTokens(fullMessages);
//   if (totalTokens <= MAX_TOKENS_FOR_PROMPT) {
//     return fullMessages;
//   }

//   // If we exceed 100k tokens, let's summarize older messages
//   // We'll keep system + last 5 messages, and summarize everything else in between

//   const systemMsg = fullMessages[0];
//   const lastFive = fullMessages.slice(-5);
//   const olderMessages = fullMessages.slice(1, -5);

//   // call /api/manupilot-summarize with olderMessages
//   const summarizeRes = await fetch("/api/manupilot-summarize", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ olderMessages }),
//   });

//   const summarizeData = await summarizeRes.json();
//   if (!summarizeRes.ok) {
//     console.error("Error summarizing older messages:", summarizeData.error);
//     // if summarization fails, fallback to returning original (dangerous for token limit!)
//     return fullMessages;
//   }

//   const summaryText =
//     summarizeData.summary || "Unable to summarize older chat.";

//   // Now we replace older messages with one short summary message
//   const newConversation = [
//     systemMsg,
//     {
//       role: "assistant",
//       content: `SUMMARIZED CONTEXT:\n${summaryText}`,
//     },
//     ...lastFive,
//   ];

//   // Re-check token usage after summarizing
//   const checkAgain = countTokens(newConversation);
//   if (checkAgain > MAX_TOKENS_FOR_PROMPT) {
//     console.warn(
//       `Still over token limit after summarizing: ${checkAgain} tokens. Consider chunking further.`
//     );
//     // for now we just inform the user that we are over the limit and we invite him to reset the conversation
//     alert(
//       `You are over the token limit. Please consider resetting your conversation otherwise ManuPilot will not work.`
//     );
//   }

//   return newConversation;
// }

/** A small function to count tokens using tiktoken. */
// function countTokens(messages) {
//   const encoding = encodingForModel("chatgpt-4o-latest");
//   let total = 0;

//   for (const msg of messages) {
//     // add the content tokens
//     const tokens = encoding.encode(msg.content);
//     total += tokens.length;
//   }

//   encoding.free();
//   return total;
// }

/**
 * A small hook to handle the "are you sure you want to leave" warning
 */
function useNavigationProtection(conversation, router, originalPushRef) {
  const [showNavigationWarning, setShowNavigationWarning] = useState(false);
  const [pendingUrl, setPendingUrl] = useState(null);

  useEffect(() => {
    if (conversation.length > 0) {
      // warn on browser/tab close
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
      // intercept router.push
      router.push = (url, as, options) => {
        if (url !== router.asPath) {
          setPendingUrl(() => () => originalPushRef.current(url, as, options));
          setShowNavigationWarning(true);
          return;
        }
        return originalPushRef.current(url, as, options);
      };
      return () => {
        router.push = originalPushRef.current;
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
