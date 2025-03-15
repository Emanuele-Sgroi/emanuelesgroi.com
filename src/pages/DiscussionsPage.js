"use client";

import React, { useState, useEffect } from "react";
import {
  Loading,
  ErrorMessage,
  DiscussionsHeader,
  CommentsSection,
  DiscussionSideBar,
  FixedBar,
} from "@/components";

/**
 * Discussions Page
 * Simulates user discussions with a comment section and a sidebar.
 */
const DiscussionsPage = ({ discussionContent, generalInfoContent, error }) => {
  // State for handling loading, errors, and comments
  const [loading, setLoading] = useState(true);
  const [dbError, setDbError] = useState(false);
  const [topComment, setTopComment] = useState(null);
  const [normalComments, setNormalComments] = useState([]);

  // Fetch comments from the database
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch("/api/comments");
        if (!response.ok) throw new Error("Failed to fetch comments");
        const comments = await response.json();

        // Find the top comment (The first comment at the top written by the author)
        const top = comments.find((comment) => comment.isTopComment);
        setTopComment(top);

        // Filter out normal (non-top) comments
        setNormalComments(comments);

        setDbError(false);
      } catch (err) {
        console.error("Error fetching comments:", err);
        setDbError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  // Show loading or error state
  if (!discussionContent || !generalInfoContent || loading) {
    return <Loading />;
  }
  if (error || dbError) {
    return <ErrorMessage />;
  }

  return (
    <>
      {/* Fixed top bar for scrolling up or down quickly */}
      <FixedBar
        discussionContent={discussionContent}
        generalInfoContent={generalInfoContent}
        comments={normalComments}
      />
      <section className="with-top_header max-md:gap-4">
        {/* Page Header */}
        <DiscussionsHeader discussionContent={discussionContent} />
        {/*  Main content with comments and sidebar */}
        <div className="with-side-bar">
          <CommentsSection
            generalInfoContent={generalInfoContent}
            topComment={topComment}
            normalComments={normalComments}
          />
          <DiscussionSideBar />
        </div>
      </section>
    </>
  );
};

export default DiscussionsPage;
