"use client";

import React from "react";
import { getAssetUrl } from "@/utils/imageUtils";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import SyntaxHighlighter from "react-syntax-highlighter/dist/cjs/prism";
import {
  darcula,
  oneLight,
} from "react-syntax-highlighter/dist/cjs/styles/prism";

/**
 * ProjectReadme Component
 *
 * Displays the project's README content, tech stack, and languages used.
 *
 * Features:
 * - **Contentful Rich Text Rendering**: Transforms Contentful's rich text format into React components.
 * - **Custom Styling for Text**:
 *   - Supports headings (H1-H6), paragraphs, lists, links, quotes, tables, and embedded assets.
 *   - Includes custom styling for bold, italic, underline, superscript, subscript, and strikethrough text.
 * - **Code Block Highlighting**:
 *   - Uses `react-syntax-highlighter` for syntax highlighting.
 *   - Defaults to the **Darcula** theme for a dark-mode friendly appearance.
 * - **Dynamic Tech Stack Display**:
 *   - Groups technologies by category (e.g., **Frontend**, **Backend**, **Database**, etc.).
 *   - Displays each tech's logo and a brief description.
 * - **Languages Section**:
 *   - Lists all programming languages used in the project.
 *   - Shows a colour indicator for each language.
 *
 * Props:
 * - `project`: Object containing:
 *   - `readme`: The project's README content (Contentful rich text format).
 *   - `techStack`: Array of technologies used in the project, categorized.
 *   - `languages`: JSON string or array listing the programming languages used.
 */

