"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { GoBold, GoHeading, GoQuote, GoCode } from "react-icons/go";
import { FaMarkdown } from "react-icons/fa";
import { FaListOl, FaListUl } from "react-icons/fa6";
import { FiItalic } from "react-icons/fi";
import { IoIosLink } from "react-icons/io";
import { CodeBlock, ProfileAvatarSelector } from "@/components";

// Base URL for Dicebar API for custom avatars
const DICEBEAR_BASE_URL = "https://api.dicebear.com/9.x";

// Custom Markdown components for rendering formatted content
const customComponents = {
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-text-primary pl-3 opacity-40 italic mb-2">
      {children}
    </blockquote>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-text-link underline"
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="list-disc pl-6 text-text-primary mb-2">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal pl-6 text-text-primary mb-2">{children}</ol>
  ),
  li: ({ children }) => <li className="mb-1">{children}</li>,
  code: ({ inline, className, children }) => {
    return !inline ? (
      <CodeBlock code={String(children).trim()} lang="javascript" />
    ) : (
      <code className="px-1 py-[2px] bg-bg-secondary rounded-md text-text-primary">
        {children}
      </code>
    );
  },
};

/**
 * CommentInput Component
 *
 * Provides a text input area for writing comments and replies, supporting Markdown formatting.
 *
 * Props:
 * - placeholder: Placeholder text for input field
 * - onSubmit: Function to handle comment submission
 * - showToggle: Whether to show/hide the input initially
 * - isReply: Boolean indicating if the input is for a reply
 * - parentId: ID of the parent comment (for replies)
 */

