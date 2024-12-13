import React from "react";
import { getAssetUrl } from "@/utils/imageUtils";
import Image from "next/image";
import Link from "next/link";
import { formatRelativeDate } from "@/utils/formatRelativeDate";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { FaArrowUp } from "react-icons/fa6";

// Options to render rich text fields from Contentful
const options = {
  renderNode: {
    [INLINES.HYPERLINK]: (node, children) => {
      const { uri } = node.data;
      // Open external links, mailto, tel, and internal links differently
      if (
        uri.startsWith("mailto:") ||
        uri.startsWith("tel:") ||
        uri.startsWith("http")
      ) {
        return (
          <a
            href={uri}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-link underline"
          >
            {children}
          </a>
        );
      }
      return (
        <Link href={uri} className="text-text-link underline">
          {children}
        </Link>
      );
    },
    [BLOCKS.HEADING_1]: (node, children) => (
      <h1 className="text-2xl font-bold">{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (node, children) => (
      <h2 className="text-lg font-semibold">{children}</h2>
    ),
    [BLOCKS.PARAGRAPH]: (node, children) => <p className="mb-2">{children}</p>,
    [BLOCKS.UL_LIST]: (node, children) => (
      <ul className="list-disc pl-6">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (node, children) => (
      <ol className="list-[circle] pl-12 -mt-2">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (node, children) => (
      <li className="my-2">{children}</li>
    ),
  },
};

const CommentsSection = ({ discussionContent, generalInfoContent }) => {
  const { myName, dateStarted, topComment } = discussionContent;

  // Retrieve image URLs from content
  const profilePictureUrl = generalInfoContent?.profilePicture
    ? getAssetUrl(generalInfoContent.profilePicture)
    : "";

  return (
    <div className="flex flex-1 flex-col">
      <CommentContainer
        profilePicture={profilePictureUrl}
        name={myName}
        date={dateStarted}
        content={topComment}
        isAuthor={true}
      />
    </div>
  );
};

export default CommentsSection;

const CommentContainer = ({
  profilePicture,
  name,
  date,
  content,
  isAuthor,
}) => {
  // temp code for likes count

  return (
    <div className="w-full p-4 flex flex-col gap-4 border border-accent-border rounded-md">
      <div className="flex items-center gap-2">
        <Image
          src={profilePicture}
          alt="Profile_Picture"
          width={32}
          height={32}
          quality={100}
          className="w-[32px] h-[32px] rounded-full object-cover object-center border border-accent-border"
        />
        <p className="font-semibold text-text-primary text-sm cursor-default hover:underline hover:text-accent-extra">
          {name}
        </p>
        <p className="text-accent-icon text-sm">{formatRelativeDate(date)}</p>
      </div>
      <div>
        <p>
          {typeof content === "string"
            ? content
            : documentToReactComponents(content, options)}
        </p>
      </div>
      <div className="flex">
        {/* Likes button */}
        <button className="btn-likes">
          <FaArrowUp size={12} />
          <span>0</span>
        </button>
      </div>
    </div>
  );
};
