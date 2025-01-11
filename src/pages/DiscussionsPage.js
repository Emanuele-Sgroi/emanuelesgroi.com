"use client";

import React, { useState, useEffect } from "react";
import {
  Loading,
  ErrorMessage,
  DiscussionsHeader,
  CommentsSection,
  DiscussionSideBar,
} from "@/components";
import { useDiscussionContent } from "@/hooks/useDiscussionContent";
import { useGeneralInfoContent } from "@/hooks/useGeneralInfoContent";

const DiscussionsPage = () => {
  // get data from CMS
  const { discussionContent, isDiscussionLoading, isDiscussionError } =
    useDiscussionContent();
  const { generalInfoContent, isGeneralInfoLoading, isGeneralInfoError } =
    useGeneralInfoContent();
  // states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [topComment, setTopComment] = useState(null);
  const [normalComments, setNormalComments] = useState([]);

  // Fetch comments from database
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch("/api/comments");
        if (!response.ok) throw new Error("Failed to fetch comments");
        const comments = await response.json();

        // Find the top comment
        const top = comments.find((comment) => comment.isTopComment);
        setTopComment(top);

        const normal = comments.filter(
          (comment) => !comment.isTopComment && comment.parentId === null
        );
        setNormalComments(comments);

        // console.log("Top Comment:", top);
        // console.log("Normal Comments:", comments);

        setError(false);
      } catch (err) {
        console.error("Error fetching comments:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  // show error or loading
  if (
    isGeneralInfoLoading ||
    isDiscussionLoading ||
    !discussionContent ||
    !generalInfoContent ||
    loading
  ) {
    return <Loading />;
  }

  if (isDiscussionError || isGeneralInfoError || error) {
    return <ErrorMessage />;
  }

  return (
    <section className="with-top_header">
      <DiscussionsHeader discussionContent={discussionContent} />
      {/* Bottom part */}
      <div className="with-side-bar">
        <CommentsSection
          generalInfoContent={generalInfoContent}
          topComment={topComment}
          normalComments={normalComments}
        />
        <DiscussionSideBar />
      </div>
    </section>
  );
};

export default DiscussionsPage;
