"use client";

import React, { useState } from "react";
import { getAssetUrl } from "@/utils/imageUtils";
import { GoDotFill } from "react-icons/go";
import { RiErrorWarningLine } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TopComment, CommentContainer, CommentInput } from "@/components";

const AUTHOR_NAME = process.env.NEXT_PUBLIC_AUTHOR_NAME;

const CommentsSection = ({
  generalInfoContent,
  topComment,
  normalComments,
}) => {
  // Retrieve image URLs from content
  const profilePictureUrl = generalInfoContent?.profilePicture
    ? getAssetUrl(generalInfoContent.profilePicture)
    : "";
  // states to get the right comment types
  const [comments, setComments] = useState(
    normalComments.filter((c) => !c.isTopComment && c.parentId === null) // top-level comments
  );
  const [replies, setReplies] = useState(
    normalComments.filter((c) => !c.isTopComment && c.parentId !== null) // replies
  );
  const [sortOrder, setSortOrder] = useState("newest"); // Default sorting

  // Function for handling sorting
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

  // Function to handle top-level comment submission to database
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
    <div className="max-w-[905px] flex flex-1 flex-col">
      {/* Display top comment */}
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
