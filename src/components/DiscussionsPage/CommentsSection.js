"use client";

import React, { useEffect, useState, useContext } from "react";
import { getAssetUrl } from "@/utils/imageUtils";
import Image from "next/image";
import { formatRelativeDate } from "@/utils/formatRelativeDate";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { FaArrowUp } from "react-icons/fa6";
import ReactMarkdown from "react-markdown";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { GoDotFill, GoBold, GoHeading, GoQuote, GoCode } from "react-icons/go";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FaBold,
  FaItalic,
  FaCode,
  FaHeading,
  FaQuoteRight,
  FaRegSmile,
  FaMarkdown,
} from "react-icons/fa";
import { RiErrorWarningLine } from "react-icons/ri";
import { MdFormatListBulleted, MdFormatListNumbered } from "react-icons/md";
import { FaListOl, FaListUl } from "react-icons/fa6";
import { FiItalic } from "react-icons/fi";
import { IoIosLink } from "react-icons/io";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  darcula,
  oneLight,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import ThemeContext from "@/context/ThemeProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const emojis = ["👍", "👎", "😄", "🎉", "😕", "❤️", "🚀", "👀"];
const DICEBEAR_BASE_URL = "https://api.dicebear.com/9.x";
const avatarStyles = [
  { value: "adventurer", label: "Adventurer" },
  { value: "avataaars", label: "Avataaars" },
  { value: "big-ears", label: "Big Ears" },
  { value: "big-smile", label: "Big Smile" },
  { value: "croodles", label: "Croodles" },
  { value: "identicon", label: "Identicon" },
  { value: "pixel-art", label: "Pixel Art" },
  { value: "bottts", label: "Bottts" },
  { value: "micah", label: "Micah" },
  { value: "personas", label: "Personas" },
];

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

