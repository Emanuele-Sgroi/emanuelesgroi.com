"use client";

import React, { useState, useEffect, useRef } from "react";
import { getAssetUrl } from "@/utils/imageUtils";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import { Link as ScrollLink } from "react-scroll";
import SyntaxHighlighter from "react-syntax-highlighter/dist/cjs/prism";
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism";

/**
 * BlogContentSection Component
 *
 * This component is responsible for rendering a blog post, including:
 * - The main blog content (fetched from Contentful)
 * - A dynamically generated table of contents (TOC)
 * - Syntax highlighting for code blocks
 * - Author information
 * - Tags associated with the post
 */

const BlogContentSection = ({ blogPost }) => {
  const { tags, author, imageAuthor, blogContent } = blogPost;
  const [activeSection, setActiveSection] = useState(null);
  const headingsRef = useRef([]);

  // Effect to track the active section in the Table of Contents
  useEffect(() => {
    const sections = headingsRef.current.filter(Boolean); // Remove null values

    const observer = new IntersectionObserver(
      (entries) => {
        let activeId = null;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activeId = entry.target.id;
          }
        });

        if (activeId) {
          setActiveSection(activeId);
        }
      },
      {
        rootMargin: "-20% 0px -80% 0px", // Detects when user is inside the section
        threshold: [0, 0.5, 1], // Ensures active state throughout section
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  // Extract Table of Contents (H2 headings)
  const tableOfContents = [];
  if (blogContent?.content) {
    blogContent.content.forEach((block) => {
      if (block.nodeType === BLOCKS.HEADING_2) {
        const text = block.content.map((item) => item.value).join(" ");
        const id = text.replace(/\s+/g, "-").toLowerCase();
        tableOfContents.push({ id, text });
      }
    });
  }

  // Custom renderer for Contentful rich text
  const options = {
    renderMark: {
      // ✅ Inline Code (single words, phrases inside text)
      [MARKS.CODE]: (text) => (
        <code className="inline-block px-1 py-[1px] monospace-text text-base rounded-sm bg-[#EFF2FF] dark:bg-bg-button text-text-primary whitespace-pre-wrap break-words">
          {text}
        </code>
      ),
      [MARKS.BOLD]: (text) => (
        <strong className="poppins-bold text-text-primary">{text}</strong>
      ),
      [MARKS.ITALIC]: (text) => (
        <em className="poppins-italic text-text-primary">{text}</em>
      ),
      [MARKS.UNDERLINE]: (text) => (
        <span className="underline text-text-primary">{text}</span>
      ),
      [MARKS.SUPERSCRIPT]: (text) => (
        <sup className="align-super poppins-regular">{text}</sup>
      ),
      [MARKS.SUBSCRIPT]: (text) => (
        <sub className="align-sub poppins-regular">{text}</sub>
      ),
      [MARKS.STRIKETHROUGH]: (text) => (
        <s className="line-through text-text-secondary poppins-regular">
          {text}
        </s>
      ),
    },
    renderNode: {
      [BLOCKS.HEADING_1]: (node, children) => {
        return (
          <h1 className="poppins-bold text-4xl md:text-5xl text-text-primary leading-tight mt-8 md:mt-10 mb-5 break-words">
            {children}
          </h1>
        );
      },
      [BLOCKS.HEADING_2]: (node, children) => {
        const text = children.join(" ");
        const id = text.replace(/\s+/g, "-").toLowerCase();
        return (
          <h2
            id={id}
            ref={(el) => (headingsRef.current = [...headingsRef.current, el])}
            className="poppins-bold text-3xl md:text-4xl text-text-primary leading-tight mt-8 mb-4"
          >
            {children}
          </h2>
        );
      },
      [BLOCKS.HEADING_3]: (node, children) => {
        return (
          <h3 className="poppins-semibold text-2xl md:text-3xl text-text-primary leading-tight mt-6 mb-3">
            {children}
          </h3>
        );
      },
      [BLOCKS.HEADING_4]: (node, children) => {
        return (
          <h4 className="poppins-semibold text-xl md:text-2xl text-text-primary leading-tight mt-4 mb-3">
            {children}
          </h4>
        );
      },
      [BLOCKS.HEADING_5]: (node, children) => {
        return (
          <h5 className="poppins-medium text-lg md:text-xl text-text-primary leading-tight mt-3 mb-3">
            {children}
          </h5>
        );
      },
      [BLOCKS.HEADING_6]: (node, children) => {
        return (
          <h6 className="poppins-medium text-base md:text-lg text-text-primary leading-tight mt-2 mb-2">
            {children}
          </h6>
        );
      },

      // Paragraph rendering with code block detection
      [BLOCKS.PARAGRAPH]: (node, children) => {
        // Check if all elements in the paragraph are marked as code
        const isCodeBlock = node.content.every((child) =>
          child.marks?.some((mark) => mark.type === MARKS.CODE)
        );

        if (isCodeBlock) {
          const code = node.content
            .map((child) => child.value)
            .join("")
            .trim();

          return (
            <div className="my-4 rounded-md bg-bg-button overflow-x-auto">
              <SyntaxHighlighter
                language="python"
                style={darcula}
                wrapLongLines={false}
                customStyle={{
                  margin: 0,
                  borderRadius: "8px",
                  overflowX: "auto",
                }}
                className="thin-scrollbar monospace-text text-sm md:text-base dark:!bg-bg-button !p-2"
              >
                {code}
              </SyntaxHighlighter>
            </div>
          );
        }

        return (
          <p className="poppins-regular leading-[30px] text-text-primary tracking-[0.01em] text-base md:text-lg mb-5 break-words">
            {children}
          </p>
        );
      },

      [INLINES.HYPERLINK]: (node, children) => {
        const url = node.data.uri;
        const isExternal = url.startsWith("http");
        return (
          <a
            href={url}
            target={isExternal ? "_blank" : "_self"}
            rel={isExternal ? "noopener noreferrer" : ""}
            className="text-text-link underline poppins-regular leading-[30px] tracking-[0.01em] text-base md:text-lg break-words"
          >
            {children}
          </a>
        );
      },
      [BLOCKS.UL_LIST]: (node, children) => {
        return <ul className="list-disc pl-6 ">{children}</ul>;
      },
      [BLOCKS.OL_LIST]: (node, children) => (
        <ol className="list-decimal pl-6">{children}</ol>
      ),
      [BLOCKS.LIST_ITEM]: (node, children) => {
        return <li className="text-base md:text-lg mb-[22px]">{children}</li>;
      },
      [BLOCKS.QUOTE]: (node, children) => (
        <blockquote className="border-l-4 border-t border-r border-b !border-l-other-chart-blue3 max-md:!text-sm border-accent-border !bg-bg-button poppins-regular pl-4 pt-4 pb-1 pr-4 mb-4 rounded-e-xl">
          {children}
        </blockquote>
      ),
      [BLOCKS.HR]: () => (
        <hr className="my-6 md:my-8 border-t-2 border-accent-border" />
      ),
      [BLOCKS.TABLE]: (node, children) => (
        <div className="overflow-x-auto thin-scrollbar my-6">
          <table className="w-full border-collapse border border-[#b9c2ff] dark:border-accent-border">
            {children}
          </table>
        </div>
      ),
      [BLOCKS.TABLE_ROW]: (node, children) => (
        <tr className="border-b border-[#b9c2ff] dark:border-accent-border odd:bg-[#3b6be418] dark:odd:bg-[#3b6be438]">
          {children}
        </tr>
      ),
      [BLOCKS.TABLE_HEADER_CELL]: (node, children) => {
        let textContent = children;

        // Ensure it's pure text, removing unexpected <p> or <span> wrappers
        if (
          Array.isArray(children) &&
          children.length === 1 &&
          typeof children[0] === "object"
        ) {
          textContent = children[0].props.children;
        }

        return (
          <th className="px-4 py-2 bg-other-chart-blue3 border border-[#b9c2ff] dark:border-accent-border text-left text-sm md:text-lg poppins-bold text-white">
            {textContent}
          </th>
        );
      },
      [BLOCKS.TABLE_CELL]: (node, children) => {
        let textContent = children;

        // Ensure it's pure text, removing unexpected <p> or <span> wrappers
        if (
          Array.isArray(children) &&
          children.length === 1 &&
          typeof children[0] === "object"
        ) {
          textContent = children[0].props.children;
        }

        return (
          <td className="px-4 py-2 border border-[#b9c2ff] dark:border-accent-border text-sm md:text-base poppins-regular">
            {textContent}
          </td>
        );
      },
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const asset = node?.data?.target?.fields;

        // Ensure the asset exists and contains a valid URL
        if (!asset || !asset.file || !asset.file.url) {
          console.warn("Missing image data from Contentful:", asset);
          return null; // Prevent rendering if no image data
        }

        // Fix URL (Ensure HTTPS)
        const imageUrl = asset.file.url.startsWith("http")
          ? asset.file.url
          : `https:${asset.file.url}`;

        // Extract Alt Text (Fallback to "Blog Image")
        const altText = asset?.title || asset?.description || "Blog Image";

        return (
          <div className="w-full flex justify-center my-6">
            <Image
              src={imageUrl}
              width={asset.file.details.image.width}
              height={asset.file.details.image.height}
              alt={altText}
              className="max-w-full h-auto rounded-lg "
              priority
            />
          </div>
        );
      },
      [BLOCKS.CODE]: (node) => {
        const code = node.content[0].value; // Extract code text
        const language = node.data?.language || "javascript"; // Default language: JavaScript

        return (
          <div className="my-4 rounded-md border border-gray-700 bg-gray-900 overflow-x-auto">
            <SyntaxHighlighter
              language={language}
              style={darcula}
              wrapLongLines={true}
              customStyle={{
                padding: "16px",
                margin: 0,
                borderRadius: "8px",
                background: "#1e1e1e",
              }}
              className="thin-scrollbar"
            >
              {code}
            </SyntaxHighlighter>
          </div>
        );
      },
    },
  };

  return (
    <div className="w-full center max-[500px]:px-4 px-6  pt-8 md:pt-12 ">
      <div className="w-full max-w-[1020px] flex gap-10">
        {/* Left - Blog Content */}
        <div className="w-full md:w-2/3">
          {/* Table of Contents Section - Mobile*/}
          <div className="md:hidden w-full mb-8 border-b border-accent-border pb-4">
            <div className="w-full">
              <h4 className="text-xl poppins-semibold mb-2">
                Table of Contents
              </h4>
            </div>
            <ul className="w-full space-y-2 mt-5">
              {tableOfContents.map((item) => (
                <li key={item.id} className="!w-full">
                  <ScrollLink
                    to={item.id}
                    spy={true}
                    smooth={true}
                    offset={-15}
                    duration={100}
                    className={`w-full flex text-left text-text-primary text-sm py-1 pr-1 pl-4 hover:text-text-link hover:underline poppins-medium`}
                  >
                    {item.text}
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Render the blog content */}
          {documentToReactComponents(blogContent, options)}
          <div className="w-full flex max-md:flex-col items-start md:items-center gap-2 mt-10">
            <div className="flex flex-col justify-center">
              <div className="h-[5px] w-[40px] bg-accent-active mb-1" />
              <h4 className="text-sm poppins-light mb-2">Tags:</h4>
            </div>

            {/* Tags Section */}
            <div className="flex flex-wrap gap-2 ">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 poppins-regular tag-primary text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Author Section */}
          <div className="w-full flex flex-col mt-8 md:mt-12">
            <h3 className="text-text-primary text-left poppins-bold text-xl sm:text-3xl">
              Written by
            </h3>
            <div className="w-full h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mt-3"></div>
            <div className="flex items-center gap-4 mt-6">
              <div className="w-[80px] md:w-[120px] h-[80px] md:h-[120px] relative border border-accent-border rounded-full">
                <Image
                  src={getAssetUrl(imageAuthor)}
                  alt="Author_Picture"
                  width={680}
                  height={510}
                  quality={100}
                  className="w-full h-full rounded-full object-cover object-center z-10"
                />
              </div>
              <div className="flex flex-col">
                <h4 className="poppins-semibold text-xl">{author}</h4>
                <p className="text-text-secondary poppins-regular max-[500px]:text-xs text-sm">
                  Inspired by GitHub
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Tags & Table of Contents */}
        <div className="max-md:hidden w-1/3 ">
          {/* Tags Section */}
          <div className="w-full mb-6">
            <div className="w-full">
              <h4 className="text-lg poppins-semibold mb-2">Tags</h4>
              <div className="h-[2px] w-full bg-accent-border" />
            </div>

            <div className="flex flex-wrap gap-2 mt-5">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 poppins-regular tag-primary text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Table of Contents Section */}
          <div className="sticky top-6 w-full">
            <div className="w-full">
              <h4 className="text-lg poppins-semibold mb-2">
                Table of Contents
              </h4>
              <div className="h-[2px] w-full bg-accent-border" />
            </div>
            <ul className="w-full space-y-2 mt-5">
              {tableOfContents.map((item) => (
                <li key={item.id} className="!w-full">
                  <ScrollLink
                    // activeClass="bg-red-500"
                    to={item.id}
                    spy={true}
                    smooth={true}
                    offset={-15}
                    duration={100}
                    className={`w-full flex text-left text-text-primary text-sm py-1 px-2 rounded-md hover:text-text-link hover:underline cursor-pointer transition   ${
                      activeSection === item.id
                        ? "bg-[#DDF4FF] dark:bg-[#121D2F] poppins-semibold  "
                        : "poppins-medium"
                    }`}
                  >
                    {item.text}
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogContentSection;
