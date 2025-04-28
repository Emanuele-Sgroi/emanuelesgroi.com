"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { formatRelativeDate } from "@/utils/formatRelativeDate";
import { FaArrowUp } from "react-icons/fa6";
import ReactMarkdown from "react-markdown";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaRegSmile } from "react-icons/fa";
import { CodeBlock } from "@/components";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";

/**
 * Predefined emoji reactions available for comments
 */
const emojis = ["👍", "👎", "😄", "🎉", "😕", "❤️", "🚀", "👀"];

/**
 * Custom Markdown components for rendering formatted content
 */
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
 * TopComment Component
 *
 * Displays the most relevant or upvoted comment at the top of a discussion.
 *
 * Props:
 * - profilePicture: URL of the author's profile picture.
 * - topComment: Object containing comment details (id, name, content, reactions, etc.).
 */

const TopComment = ({
  discussionContent,
  profilePicture,
  topComment,
  t,
  language,
}) => {
  // State for managing likes and reactions
  const [likes, setLikes] = useState(topComment?.reactions?.likes || 0); // Separate state for likes
  const [reactions, setReactions] = useState(topComment?.reactions || {});
  const [userReactions, setUserReactions] = useState({});
  const [open, setOpen] = useState(false);

  // Load user reactions from localStorage on component mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Load user reactions from localStorage
    const storedReactions =
      JSON.parse(localStorage.getItem(`reactions-${topComment.id}`)) || {};
    setUserReactions(storedReactions);
  }, [topComment.id]);

  /**
   * Updates reactions in the database
   */
  const updateReactionsInDB = async (newReactions) => {
    try {
      await fetch("/api/comments", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: topComment.id,
          reactions: newReactions,
        }),
      });
    } catch (err) {
      console.error("Failed to update reactions in the database:", err);
    }
  };

  /**
   * Handles the like button toggle
   */
  const handleLike = () => {
    const updatedLikes = userReactions.like ? likes - 1 : likes + 1; // Toggle like
    const updatedReactions = { ...reactions, likes: updatedLikes };
    const updatedUserReactions = { ...userReactions };

    if (userReactions.like) {
      delete updatedUserReactions.like;
    } else {
      updatedUserReactions.like = true;
    }

    setLikes(updatedLikes);
    setReactions(updatedReactions);
    setUserReactions(updatedUserReactions);

    // Update in database and localStorage
    updateReactionsInDB(updatedReactions);

    if (typeof window !== "undefined") {
      localStorage.setItem(
        `reactions-${topComment.id}`,
        JSON.stringify(updatedUserReactions)
      );
    }
  };

  /**
   * Handles emoji reactions
   */
  const handleEmojiReaction = (emoji) => {
    const currentCount = reactions[emoji] || 0;
    const isUserReacted = !!userReactions[emoji];
    const updatedReactions = { ...reactions };
    const updatedUserReactions = { ...userReactions };

    // Toggle emoji reaction
    if (isUserReacted) {
      updatedReactions[emoji] = currentCount - 1;
      delete updatedUserReactions[emoji];
    } else {
      updatedReactions[emoji] = currentCount + 1;
      updatedUserReactions[emoji] = true;
    }

    setReactions(updatedReactions);
    setUserReactions(updatedUserReactions);

    // Update in database and localStorage
    updateReactionsInDB(updatedReactions);
    if (typeof window !== "undefined") {
      localStorage.setItem(
        `reactions-${topComment.id}`,
        JSON.stringify(updatedUserReactions)
      );
    }
  };
  console.log(discussionContent);
  return (
    <div className="w-full p-4 flex flex-col gap-4 md:border max-md:border-b max-md:border-t border-accent-border md:rounded-md max-md:bg-bg-mobile-primary">
      <div className="flex items-center gap-2 flex-wrap">
        {/* Display author's profile picture */}
        {profilePicture ? (
          <Image
            src={profilePicture}
            alt="Profile_Picture"
            width={32}
            height={32}
            quality={100}
            className="w-[32px] h-[32px] rounded-full object-cover object-center border border-accent-border"
          />
        ) : (
          <div className="w-[32px] h-[32px] rounded-full bg-bg-button flex items-center justify-center text-base font-semibold text-accent-icon border border-accent-border">
            ?
          </div>
        )}

        <p className="font-semibold text-text-primary text-sm cursor-default hover:underline hover:text-accent-extra">
          {topComment.name}
        </p>
        <p className="text-accent-icon text-sm">
          {formatRelativeDate(topComment.createdAt)}
        </p>
      </div>
      <div className="w-full">
        {/* Render markdown content */}
        {language === "it" ? (
          <>
            {documentToReactComponents(
              discussionContent?.topComment,
              customComponents
            )}
          </>
        ) : (
          <ReactMarkdown components={customComponents}>
            {topComment?.content}
          </ReactMarkdown>
        )}
      </div>
      <div className="flex gap-2 items-center flex-wrap">
        {/* Likes button */}
        <button
          onClick={handleLike}
          className={`btn-likes ${
            userReactions.like
              ? "!bg-like-bg-active !text-like-text-active !border-like-text-active"
              : ""
          }`}
        >
          <FaArrowUp size={12} />
          <span>{likes}</span>
        </button>

        {/* Emoji popover */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger
            aria-expanded={open}
            className={`w-[26px] h-[26px] p-[2px] border border-accent-border rounded-full center hover:bg-bg-button ${
              open && "bg-bg-button"
            }`}
          >
            <FaRegSmile size={16} className="text-accent-icon" />
          </PopoverTrigger>
          <PopoverContent className="w-max p-1">
            <ul className="flex gap-1">
              {emojis.map((em, i) => (
                <li
                  key={i}
                  className={`text-lg p-1 cursor-pointer hover:bg-bg-hover rounded-md ${
                    userReactions[em] ? "bg-like-bg-active" : ""
                  }`}
                  onClick={() => handleEmojiReaction(em)}
                >
                  {em}
                </li>
              ))}
            </ul>
          </PopoverContent>
        </Popover>

        {/* Display emoji reactions */}
        {Object.entries(reactions).map(
          ([emoji, count]) =>
            emoji !== "likes" &&
            count > 0 && (
              <button
                key={emoji}
                onClick={() => handleEmojiReaction(emoji)}
                className={`btn-likes ${
                  userReactions[emoji]
                    ? "!bg-like-bg-active !text-like-text-active !border-like-text-active"
                    : ""
                }`}
              >
                <span>{emoji}</span>
                <span>{count}</span>
              </button>
            )
        )}
      </div>
    </div>
  );
};

export default TopComment;