const CommentsSection = ({
  generalInfoContent,
  topComment,
  normalComments,
}) => {
  // Retrieve image URLs from content
  const profilePictureUrl = generalInfoContent?.profilePicture
    ? getAssetUrl(generalInfoContent.profilePicture)
    : "";

  const [comments, setComments] = useState(
    normalComments.filter((c) => !c.isTopComment && c.parentId === null)
  );
  const [replies, setReplies] = useState(
    normalComments.filter((c) => !c.isTopComment && c.parentId !== null)
  );
  const [sortOrder, setSortOrder] = useState("newest"); // Default sorting

  const handleSortChange = (order) => {
    setSortOrder(order);

    const sortedComments = [...comments];
    if (order === "oldest") {
      sortedComments.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    } else if (order === "newest") {
      sortedComments.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    } else if (order === "top") {
      sortedComments.sort((a, b) => {
        const aReactions = Object.values(a.reactions || {}).reduce(
          (acc, val) => acc + val,
          0
        );
        const bReactions = Object.values(b.reactions || {}).reduce(
          (acc, val) => acc + val,
          0
        );
        return bReactions - aReactions;
      });
    }

    setComments(sortedComments);
  };

  // const handleCommentSubmit = async (newComment) => {
  //   const isAuthor = newComment.name === AUTHOR_NAME;

  //   const comment = {
  //     name: isAuthor ? "Emanuele" : newComment.name,
  //     avatar: newComment.avatar,
  //     content: newComment.content,
  //     parentId: null,
  //     createdAt: new Date().toISOString(),
  //     reactions: {},
  //     isAuthor,
  //     isTopComment: false,
  //   };

  //   try {
  //     const response = await fetch("/api/comments", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(comment),
  //     });

  //     if (!response.ok) {
  //       toast.error("Failed to post your comment. Please try again later.");
  //       throw new Error("Failed to save the comment.");
  //     }

  //     const savedComment = await response.json(); // Get the saved comment from the backend

  //     // Add the new comment to the state
  //     setComments((prevComments) => {
  //       const updatedComments = [...prevComments, savedComment];
  //       return updatedComments; // Return unsorted for now
  //     });

  //     toast.success("Your comment has been posted!");

  //     // Trigger sorting to apply the current sort order
  //     handleSortChange(sortOrder);

  //     // Auto-scroll to the newly added comment
  //     setTimeout(() => {
  //       const newCommentElement = document.getElementById(
  //         `comment-${savedComment.id}`
  //       );
  //       if (newCommentElement) {
  //         newCommentElement.scrollIntoView({
  //           behavior: "smooth",
  //           block: "start",
  //         });
  //       }
  //     }, 100); // Slight delay to ensure DOM is updated
  //   } catch (error) {
  //     console.error("Error saving comment:", error);
  //     toast.error("Failed to post your comment. Please try again later.");
  //   }
  // };

  const handleCommentSubmit = async (newComment) => {
    const isAuthor = newComment.name === AUTHOR_NAME;

    const comment = {
      name: isAuthor ? "Emanuele" : newComment.name,
      avatar: newComment.avatar,
      content: newComment.content,
      parentId: null,
      createdAt: new Date().toISOString(),
      reactions: {},
      isAuthor,
      isTopComment: false,
    };

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      });

      if (!response.ok) {
        toast.error("Failed to post your comment. Please try again later.");
        throw new Error("Failed to save the comment.");
      }

      const savedComment = await response.json(); // Get the saved comment from the backend

      setComments((prevComments) => [...prevComments, savedComment]);
      toast.success("Your comment has been posted!");
    } catch (error) {
      console.error("Error saving comment:", error);
      toast.error("Failed to post your comment. Please try again later.");
    }
  };

  return (
    <div className="flex flex-1 flex-col">
      <TopComment profilePicture={profilePictureUrl} topComment={topComment} />

      {/* Display comment count and sorting menu */}
      {comments.length > 0 ? (
        <div className="flex justify-between items-center my-4">
          {/* Comment and reply count */}
          <p className="center text-text-primary gap-1">
            <span className="font-semibold">
              {comments.filter((comment) => comment.parentId === null).length}{" "}
              Comment
              {comments.filter((comment) => comment.parentId === null)
                .length !== 1 && "s"}
            </span>{" "}
            <GoDotFill size={5} className="text-text-primary" />{" "}
            <span>
              {replies.length} Repl
              {replies.length !== 1 ? "ies" : "y"}
            </span>
          </p>

          {/* Sorting menu */}
          <div className="flex items-center bg-bg-button rounded-md">
            <button
              onClick={() => handleSortChange("oldest")}
              className={`group/item relative center px-3 py-[5px] text-sm text-text-primary rounded-md ${
                sortOrder === "oldest"
                  ? "font-bold bg-bg-secondary border border-accent-icon"
                  : ""
              }`}
            >
              Oldest
              {sortOrder === "top" && (
                <div className="absolute right-[-1px] h-[18px] w-px bg-accent-icon" />
              )}
            </button>
            <button
              onClick={() => handleSortChange("newest")}
              className={`center px-3 py-[5px] text-sm text-text-primary rounded-md  ${
                sortOrder === "newest"
                  ? "font-bold bg-bg-secondary border border-accent-icon"
                  : ""
              }`}
            >
              Newest
            </button>
            <button
              onClick={() => handleSortChange("top")}
              className={`relative center px-3 py-[5px] text-sm rounded-md  ${
                sortOrder === "top"
                  ? "font-bold bg-bg-secondary border border-accent-icon"
                  : ""
              }`}
            >
              Top
              {sortOrder === "oldest" && (
                <div className="absolute left-[-1px] h-[18px] w-px bg-accent-icon" />
              )}
            </button>
          </div>
        </div>
      ) : (
        <p className=" text-text-secondary text-center my-4">
          There are no comments in this discussion.
        </p>
      )}

      {comments.length > 0 && (
        <div className="flex flex-col gap-8">
          {comments.map((comment) => {
            const commentReplies = replies.filter(
              (reply) => reply.parentId === comment.id
            );

            return (
              <CommentContainer
                key={comment.id}
                id={`comment-${comment.id}`}
                authorPicture={profilePictureUrl}
                comment={comment}
                replies={commentReplies}
                setReplies={setReplies}
              />
            );
          })}
        </div>
      )}
      <div className="w-full flex flex-col mt-4">
        <div className="w-full h-[2px] bg-accent-border mb-4" />
        <h5 className="font-semibold">Add a comment</h5>
        {/* Normal comments input */}
        <div className="mt-4">
          <CommentInput
            placeholder=""
            parentId={null}
            onSubmit={handleCommentSubmit}
            showToggle={false}
            isReply={false}
          />
        </div>
        <div className="flex items-center gap-1 mt-4">
          <RiErrorWarningLine size={16} className="text-accent-icon" />
          <p className="text-sm text-text-secondary">
            Comments deemed inappropriate or disrespectful will be removed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommentsSection;

const TopComment = ({ profilePicture, topComment }) => {
  const [likes, setLikes] = useState(topComment?.reactions?.likes || 0); // Separate state for likes
  const [reactions, setReactions] = useState(topComment?.reactions || {});
  const [userReactions, setUserReactions] = useState({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Load user reactions from localStorage
    const storedReactions =
      JSON.parse(localStorage.getItem(`reactions-${topComment.id}`)) || {};
    setUserReactions(storedReactions);
  }, [topComment.id]);

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
    localStorage.setItem(
      `reactions-${topComment.id}`,
      JSON.stringify(updatedUserReactions)
    );
  };

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
    localStorage.setItem(
      `reactions-${topComment.id}`,
      JSON.stringify(updatedUserReactions)
    );
  };

  return (
    <div className="w-full p-4 flex flex-col gap-4 border border-accent-border rounded-md">
      <div className="flex items-center gap-2">
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
      <div>
        {/* Render markdown content */}
        <ReactMarkdown>{topComment?.content}</ReactMarkdown>
      </div>
      <div className="flex gap-2 items-center">
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
      createdAt: new Date().toISOString(), // Optional
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
    <div className="w-full border border-accent-border rounded-md">
      <div className="w-full p-4 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          {comment.avatar ? (
            <Image
              src={comment.avatar}
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
        </div>
        <div>
          <ReactMarkdown components={customComponents}>
            {comment.content}
          </ReactMarkdown>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
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
        <div className="relative w-full pt-4 pr-0 pb-2 pl-4 bg-bg-secondary border-t border-accent-border overflow-hidden">
          {/* Line */}
          <div className="w-px h-full bg-accent-icon absolute bottom-0 top-[30px] left-[30px] z-0" />
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
      {/* <div className="w-full center p-2 bg-bg-hover border-t border-accent-border rounded-b-md">
        <button className="w-full flex items-center justify-start bg-bg-primary rounded-md border border-accent-border py-1 px-2 text-sm text-accent-icon cursor-text">
          Write a reply
        </button>
      </div> */}
      <div className="w-full center p-2 bg-bg-hover border-t border-accent-border rounded-b-md">
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

const ReplyContainer = ({ reply, emojis, authorPicture }) => {
  const [reactions, setReactions] = useState(reply?.reactions || {});
  const [userReactions, setUserReactions] = useState({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
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
    localStorage.setItem(
      `reactions-${reply.id}`,
      JSON.stringify(updatedUserReactions)
    );
  };

  return (
    <div className="w-full pr-4 mt-1 mb-8 last:mb-4 z-10">
      <div className="flex gap-4 items-start">
        {/* Avatar */}
        {reply.isAuthor ? (
          <>
            <Image
              src={authorPicture}
              alt="Profile_Picture"
              width={32}
              height={32}
              quality={100}
              className="w-[30px] h-[30px] rounded-full object-cover object-center border border-accent-border bg-like-bg-active z-10"
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
                className="w-[30px] h-[30px] rounded-full object-cover object-center border border-accent-border bg-like-bg-active z-10"
              />
            ) : (
              <div className="w-[30px] h-[30px] rounded-full bg-bg-button flex items-center justify-center text-base font-semibold text-accent-icon border border-accent-border z-10">
                ?
              </div>
            )}
          </>
        )}
        {/* Reply Content */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
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
          <div>
            <ReactMarkdown components={customComponents}>
              {reply.content}
            </ReactMarkdown>
          </div>
          <div className="flex gap-2 items-center">
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

const CommentInput = ({
  placeholder,
  onSubmit,
  showToggle = true,
  isReply = false,
  parentId,
}) => {
  const [inputVisible, setInputVisible] = useState(!showToggle); // Default to visible for normal comments
  const [inputValue, setInputValue] = useState("");
  const [name, setName] = useState("");
  const [avatarType, setAvatarType] = useState("adventurer"); // State for avatar type
  const [activeTab, setActiveTab] = useState("write"); // "write" or "preview"

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    if (!name.trim() || !inputValue.trim()) {
      alert("Name and content cannot be empty.");
      return;
    }
    setInputVisible(!showToggle);
    const avatar = `${DICEBEAR_BASE_URL}/${avatarType}/svg?seed=${encodeURIComponent(
      name
    )}`;
    onSubmit({
      name,
      avatar,
      content: inputValue,
      parentId,
    });

    setInputValue("");
  };

  const addMarkdown = (symbol) => {
    const cursorPosition = inputValue.length;
    let markdownSnippet = "";
    switch (symbol) {
      case "bold":
        markdownSnippet = `**bold text**`;
        break;
      case "italic":
        markdownSnippet = `*italic text*`;
        break;
      case "header":
        markdownSnippet = `### `;
        break;
      case "blockquote":
        markdownSnippet = `> `;
        break;
      case "code":
        markdownSnippet = `\`\`\`code\`\`\``;
        break;
      case "ul":
        markdownSnippet = `- `;
        break;
      case "ol":
        markdownSnippet = `1. `;
        break;
      case "link":
        markdownSnippet = `[Link Text](https://example.com)`; // Markdown link
        break;
      default:
        break;
    }
    setInputValue(
      inputValue.slice(0, cursorPosition) +
        markdownSnippet +
        inputValue.slice(cursorPosition)
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default newline behavior

      const lines = inputValue.split("\n");
      const currentLine = lines[lines.length - 1]; // Get the last line

      let newLinePrefix = "";

      // Handle ordered lists
      const orderedMatch = currentLine.match(/^(\d+)\.\s/);
      if (orderedMatch) {
        const nextNumber = parseInt(orderedMatch[1], 10) + 1;
        newLinePrefix = `${nextNumber}. `;
      }

      // Handle unordered lists
      const unorderedMatch = currentLine.match(/^-\s/);
      if (unorderedMatch) {
        newLinePrefix = "- ";
      }

      // Add the new line prefix to the input
      setInputValue((prev) => `${prev}\n${newLinePrefix}`);
    }
  };

  return (
    <div className="w-full">
      {showToggle && !inputVisible ? (
        <button
          onClick={() => setInputVisible(true)}
          className="w-full flex items-center justify-start bg-bg-primary rounded-md border border-accent-border py-1 px-2 text-sm text-accent-icon cursor-text"
        >
          {placeholder}
        </button>
      ) : (
        <div className="flex flex-col gap-4">
          <ProfileAvatarSelector
            name={name}
            setName={setName}
            avatarType={avatarType}
            setAvatarType={setAvatarType}
          />
          {/* Input text container */}
          <div className="flex flex-col border border-accent-border rounded-md p bg-bg-primary">
            {/* Write or Preview tabs and markdown selection */}
            <div className="w-full flex justify-between items-center bg-bg-hover rounded-t-md border-b border-accent-border">
              <div className="flex gap-1 ">
                <button
                  onClick={() => setActiveTab("write")}
                  className={`px-4 py-2 text-sm ${
                    activeTab === "write"
                      ? "border-r border-r-accent-border text-text-primary rounded-t-md bg-bg-primary"
                      : "text-text-secondary"
                  }`}
                >
                  Write
                </button>
                <button
                  onClick={() => setActiveTab("preview")}
                  className={`px-4 py-2 text-sm ${
                    activeTab === "preview"
                      ? "border-l border-r border-accent-border text-text-primary rounded-t-md bg-bg-primary"
                      : "text-text-secondary"
                  }`}
                >
                  Preview
                </button>
              </div>
              {activeTab === "write" && (
                <div className="flex gap-6 items-center px-4">
                  <button onClick={() => addMarkdown("header")} title="Header">
                    <GoHeading size={18} className="text-accent-icon" />
                  </button>

                  <button onClick={() => addMarkdown("bold")} title="Bold">
                    <GoBold size={18} className="text-accent-icon" />
                  </button>

                  <button onClick={() => addMarkdown("italic")} title="Italic">
                    <FiItalic size={18} className="text-accent-icon" />
                  </button>

                  <button
                    onClick={() => addMarkdown("blockquote")}
                    title="Quote"
                  >
                    <GoQuote size={18} className="text-accent-icon" />
                  </button>

                  <button
                    onClick={() => addMarkdown("code")}
                    title="Code Block"
                  >
                    <GoCode size={18} className="text-accent-icon" />
                  </button>

                  <button onClick={() => addMarkdown("link")} title="Link">
                    <IoIosLink size={18} className="text-accent-icon" />
                  </button>

                  <div className="w-px h-[18px] bg-accent-border" />

                  <button
                    onClick={() => addMarkdown("ul")}
                    title="Unordered List"
                  >
                    <FaListUl size={18} className="text-accent-icon" />
                  </button>
                  <button
                    onClick={() => addMarkdown("ol")}
                    title="Ordered List"
                  >
                    <FaListOl size={18} className="text-accent-icon" />
                  </button>
                </div>
              )}
            </div>
            <div className="px-2 min-h-[140px]">
              {activeTab === "write" ? (
                <div className="flex flex-col">
                  <textarea
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    rows={6}
                    className="w-full min-h-[144px] mt-2 p-2 border border-accent-border rounded-md text-sm text-text-primary bg-bg-primary focus:outline-none focus:ring focus:ring-accent-icon"
                    placeholder={placeholder}
                  />
                  <a
                    href="https://www.markdowntutorial.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-fit flex items-center gap-1 text-xs font-semibold text-text-primary my-2 hover:bg-bg-button p-2 rounded-md"
                  >
                    <FaMarkdown size={16} className="text-accent-icon" />{" "}
                    Markdown is supported
                  </a>
                </div>
              ) : (
                <div className="w-full py-2 text-sm bg-bg-primary text-text-primary">
                  {/* <ReactMarkdown>
                    {inputValue || "Nothing to preview"}
                  </ReactMarkdown> */}
                  <ReactMarkdown components={customComponents}>
                    {inputValue || "Nothing to preview"}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            {showToggle && (
              <button
                onClick={() => setInputVisible(false)}
                className="btn-primary !text-text-primary !bg-bg-button !border !border-accent-border"
              >
                Cancel
              </button>
            )}
            <button
              onClick={handleSubmit}
              disabled={!name.trim() || !inputValue.trim()}
              className={`px-3 py-1 text-sm rounded-md ${
                !name.trim() || !inputValue.trim()
                  ? "btn-primary cursor-not-allowed !brightness-75 !text-[#ffffff93]"
                  : "btn-primary"
              }`}
            >
              {isReply ? "Reply" : "Comment"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const ProfileAvatarSelector = ({
  name,
  setName,
  avatarType,
  setAvatarType,
}) => {
  const avatarUrl = name
    ? `${DICEBEAR_BASE_URL}/${avatarType}/svg?seed=${encodeURIComponent(
        name
      )}&backgroundType=solid,gradientLinear&accessoriesProbability=50&facialHairProbability=50&mask[]&maskProbability=0&skinColor=edb98a,ffdbb4&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4`
    : null; // Show placeholder if name is empty

  return (
    <div className="flex items-start gap-4 ">
      {/* Profile Picture */}
      <div className="flex items-center justify-center w-[70px] h-[70px] rounded-full border border-accent-border bg-bg-hover">
        {name ? (
          <div className="relative w-[70px] h-[70px] flex items-center justify-center text-base font-semibold text-accent-icon overflow-hidden rounded-full">
            <Image
              src={avatarUrl}
              alt="Dynamic Avatar"
              width={70}
              height={70}
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-[70px] h-[70px] rounded-full bg-bg-button flex items-center justify-center text-base font-semibold text-accent-icon border border-accent-border z-10">
            ?
          </div>
        )}
      </div>

      {/* Name and Avatar Type */}
      <div className="flex gap-4 w-full">
        {/* Input Field for Name */}
        <div className="flex-1 flex flex-col">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-text-primary"
          >
            Your Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Type your name..."
            className="w-full p-2 border border-accent-border rounded-md text-sm text-text-primary bg-bg-primary focus:outline-none"
          />
        </div>

        {/* Dropdown for Avatar Type */}
        <div className="flex-1 flex flex-col">
          <label
            htmlFor="avatarType"
            className="block text-sm font-medium text-text-primary"
          >
            Avatar Style
          </label>
          <Select
            onValueChange={(value) => setAvatarType(value)}
            value={avatarType}
          >
            <SelectTrigger
              id="avatarType"
              className="w-full ring-0 focus:outline-none focus:ring-0 focus:ring-offset-0"
            >
              <SelectValue placeholder="Select an avatar style" />
            </SelectTrigger>
            <SelectContent>
              {avatarStyles.map((style) => (
                <SelectItem key={style.value} value={style.value}>
                  {style.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

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