const ProjectReadme = ({ project, t }) => {
  const { readme, techStack, languages } = project;

  // Access the referenced project tech stack
  const techStackRef = techStack?.map((tech) => tech.fields);

  // Parse JSON for languages
  const parsedLanguages =
    typeof languages === "string" ? JSON.parse(languages) : languages || [];

  // Group technologies by category
  const categorizedTechStack = techStackRef?.reduce((acc, tech) => {
    const category = tech.category;

    if (!acc[category]) {
      acc[category] = [];
    }

    acc[category].push({
      name: tech.name,
      description: tech.description,
      logo: tech.logo,
    });
    return acc;
  }, {});

  // Custom renderer for Contentful rich text
  const options = {
    renderMark: {
      [MARKS.CODE]: (text) => (
        <span className="px-1 py-[1px] monospace-text text-sm md:text-base rounded-sm bg-[#EFF2FF] dark:bg-bg-button text-text-primary whitespace-pre-wrap break-words">
          {text}
        </span>
      ),
      [MARKS.BOLD]: (text) => (
        <strong className=" text-text-primary">{text}</strong>
      ),
      [MARKS.ITALIC]: (text) => <em className="text-text-primary">{text}</em>,
      [MARKS.UNDERLINE]: (text) => (
        <span className="underline text-text-primary">{text}</span>
      ),
      [MARKS.SUPERSCRIPT]: (text) => <sup className="align-super ">{text}</sup>,
      [MARKS.SUBSCRIPT]: (text) => <sub className="align-sub ">{text}</sub>,
      [MARKS.STRIKETHROUGH]: (text) => (
        <s className="line-through text-text-secondary ">{text}</s>
      ),
    },
    renderNode: {
      [BLOCKS.HEADING_1]: (node, children) => {
        return (
          <h1 className="max-w-full  text-4xl md:text-5xl text-text-primary leading-tight mt-8 md:mt-10 mb-5 break-words">
            {children}
          </h1>
        );
      },
      [BLOCKS.HEADING_2]: (node, children) => {
        return (
          <h2 className=" text-3xl md:text-4xl text-text-primary leading-tight mt-8 mb-4 font-bold">
            {children}
          </h2>
        );
      },
      [BLOCKS.HEADING_3]: (node, children) => {
        return (
          <h3 className=" text-2xl md:text-3xl text-text-primary leading-tight mt-6 mb-3 font-semibold">
            {children}
          </h3>
        );
      },
      [BLOCKS.HEADING_4]: (node, children) => {
        return (
          <h4 className=" text-xl md:text-2xl text-text-primary leading-tight mt-4 mb-3 font-semibold">
            {children}
          </h4>
        );
      },
      [BLOCKS.HEADING_5]: (node, children) => {
        return (
          <h5 className=" text-lg md:text-xl text-text-primary leading-tight mt-3 mb-3 font-semibold">
            {children}
          </h5>
        );
      },
      [BLOCKS.HEADING_6]: (node, children) => {
        return (
          <h6 className=" text-base md:text-lg text-text-primary leading-tight mt-2 mb-2 font-semibold">
            {children}
          </h6>
        );
      },
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className=" leading-[30px] text-text-primary tracking-[0.01em] text-base md:text-lg mb-5 break-words">
          {children}
        </p>
      ),
      [INLINES.HYPERLINK]: (node, children) => {
        const url = node.data.uri;
        const isExternal = url.startsWith("http");
        return (
          <a
            href={url}
            target={isExternal ? "_blank" : "_self"}
            rel={isExternal ? "noopener noreferrer" : ""}
            className="text-text-link underline  leading-[30px] tracking-[0.01em] text-base md:text-lg break-words"
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
        return <li className="text-base md:text-lg mb-0">{children}</li>;
      },
      [BLOCKS.QUOTE]: (node, children) => (
        <blockquote className="border-l-4 border-t border-r border-b !border-l-other-chart-blue3 max-md:!text-sm border-accent-border !bg-bg-button  pl-4 pt-4 pb-1 pr-4 mb-4 rounded-e-xl">
          {children}
        </blockquote>
      ),
      [BLOCKS.HR]: () => (
        <hr className="my-6 md:my-8 border-t-2 border-accent-border" />
      ),
      [BLOCKS.TABLE]: (node, children) => {
        const headerRow = children[0];
        const bodyRows = children.slice(1);
        return (
          <div className=" overflow-x-auto thin-scrollbar my-6">
            <table className="w-full border-collapse border border-[#b9c2ff] dark:border-accent-border">
              <tbody>{children}</tbody>
            </table>
          </div>
        );
      },
      [BLOCKS.TABLE_ROW]: (node, children) => (
        <tr className="border-b border-[#b9c2ff] dark:border-accent-border odd:bg-[#3b6be418] dark:odd:bg-[#3b6be438]">
          {children}
        </tr>
      ),
      [BLOCKS.TABLE_HEADER_CELL]: (node, children) => {
        let textContent = children;

        if (
          Array.isArray(children) &&
          children.length === 1 &&
          typeof children[0] === "object"
        ) {
          textContent = children[0].props.children;
        }

        return (
          <th className="px-4 py-2 bg-other-chart-blue3 border border-[#b9c2ff] dark:border-accent-border text-left text-sm md:text-lg  text-white">
            {textContent}
          </th>
        );
      },
      [BLOCKS.TABLE_CELL]: (node, children) => {
        let textContent = children;

        if (
          Array.isArray(children) &&
          children.length === 1 &&
          typeof children[0] === "object"
        ) {
          textContent = children[0].props.children;
        }

        return (
          <td className="px-4 py-2 border border-[#b9c2ff] dark:border-accent-border text-sm md:text-base ">
            {textContent}
          </td>
        );
      },
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const asset = node?.data?.target?.fields;

        // ✅ Ensure the asset exists and contains a valid URL
        if (!asset || !asset.file || !asset.file.url) {
          console.warn("Missing image data from Contentful:", asset);
          return null; // Prevent rendering if no image data
        }

        // ✅ Fix URL (Ensure HTTPS)
        const imageUrl = asset.file.url.startsWith("http")
          ? asset.file.url
          : `https:${asset.file.url}`;

        // ✅ Extract Alt Text (Fallback to "Blog Image")
        const altText = asset?.title || asset?.description || "Blog Image";

        return (
          <div className="w-full flex justify-center my-6">
            <Image
              src={imageUrl}
              width={asset.file.details.image.width} // Use original width
              height={asset.file.details.image.height} // Use original height
              alt={altText}
              className="max-w-full h-auto rounded-lg "
              priority // Optimizes loading
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
              style={darcula} // Dark theme (suitable for blogs)
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
    <div className=" w-full  md:px-8 md:pb-8 pt-0 max-md:pb-8 max-md:py-4 max-md:px-4">
      {documentToReactComponents(readme, options)}
      <div className="w-full mt-12">
        <h2 className=" text-2xl md:text-4xl text-text-primary leading-tight font-semibold mb-4">
          {t.howIBuilt}
        </h2>
        <div className="w-full h-px bg-accent-border mb-5" />
        <ul className="flex flex-col justify-start items-start gap-4">
          {categorizedTechStack &&
            Object.entries(categorizedTechStack).map(
              ([category, technologies]) => (
                <li key={category}>
                  <h5 className=" text-lg md:text-xl text-text-primary leading-tight mb-3">
                    {category}
                  </h5>
                  <div className="flex flex-col gap-3 mt-1">
                    {technologies.map((tech, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 flex-wrap bg-bg-tertiary p-2 rounded-md"
                      >
                        <div className="flex items-center gap-2">
                          <Image
                            src={getAssetUrl(tech.logo)}
                            alt={tech.name}
                            width={100}
                            height={100}
                            priority
                            quality={100}
                            className="w-[22px] md:w-[24px] h-auto"
                          />
                          <p className=" leading-[30px] text-text-primary tracking-[0.01em] text-base">
                            {tech.name}:
                          </p>
                        </div>
                        <p className=" leading-[30px] text-text-secondary tracking-[0.01em] text-base">
                          {tech.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </li>
              )
            )}
          <li>
            <h5 className=" text-lg md:text-xl text-text-primary leading-tight mb-3">
              {t.languages}
            </h5>
            <div className="w-full flex flex-col gap-2">
              {parsedLanguages.map((lang, index) => (
                <div key={index} className="flex items-center gap-2">
                  {/* Language Color Indicator */}
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: lang.color }}
                  />
                  {/* Language Name */}
                  <p className=" leading-[30px] text-text-primary tracking-[0.01em] text-base">
                    {lang.name}
                  </p>
                </div>
              ))}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProjectReadme;
