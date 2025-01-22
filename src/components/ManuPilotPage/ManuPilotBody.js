"use client";

import React, { useState, useRef, useEffect } from "react";
import { GoCopilot } from "react-icons/go";
import { MdLightbulb } from "react-icons/md";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FaRobot, FaFutbol, FaArrowDown, FaFileCode } from "react-icons/fa";
import { SiReact } from "react-icons/si";
import {
  IoCodeWorkingOutline,
  IoBrushOutline,
  IoCodeSharp,
  IoArrowDown,
} from "react-icons/io5";
import { FiCornerRightDown } from "react-icons/fi";
import { TfiInfoAlt } from "react-icons/tfi";
import { LuGithub } from "react-icons/lu";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import ManuPilotCodeBlock from "./ManuPilotCodeBlock";

// const customComponents = {
//   blockquote: ({ children }) => (
//     <blockquote className="border-l-4 border-text-primary pl-3 opacity-40 italic mb-2">
//       {children}
//     </blockquote>
//   ),
//   a: ({ href, children }) => (
//     <a
//       href={href}
//       target="_blank"
//       rel="noopener noreferrer"
//       className="text-text-link underline"
//     >
//       {children}
//     </a>
//   ),
//   ul: ({ children }) => (
//     <ul className="list-disc pl-6 text-text-primary mb-2">{children}</ul>
//   ),
//   ol: ({ children }) => (
//     <ol className="list-decimal pl-6 text-text-primary mb-2">{children}</ol>
//   ),
//   li: ({ children }) => <li className="mb-1">{children}</li>,
//   code: ({ inline, className, children }) => {
//     const language = /language-(\w+)/.exec(className || "")?.[1] || "bash";
//     return !inline ? (
//       <ManuPilotCodeBlock code={String(children).trim()} lang={language} />
//     ) : (
//       <code className="px-1 py-[2px] bg-transparent border border-accent-border rounded-md text-text-primary">
//         {children}
//       </code>
//     );
//   },
// };

const customComponents = {
  // Line breaks
  hr: () => <hr className="border-accent-border my-4" />,
  // Force paragraphs to wrap text and break words
  p: ({ node, children }) => (
    <p className="mb-2 leading-relaxed text-text-primary whitespace-pre-wrap break-words">
      {children}
    </p>
  ),
  // Headings
  h1: ({ children }) => (
    <h1 className="text-3xl sm:text-4xl font-extrabold mt-3 mb-4 text-text-primary whitespace-pre-wrap break-words">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-[22px] sm:text-3xl font-bold mt-3 mb-3 text-text-primary whitespace-pre-wrap break-words">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl sm:text-[22px] font-semibold mt-2 mb-2 text-text-primary whitespace-pre-wrap break-words">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-lg sm:text-xl font-semibold mt-2 mb-2 text-text-primary whitespace-pre-wrap break-words">
      {children}
    </h4>
  ),
  h5: ({ children }) => (
    <h5 className="text-[17px] sm:text-lg font-semibold mt-2 mb-2 text-text-primary whitespace-pre-wrap break-words">
      {children}
    </h5>
  ),
  h6: ({ children }) => (
    <h6 className="text-base font-semibold mt-2 mb-2 text-text-primary whitespace-pre-wrap break-words">
      {children}
    </h6>
  ),
  table: ({ children }) => (
    <div className="w-full max-w-full sm:max-w-[570px] min-[700px]:max-w-[625px] min-[750px]:max-w-[675px] min-[825px]:max-w-[750px] overflow-x-auto thin-scrollbar my-4">
      <table className="table-auto min-w-full border border-accent-border">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-bg-tertiary max-sm:text-sm text-text-primary">
      {children}
    </thead>
  ),
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => (
    <tr className="border-b border-accent-border last:border-none">
      {children}
    </tr>
  ),
  th: ({ children }) => (
    <th className="px-3 py-2 font-semibold max-sm:text-xs text-left border-r border-accent-border last:border-none">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-3 py-2 align-top border-r border-accent-border last:border-none">
      {children}
    </td>
  ),
  img: ({ src, alt, title }) => (
    <img
      src={src}
      alt={alt || ""}
      title={title}
      className="w-auto h-auto rounded-md border border-accent-border manupilot-img-temp-width"
    />
  ),
  // Blockquote
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-text-primary pl-3 opacity-80 italic mb-3 whitespace-pre-wrap break-words">
      {children}
    </blockquote>
  ),
  // Lists
  ul: ({ children }) => (
    <ul className="list-disc pl-2 sm:pl-6 text-text-primary my-2">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal pl-2 sm:pl-6 text-text-primary my-2">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="mb-1">{children}</li>,
  // Links
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
  // Code logic => Fenced code => <ManuPilotCodeBlock/>, Inline => <code/>
  code: ({ inline, className, children }) => {
    const language = /language-(\w+)/.exec(className || "")?.[1] || "plaintext";
    if (!inline && language !== "plaintext") {
      // Multi-line (fenced) code block
      return (
        <ManuPilotCodeBlock
          code={String(children).replace(/\n$/, "")}
          lang={language}
        />
      );
    }
    // Inline code
    return (
      <code
        className="
        inline-block
        px-1
        py-[1px]
        text-sm
        rounded-sm
        bg-bg-button
        text-text-primary 
        whitespace-pre-wrap 
        break-words
      "
      >
        {children}
      </code>
    );
  },
};

