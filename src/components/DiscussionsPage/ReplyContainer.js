"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { formatRelativeDate } from "@/utils/formatRelativeDate";
import ReactMarkdown from "react-markdown";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaRegSmile } from "react-icons/fa";
import { CodeBlock } from "@/components";

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

const ReplyContainer = ({ reply, emojis, authorPicture }) => {
  const [reactions, setReactions] = useState(reply?.reactions || {});
  const [userReactions, setUserReactions] = useState({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedReactions =
      JSON.parse(localStorage.getItem(`reactions-${reply.id}`)) || {};
    setUserReactions(storedReactions);

    const initialReactions = { ...reply.reactions };
    emojis.forEach((emoji) => {
      if (!initialReactions[emoji]) {
        initialReactions[emoji] = 0; // Default to 0 if missing
      }
    });

    setReactions(initialReactions);
  }, [reply.id, reply.reactions]);

  const updateReactionsInDB = async (newReactions) => {
    try {
      await fetch("/api/comments", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: reply.id,
          reactions: newReactions,
        }),
      });
    } catch (err) {
      console.error("Failed to update reactions in the database:", err);
    }
  };

  const handleEmojiReaction = (emoji) => {
    const currentCount = reactions[emoji] || 0;
    const isUserReacted = !!userReactions[emoji];
    const updatedReactions = { ...reactions };
    const updatedUserReactions = { ...userReactions };

    if (isUserReacted) {
      updatedReactions[emoji] = currentCount > 0 ? currentCount - 1 : 0;
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
        `reactions-${reply.id}`,
        JSON.stringify(updatedUserReactions)
      );
    }
  };

  return (
    <div className="w-full pr-4 mt-1 mb-8 last:mb-4 z-10">
      <div className="min-w-[30px] flex gap-2 md:gap-4 items-start">
        {/* Avatar */}
        {reply.isAuthor ? (
          <>
            <Image
              src={authorPicture}
              alt="Profile_Picture"
              width={32}
              height={32}
              quality={100}
              className="md:w-[30px] md:h-[30px] md:min-h-[30px] md:min-w-[30px] w-[28px] h-[28px] min-h-[28px] min-w-[28px] rounded-full object-cover object-center border border-accent-border bg-like-bg-active z-10"
            />
          </>
        ) : (
          <>
            {reply.avatar ? (
              <Image
                src={reply.avatar}
                alt="Profile_Picture"
                width={32}
                height={32}
                quality={100}
                className="md:w-[30px] md:h-[30px] md:min-h-[30px] md:min-w-[30px] w-[28px] h-[28px] min-h-[28px] min-w-[28px] rounded-full object-cover object-center border border-accent-border bg-like-bg-active z-10"
              />
            ) : (
              <div className="md:w-[30px] md:h-[30px] md:min-h-[30px] md:min-w-[30px] w-[28px] h-[28px] min-h-[28px] min-w-[28px] rounded-full bg-bg-button flex items-center justify-center text-base font-semibold text-accent-icon border border-accent-border z-10">
                ?
              </div>
            )}
          </>
        )}
        {/* Reply Content */}
        <div className="w-full flex flex-col gap-2 pr-4">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-semibold text-text-primary text-sm cursor-default hover:underline hover:text-accent-extra">
              {reply.name}
            </p>
            <p className="text-accent-icon text-sm">
              {formatRelativeDate(reply.createdAt)}
            </p>
            {reply.isAuthor && (
              <p className="text-xs px-2 py-[1px] rounded-full border border-accent-icon text-accent-icon">
                Author
              </p>
            )}
          </div>
          <div className="w-full pr-4 md:pr-8 ">
            <ReactMarkdown components={customComponents}>
              {reply.content}
            </ReactMarkdown>
          </div>
          <div className="flex gap-2 items-center flex-wrap">
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
      </div>
    </div>
  );
};

export default ReplyContainer;
