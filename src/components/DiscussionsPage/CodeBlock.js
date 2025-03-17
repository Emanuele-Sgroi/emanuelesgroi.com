"use client";

import React, { useContext } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  darcula,
  oneLight,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import ThemeContext from "@/context/ThemeProvider";

/**
 * CodeBlock Component
 *
 * This component is needed for the creation of code blocks in the discussions page
 */

const CodeBlock = ({ code, lang }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className="w-full relative ">
      <SyntaxHighlighter
        showLineNumbers={true}
        wrapLongLines={false}
        language={lang}
        style={theme === "dark" ? darcula : oneLight}
        customStyle={{ width: "100%", minWidth: 0 }}
        className="rounded-md border border-accent-border thin-scrollbar"
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