const ManuPilotBody = ({ conversation, loading, handleSendMessage }) => {
  const containerRef = useRef(null);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [randomIndices, setRandomIndices] = useState([]);

  // Scroll to bottom on new messages or loading
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [conversation, loading]);

  // Update scroll state dynamically
  useEffect(() => {
    const SCROLL_THRESHOLD = 200;

    const handleScroll = () => {
      if (!containerRef.current) return;

      const { scrollHeight, clientHeight, scrollTop } = containerRef.current;

      // Check if the content is scrollable and user is far enough from the bottom
      const isScrollable = scrollHeight > clientHeight;
      const isNearBottom =
        scrollTop + clientHeight >= scrollHeight - SCROLL_THRESHOLD;

      setShowScrollToBottom(isScrollable && !isNearBottom);
    };

    handleScroll(); // Initialize state
    const container = containerRef.current;
    container?.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      container?.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    function checkSize() {
      // Tailwind's `sm` breakpoint = 640px
      setIsMobile(window.innerWidth < 640);
    }
    checkSize(); // run on mount
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  useEffect(() => {
    // On mount (or whenever isMobile changes), pick 3 random suggestions if on mobile
    if (isMobile) {
      setRandomIndices(getRandomIndices(3));
    } else {
      setRandomIndices([0, 1, 2, 3, 4, 5]); // all indices for desktop
    }
  }, [isMobile]);

  // const handleScroll = () => {
  //   if (!containerRef.current) return;

  //   const { scrollHeight, clientHeight, scrollTop } = containerRef.current;
  //   setShowScrollToBottom(scrollTop + clientHeight < scrollHeight - 10);
  // };

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const suggestions = [
    {
      icon: (
        <TfiInfoAlt
          size={18}
          className="text-other-chart-orange4 max-[322px]:hidden"
        />
      ),
      label: "Tell me more about Emanuele Sgroi?",
    },
    {
      icon: (
        <LuGithub
          size={18}
          className="text-other-chart-green3 max-[322px]:hidden"
        />
      ),
      label: "What is this website about?",
    },
    {
      icon: (
        <FaRobot
          size={18}
          className="text-other-chart-purple4 max-[322px]:hidden"
        />
      ),
      label: "How does ManuPilot work?",
    },
    {
      icon: (
        <SiReact
          size={18}
          className="text-other-chart-blue4 max-[322px]:hidden"
        />
      ),
      label: "Explain React hooks to me",
    },
    {
      icon: (
        <IoCodeSharp
          size={18}
          className="text-accent-icon max-[322px]:hidden"
        />
      ),
      label: "Can you review my code?",
    },
    {
      icon: (
        <MdLightbulb
          size={18}
          className="text-other-chart-yellow4 dark:text-other-chart-yellow1 max-[322px]:hidden"
        />
      ),
      label: "Generate a project idea",
    },
  ];

  const mobileSuggestionsStyles = (index) => {
    let styles = "";
    switch (index) {
      case 0:
        styles = "max-[322px]:border-other-chart-orange4";
        break;
      case 1:
        styles = "max-[322px]:border-other-chart-green3";
        break;
      case 2:
        styles = "max-[322px]:border-other-chart-purple4";
        break;
      case 3:
        styles = "max-[322px]:border-other-chart-blue4";
        break;
      case 4:
        styles = "max-[322px]:border-accent-icon";
        break;
      case 5:
        styles =
          "max-[322px]:border-other-chart-yellow4 max-[322px]:dark:border-other-chart-yellow1";
        break;
      default:
        styles = "max-[322px]:border-accent-icon";
        break;
    }
    return styles;
  };

  const displaySuggestions = randomIndices.map((i) => {
    return { ...suggestions[i], index: i };
  });

  function getRandomIndices(n) {
    // We have 6 suggestions total
    const indices = [0, 1, 2, 3, 4, 5];
    // Shuffle
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    // return the first n
    return indices.slice(0, n);
  }

  return (
    <div
      ref={containerRef}
      //  onScroll={handleScroll}
      className="
      flex-1 
      min-h-0         
      w-full 
      relative 
      overflow-y-auto 
      medium-scrollbar 
      flex 
      flex-col       
      items-start     
      "
    >
      {conversation.length > 0 || loading ? (
        <div className="w-full flex justify-center px-4">
          <div className="w-full min-[900px]:max-w-[850px] max-[900px]:max-w-full flex flex-col gap-4 sm:px-4 py-4 ">
            {conversation.map((message, index) => {
              const isUser = message.role === "user";
              return (
                <div
                  key={index}
                  className={`min-[900px]:max-w-[850px] max-[900px]:max-w-full flex max-sm:flex-col ${
                    isUser
                      ? "max-sm:items-end sm:justify-end"
                      : "justify-start items-start gap-4 my-4"
                  }`}
                >
                  {/* AI Icon if assistant */}
                  {!isUser && (
                    <div className="sm:pt-[3px] max-sm:flex max-sm:gap-2 max-sm:items-center">
                      <GoCopilot size={20} className="text-accent-icon" />
                      <FiCornerRightDown
                        size={20}
                        className="text-accent-icon transform translate-y-2 sm:hidden"
                      />
                    </div>
                  )}
                  {/* Message bubble */}
                  <div
                    className={`text-text-primary min-[900px]:max-w-[850px] max-[900px]:max-w-full`}
                  >
                    {isUser ? (
                      <UserBubble message={message} />
                    ) : (
                      // assistant => parse with React Markdown
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm, remarkBreaks]}
                        components={customComponents}
                      >
                        {message.content}
                      </ReactMarkdown>
                    )}
                    {/* {isUser ? (
                      ""
                    ) : (
                      // assistant => parse with React Markdown

                      <>{message.content}</>
                    )} */}
                  </div>
                </div>
              );
            })}

            {/* Loading State */}
            {loading && (
              <div className="flex justify-start items-center gap-4 my-4">
                <GoCopilot size={20} className="text-accent-icon" />
                <div className="manupilot-shimmer">
                  ManuPilot is thinking...
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-full center flex-col gap-12 p-4">
          {/* Conversation is resetted */}
          <div className="relative center">
            <div className="w-[78px] h-[78px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-bg-primary z-[1] rounded-full " />
            <div className="w-[84px] h-[84px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-bg-primary z-[0] manupilot-background-gradient rounded-full" />
            <GoCopilot size={40} className="manupilot-rotate-animation z-10" />
          </div>
          <div className="center gap-4 flex-wrap max-w-[850px]">
            {displaySuggestions.map((suggestionObj, idx) => {
              const { icon, label, index } = suggestionObj;
              // Reuse your mobileSuggestionsStyles(index)
              const styleClasses = mobileSuggestionsStyles(index);
              return (
                <button
                  key={idx}
                  onClick={() => handleSendMessage({ text: label })}
                  className={`flex items-center gap-2 py-2 px-4 max-[350px]:px-2 max-[350px]:py-1 rounded-full border border-accent-border hover:bg-bg-hover text-text-primary text-sm max-[350px]:text-xs ${styleClasses}`}
                >
                  {icon}
                  {label}
                </button>
              );
            })}
          </div>
          <p className="text-xs text-text-secondary mt-[-24px] text-center">
            ManuPilot uses AI. Check for mistakes.
          </p>
        </div>
      )}
      {/* Conditionally show the "Scroll to Bottom" button if near top */}

      {conversation.length > 0 && (
        <button
          onClick={scrollToBottom}
          className={`
      sticky bottom-4 left-1/2 transform -translate-x-1/2
      bg-bg-button text-text-primary border border-accent-border
      rounded-full p-3 z-10
      transition-all duration-300 ease-in-out
      ${showScrollToBottom ? "scale-100 opacity-100" : "scale-0 opacity-0"}
    `}
          aria-hidden={!showScrollToBottom} // Accessibility improvement
        >
          <IoArrowDown size={20} className="text-accent-icon" />
        </button>
      )}
    </div>
  );
};

export default ManuPilotBody;

// ${
//   isUser
//     ? "bg-bg-tertiary text-text-primary px-4 py-2 max-w-[800px] whitespace-pre-wrap break-words"
//     : "text-text-primary max-w-[800px]"
// }

function UserBubble({ message }) {
  // message = { role: "user", text: "...", file: { name, content } }
  const { text, file } = message;

  return (
    <div className="flex flex-col gap-3">
      {file && (
        // <div className="text-sm whitespace-pre-wrap break-words">
        //   [ Attached: {file.name} ]
        // </div>
        <div className="w-fit center cursor-default gap-2 border border-accent-border px-4 py-1 rounded-xl">
          <FaFileCode size={24} className="text-accent-icon" />
          <div className="flex flex-col">
            <p className="text-text-primary font-bold text-sm">{file.name}</p>
            <p className="text-text-secondary text-sm">File</p>
          </div>
        </div>
      )}

      {text && (
        <div className="rounded-xl bg-bg-tertiary text-text-primary px-2 py-1 max-w-[800px] whitespace-pre-wrap break-words">
          <p className=" whitespace-pre-wrap break-words px-2 py-1">{text}</p>
        </div>
      )}
    </div>
  );
}
