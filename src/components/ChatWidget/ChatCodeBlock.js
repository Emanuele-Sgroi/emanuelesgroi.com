"use client";

import React, { useContext } from "react";
import SyntaxHighlighter from "react-syntax-highlighter/dist/cjs/prism";
import {
  darcula,
  oneLight,
} from "react-syntax-highlighter/dist/cjs/styles/prism";

import ThemeContext from "@/context/ThemeProvider";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { AiOutlineCopy, AiOutlineCheck } from "react-icons/ai";

const ChatCodeBlock = ({ code, lang }) => {
  const { theme } = useContext(ThemeContext);
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <div className="relative w-full max-w-full sm:max-w-[570px] min-[700px]:max-w-[625px] min-[750px]:max-w-[675px] min-[850px]:max-w-[750px] my-4 rounded-md border border-accent-border bg-bg-secondary ">
      {/* Top bar with language and copy button */}
      <div className="flex justify-between items-center px-4 py-2 bg-bg-tertiary border-b border-accent-border rounded-t-md">
        <span className="text-sm text-text-secondary capitalize">
          {lang || "plaintext"}
        </span>
        <CopyToClipboard text={code} onCopy={handleCopy}>
          <button className="flex items-center gap-2 text-sm text-text-primary hover:text-text-link transition">
            {copied ? (
              <>
                <AiOutlineCheck size={16} />
                Copied
              </>
            ) : (
              <>
                <AiOutlineCopy size={16} />
                Copy
              </>
            )}
          </button>
        </CopyToClipboard>
      </div>

      {/* Syntax highlighter */}
      <SyntaxHighlighter
        language={lang}
        style={theme === "dark" ? darcula : oneLight}
        wrapLongLines={false}
        customStyle={{
          padding: "16px",
          margin: 0,
          borderRadius: "0 0 8px 8px",
          background: "var(--bg-primary)",
        }}
        className="w-full max-w-full overflow-x-auto thin-scrollbar text-sm"
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default ChatCodeBlock;
