"use client";

import React, { useContext } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  darcula,
  oneLight,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import ThemeContext from "@/context/ThemeProvider";

const CodeBlock = ({ code, lang }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <SyntaxHighlighter
      showLineNumbers={true}
      wrapLongLines={true}
      language={lang}
      style={theme === "dark" ? darcula : oneLight}
      className="w-full rounded-md border border-accent-border"
    >
      {code}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