const CommentInput = ({
  placeholder,
  onSubmit,
  showToggle = true,
  isReply = false,
  parentId,
}) => {
  // State for managing input visibility
  const [inputVisible, setInputVisible] = useState(!showToggle);
  // State for storing user input
  const [inputValue, setInputValue] = useState("");
  // State for storing user name
  const [name, setName] = useState("");
  // State for selecting avatar type
  const [avatarType, setAvatarType] = useState("adventurer");
  // State for active tab: "write" or "preview"
  const [activeTab, setActiveTab] = useState("write");

  // Handles input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Handles comment submission
  const handleSubmit = () => {
    if (!name.trim() || !inputValue.trim()) {
      alert("Name and content cannot be empty.");
      return;
    }
    setInputVisible(!showToggle);

    // Generate avatar URL using Dicebear API
    const avatar = `${DICEBEAR_BASE_URL}/${avatarType}/svg?seed=${encodeURIComponent(
      name
    )}&backgroundType=solid,gradientLinear&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4`;

    onSubmit({
      name,
      avatar,
      content: inputValue,
      parentId,
    });

    // reset fields
    setInputValue("");
    setName("");
    setAvatarType("adventurer");
    setActiveTab("write");
  };

  /**
   * Inserts predefined Markdown syntax into the input field
   * based on the selected formatting option
   */
  const addMarkdown = (symbol) => {
    const cursorPosition = inputValue.length;
    let markdownSnippet = "";
    switch (symbol) {
      case "bold":
        markdownSnippet = `**bold text**`;
        break;
      case "italic":
        markdownSnippet = `*italic text*`;
        break;
      case "header":
        markdownSnippet = `### `;
        break;
      case "blockquote":
        markdownSnippet = `> `;
        break;
      case "code":
        markdownSnippet = `\`\`\`code\`\`\``;
        break;
      case "ul":
        markdownSnippet = `- `;
        break;
      case "ol":
        markdownSnippet = `1. `;
        break;
      case "link":
        markdownSnippet = `[Link Text](https://example.com)`; // Markdown link
        break;
      default:
        break;
    }
    setInputValue(
      inputValue.slice(0, cursorPosition) +
        markdownSnippet +
        inputValue.slice(cursorPosition)
    );
  };

  /**
   * Handles Enter key behavior for list continuation
   */
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default newline behavior

      const lines = inputValue.split("\n");
      const currentLine = lines[lines.length - 1]; // Get the last line

      let newLinePrefix = "";

      // Ordered list continuation
      const orderedMatch = currentLine.match(/^(\d+)\.\s/);
      if (orderedMatch) {
        const nextNumber = parseInt(orderedMatch[1], 10) + 1;
        newLinePrefix = `${nextNumber}. `;
      }

      // Unordered list continuation
      const unorderedMatch = currentLine.match(/^-\s/);
      if (unorderedMatch) {
        newLinePrefix = "- ";
      }

      // Add the new line prefix to the input
      setInputValue((prev) => `${prev}\n${newLinePrefix}`);
    }
  };

  return (
    <div className="w-full">
      {showToggle && !inputVisible ? (
        <button
          onClick={() => setInputVisible(true)}
          className="w-full flex items-center justify-start bg-bg-primary rounded-md border border-accent-border py-1 px-2 text-sm text-accent-icon cursor-text"
        >
          {placeholder}
        </button>
      ) : (
        <div className="flex flex-col gap-4 ">
          {/* Avatar and Name Selector */}
          <ProfileAvatarSelector
            name={name}
            setName={setName}
            avatarType={avatarType}
            setAvatarType={setAvatarType}
          />
          {/* Input text container */}
          <div className="flex flex-col border border-accent-border rounded-md p bg-bg-primary">
            {/* Write or Preview tabs and markdown selection */}
            <div className="w-full flex justify-between items-center bg-bg-hover rounded-t-md border-b border-accent-border">
              <div className="flex gap-1 ">
                <button
                  onClick={() => setActiveTab("write")}
                  className={`px-4 py-2 text-sm ${
                    activeTab === "write"
                      ? "border-r border-r-accent-border text-text-primary rounded-t-md bg-bg-primary"
                      : "text-text-secondary"
                  }`}
                >
                  Write
                </button>
                <button
                  onClick={() => setActiveTab("preview")}
                  className={`px-4 py-2 text-sm ${
                    activeTab === "preview"
                      ? "border-l border-r border-accent-border text-text-primary rounded-t-md bg-bg-primary"
                      : "text-text-secondary"
                  }`}
                >
                  Preview
                </button>
              </div>
              {activeTab === "write" && (
                <div className="hidden md:flex gap-6 items-center px-4">
                  <button onClick={() => addMarkdown("header")} title="Header">
                    <GoHeading size={18} className="text-accent-icon" />
                  </button>

                  <button onClick={() => addMarkdown("bold")} title="Bold">
                    <GoBold size={18} className="text-accent-icon" />
                  </button>

                  <button onClick={() => addMarkdown("italic")} title="Italic">
                    <FiItalic size={18} className="text-accent-icon" />
                  </button>

                  <button
                    onClick={() => addMarkdown("blockquote")}
                    title="Quote"
                  >
                    <GoQuote size={18} className="text-accent-icon" />
                  </button>

                  <button
                    onClick={() => addMarkdown("code")}
                    title="Code Block"
                  >
                    <GoCode size={18} className="text-accent-icon" />
                  </button>

                  <button onClick={() => addMarkdown("link")} title="Link">
                    <IoIosLink size={18} className="text-accent-icon" />
                  </button>

                  <div className="w-px h-[18px] bg-accent-border" />

                  <button
                    onClick={() => addMarkdown("ul")}
                    title="Unordered List"
                  >
                    <FaListUl size={18} className="text-accent-icon" />
                  </button>
                  <button
                    onClick={() => addMarkdown("ol")}
                    title="Ordered List"
                  >
                    <FaListOl size={18} className="text-accent-icon" />
                  </button>
                </div>
              )}
            </div>
            <div className="px-2 min-h-[140px]">
              {activeTab === "write" ? (
                <div className="flex flex-col">
                  <div className="flex md:hidden gap-3 items-center mt-2 flex-wrap">
                    <button
                      onClick={() => addMarkdown("header")}
                      title="Header"
                    >
                      <GoHeading size={16} className="text-accent-icon" />
                    </button>

                    <button onClick={() => addMarkdown("bold")} title="Bold">
                      <GoBold size={16} className="text-accent-icon" />
                    </button>

                    <button
                      onClick={() => addMarkdown("italic")}
                      title="Italic"
                    >
                      <FiItalic size={16} className="text-accent-icon" />
                    </button>

                    <button
                      onClick={() => addMarkdown("blockquote")}
                      title="Quote"
                    >
                      <GoQuote size={16} className="text-accent-icon" />
                    </button>

                    <button
                      onClick={() => addMarkdown("code")}
                      title="Code Block"
                    >
                      <GoCode size={16} className="text-accent-icon" />
                    </button>

                    <button onClick={() => addMarkdown("link")} title="Link">
                      <IoIosLink size={16} className="text-accent-icon" />
                    </button>

                    <button
                      onClick={() => addMarkdown("ul")}
                      title="Unordered List"
                    >
                      <FaListUl size={16} className="text-accent-icon" />
                    </button>
                    <button
                      onClick={() => addMarkdown("ol")}
                      title="Ordered List"
                    >
                      <FaListOl size={16} className="text-accent-icon" />
                    </button>
                  </div>
                  <textarea
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    rows={6}
                    className="w-full min-h-[144px] mt-2 p-2 border border-accent-border rounded-md text-sm text-text-primary bg-bg-primary focus:outline-none focus:ring focus:ring-accent-icon"
                    placeholder={placeholder}
                  />
                  <a
                    href="https://www.markdowntutorial.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-fit flex items-center gap-1 text-xs font-semibold text-text-primary my-2 hover:bg-bg-button p-2 rounded-md"
                  >
                    <FaMarkdown size={16} className="text-accent-icon" />{" "}
                    Markdown is supported
                  </a>
                </div>
              ) : (
                <div className="w-full py-2 text-sm bg-bg-primary text-text-primary">
                  <ReactMarkdown components={customComponents}>
                    {inputValue || "Nothing to preview"}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            {showToggle && (
              <button
                onClick={() => setInputVisible(false)}
                className="btn-primary !text-text-primary !bg-bg-button !border !border-accent-border"
              >
                Cancel
              </button>
            )}
            <button
              onClick={handleSubmit}
              disabled={!name.trim() || !inputValue.trim()}
              className={`px-3 py-1 text-sm rounded-md ${
                !name.trim() || !inputValue.trim()
                  ? "btn-primary cursor-not-allowed !brightness-75 !text-[#ffffff93]"
                  : "btn-primary"
              }`}
            >
              {isReply ? "Reply" : "Comment"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentInput;
