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
import { ReplyContainer, CodeBlock, CommentInput } from "@/components";

const emojis = ["👍", "👎", "😄", "🎉", "😕", "❤️", "🚀", "👀"];

const AUTHOR_NAME = process.env.NEXT_PUBLIC_AUTHOR_NAME;

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
    //const language = /language-(\w+)/.exec(className || "")?.[1] || "plaintext";
    return !inline ? (
      <CodeBlock code={String(children).trim()} lang="javascript" />
    ) : (
      <code className="px-1 py-[2px] bg-bg-secondary rounded-md text-text-primary">
        {children}
      </code>
    );
  },
};

const CommentContainer = ({ authorPicture, comment, replies, setReplies }) => {
  const [likes, setLikes] = useState(comment?.reactions?.likes || 0); // Separate state for likes
  const [reactions, setReactions] = useState(comment?.reactions || {});
  const [userReactions, setUserReactions] = useState({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Load user reactions from localStorage
    const storedReactions =
      JSON.parse(localStorage.getItem(`reactions-${comment.id}`)) || {};

    setUserReactions(storedReactions);

    const initialLikes = storedReactions.like
      ? (comment?.reactions?.likes || 0) + 1
      : comment?.reactions?.likes || 0;

    const initialReactions = { ...comment.reactions };
    emojis.forEach((emoji) => {
      if (!initialReactions[emoji]) {
        initialReactions[emoji] = 0; // Default to 0 if missing
      }
    });

    setReactions(initialReactions);

    setLikes(initialLikes);
  }, [comment.id, comment.reactions]);

  const updateReactionsInDB = async (newReactions) => {
    try {
      await fetch("/api/comments", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: comment.id,
          reactions: newReactions,
        }),
      });
    } catch (err) {
      console.error("Failed to update reactions in the database:", err);
    }
  };

  const handleLike = () => {
    const isLiked = !!userReactions.like; // Check if the user has already liked
    const updatedLikes = isLiked ? likes - 1 : likes + 1; // Toggle like count
    const updatedReactions = { ...reactions, likes: updatedLikes };
    const updatedUserReactions = { ...userReactions };

    if (isLiked) {
      delete updatedUserReactions.like; // Remove the like if already liked
    } else {
      updatedUserReactions.like = true; // Add the like if not liked yet
    }

    setLikes(updatedLikes);
    setReactions(updatedReactions);
    setUserReactions(updatedUserReactions);

    // Update in database and localStorage
    updateReactionsInDB(updatedReactions);
    localStorage.setItem(
      `reactions-${comment.id}`,
      JSON.stringify(updatedUserReactions)
    );
  };

  const handleEmojiReaction = (emoji) => {
    const currentCount = reactions[emoji] || 0; // Get current count
    const isUserReacted = !!userReactions[emoji]; // Check if the user reacted with this emoji
    const updatedReactions = { ...reactions };
    const updatedUserReactions = { ...userReactions };

    if (isUserReacted) {
      // If the user already reacted, decrement the count and remove the reaction
      updatedReactions[emoji] = currentCount > 0 ? currentCount - 1 : 0;
      delete updatedUserReactions[emoji];
    } else {
      // Otherwise, increment the count and add the reaction
      updatedReactions[emoji] = currentCount + 1;
      updatedUserReactions[emoji] = true;
    }

    setReactions(updatedReactions);
    setUserReactions(updatedUserReactions);

    // Update in database and localStorage
    updateReactionsInDB(updatedReactions);
    localStorage.setItem(
      `reactions-${comment.id}`,
      JSON.stringify(updatedUserReactions)
    );
  };

  const handleReplySubmit = async (replyContent) => {
    const isAuthor = replyContent.name === AUTHOR_NAME;

    const newReply = {
      name: isAuthor ? "Emanuele" : replyContent.name,
      avatar: replyContent.avatar,
      content: replyContent.content,
      parentId: comment.id, // This is the parent comment ID
      createdAt: new Date().toISOString(),
      reactions: {}, // Start with empty reactions
      isAuthor,
      isTopComment: false,
    };

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReply),
      });

      if (!response.ok) {
        toast.error("Failed to post your reply. Please try again later.");
        throw new Error("Failed to save the reply.");
      }

      setReplies((prevReplies) => [...prevReplies, newReply]);
      console.log("Reply saved successfully");
      toast.success("Your reply has been published!");
    } catch (error) {
      console.error("Error saving reply:", error);
      toast.error("Failed to post your reply. Please try again later.");
    }
  };

  return (
    <div className="w-full md:border max-md:border-b max-md:border-t max-md:bg-bg-mobile-primary border-accent-border md:rounded-md">
      <div className="w-full p-4 flex flex-col gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          {comment.avatar ? (
            <Image
              src={comment.isAuthor ? authorPicture : comment.avatar}
              alt="Profile_Picture"
              width={32}
              height={32}
              quality={100}
              className="w-[32px] h-[32px] rounded-full object-cover object-center border border-accent-border bg-like-bg-active"
            />
          ) : (
            <div className="w-[32px] h-[32px] rounded-full bg-bg-button flex items-center justify-center text-base font-semibold text-accent-icon border border-accent-border">
              ?
            </div>
          )}

          <p className="font-semibold text-text-primary text-sm cursor-default hover:underline hover:text-accent-extra">
            {comment.name}
          </p>
          <p className="text-accent-icon text-sm">
            {formatRelativeDate(comment.createdAt)}
          </p>
          {comment.isAuthor && (
            <p className="text-xs px-2 py-[1px] rounded-full border border-accent-icon text-accent-icon">
              Author
            </p>
          )}
        </div>
        <div className="w-full ">
          <ReactMarkdown components={customComponents}>
            {comment.content}
          </ReactMarkdown>
        </div>
        <div className="flex items-center justify-between flex-wrap gap-2">
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
          {/* show replies number */}
          <p className="text-xs text-accent-icon">
            {replies.length} {replies.length === 1 ? "reply" : "replies"}
          </p>
        </div>
      </div>
      {/* Replies */}
      {replies.length > 0 && (
        <div className="relative w-full pt-4 pr-0 pb-2 pl-2 md:pl-4 bg-bg-primary md:bg-bg-secondary border-t border-accent-border overflow-hidden">
          {/* Line */}
          <div className="w-px h-full bg-accent-icon absolute bottom-0 top-[30px] left-[23px] z-0" />
          {replies.map((reply, i) => (
            <ReplyContainer
              key={reply.id}
              reply={reply}
              emojis={emojis}
              updateReactionsInDB={updateReactionsInDB}
              authorPicture={authorPicture}
            />
          ))}
        </div>
      )}
      {/* Reply input container */}
      <div className="w-full center p-2 bg-bg-mobile-primary md:bg-bg-hover border-t border-accent-border rounded-b-md">
        <CommentInput
          placeholder="Write a reply"
          parentId={comment.id}
          onSubmit={handleReplySubmit}
          showToggle={true}
          isReply={true}
        />
      </div>
    </div>
  );
};

export default CommentContainer;
