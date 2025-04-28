"use client";

import React, { useState, useEffect } from "react";
import { getAssetUrl } from "@/utils/imageUtils";
import { GoDotFill } from "react-icons/go";
import { RiErrorWarningLine } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import { TopComment, CommentContainer, CommentInput } from "@/components";

/**
 * CommentsSection Component
 *
 * Displays the top comment, all normal comments, and allows users to add new comments.
 * Supports sorting comments by newest, oldest, or top-rated.
 *
 * Props:
 * - generalInfoContent: Contains general user information, including profile picture.
 * - topComment: The featured comment displayed at the top.
 * - normalComments: Array of all user comments.
 */

const CommentsSection = ({
  discussionContent,
  generalInfoContent,
  topComment,
  normalComments,
  t,
  language,
}) => {
  // Retrieve image URLs from content
  const profilePictureUrl = generalInfoContent?.profilePicture
    ? getAssetUrl(generalInfoContent.profilePicture)
    : "";
  // State to store top-level comments (comments that are not replies and not marked as top comments)
  const [comments, setComments] = useState(
    normalComments.filter((c) => !c.isTopComment && c.parentId === null)
  );
  // State to store replies (comments that have a parent ID)
  const [replies, setReplies] = useState(
    normalComments.filter((c) => !c.isTopComment && c.parentId !== null) // replies
  );
  // State to track sorting order (default is newest)
  const [sortOrder, setSortOrder] = useState("newest"); // Default sorting
  // State to store author's name
  const [authorName, setAuthorName] = useState("");

  // Fetch the author's name from environment variables
  useEffect(() => {
    setAuthorName(process.env.NEXT_PUBLIC_AUTHOR_NAME || "");
  }, []);

  /**
   * Handles sorting logic based on selected sort order.
   * Supports "oldest", "newest", and "top" (most reactions).
   */
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

  /**
   * Handles submission of new top-level comments to the database.
   */
  const handleCommentSubmit = async (newComment) => {
    const isAuthor = newComment.name === authorName;

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
        toast.error(t.submitFail);
        throw new Error("Failed to save the comment.");
      }

      const savedComment = await response.json(); // Get the saved comment from the backend

      setComments((prevComments) => [...prevComments, savedComment]);
      toast.success(t.submitSuccess);
    } catch (error) {
      console.error("Error saving comment:", error);
      toast.error(t.submitFail);
    }
  };

  return (
    <div className="w-full max-[915px]:max-w-full min-[916px]:max-w-[660px] lg:max-w-[750px] xl:max-w-[905px] flex flex-col">
      {/* Display top comment */}
      <TopComment
        discussionContent={discussionContent}
        profilePicture={profilePictureUrl}
        topComment={topComment}
        t={t}
        language={language}
      />

      {/* Display comment count and sorting menu */}
      {comments.length > 0 ? (
        <div className="flex justify-between items-center flex-wrap my-4 max-md:px-4 gap-2">
          {/* Comment and reply count */}
          <p className="center text-text-primary gap-1 flex-wrap">
            <span className="font-semibold">
              {comments.filter((comment) => comment.parentId === null).length}{" "}
              {comments.filter((comment) => comment.parentId === null)
                .length !== 1
                ? t.comments
                : t.comment}
            </span>{" "}
            <GoDotFill size={5} className="text-text-primary" />{" "}
            <span>
              {replies.length} {replies.length !== 1 ? t.replies : t.reply}
            </span>
          </p>

          {/* Sorting menu */}
          <div className="flex items-center bg-bg-button rounded-md flex-wrap">
            <button
              onClick={() => handleSortChange("oldest")}
              className={`group/item relative center px-3 py-[5px] text-sm text-text-primary rounded-md ${
                sortOrder === "oldest"
                  ? "font-bold bg-bg-secondary border border-accent-icon"
                  : ""
              }`}
            >
              {t.oldest}
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
              {t.newest}
            </button>
            <button
              onClick={() => handleSortChange("top")}
              className={`relative center px-3 py-[5px] text-sm rounded-md  ${
                sortOrder === "top"
                  ? "font-bold bg-bg-secondary border border-accent-icon"
                  : ""
              }`}
            >
              {t.popular}
              {sortOrder === "oldest" && (
                <div className="absolute left-[-1px] h-[18px] w-px bg-accent-icon" />
              )}
            </button>
          </div>
        </div>
      ) : (
        <p className=" text-text-secondary text-center my-4">{t.noComments}</p>
      )}

      {comments.length > 0 && (
        <div className="w-full flex flex-col gap-4 md:gap-8">
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
                t={t}
              />
            );
          })}
        </div>
      )}
      <div className="w-full flex flex-col mt-6 md:mt-4">
        <div className="max-md:hidden w-full h-[2px] bg-accent-border mb-4" />
        <h5 className="font-semibold max-md:px-4">{t.add}</h5>
        {/* Normal comments input */}
        <div className="mt-4 max-md:p-2 max-md:bg-bg-mobile-primary max-md:border-b max-md:border-t border-accent-border">
          <CommentInput
            placeholder=""
            parentId={null}
            onSubmit={handleCommentSubmit}
            showToggle={false}
            isReply={false}
            t={t}
          />
        </div>
        <div className="flex items-center gap-1 mt-4 max-md:px-4 flex-wrap">
          <RiErrorWarningLine size={16} className="text-accent-icon" />
          <p className="text-sm text-text-secondary">{t.warning}</p>
        </div>
      </div>
    </div>
  );
};

export default CommentsSection;
