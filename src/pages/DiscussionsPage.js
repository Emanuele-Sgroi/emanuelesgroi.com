"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Loading, ErrorMessage } from "@/components";
import DiscussionsHeader from "@/components/DiscussionsPage/DiscussionsHeader";
import CommentsSection from "@/components/DiscussionsPage/CommentsSection";
import { useDiscussionContent } from "@/hooks/useDiscussionContent";
import { useGeneralInfoContent } from "@/hooks/useGeneralInfoContent";

const DiscussionsPage = () => {
  const { discussionContent, isDiscussionLoading, isDiscussionError } =
    useDiscussionContent();
  const { generalInfoContent, isGeneralInfoLoading, isGeneralInfoError } =
    useGeneralInfoContent();

  if (
    isGeneralInfoLoading ||
    isDiscussionLoading ||
    !discussionContent ||
    !generalInfoContent
  ) {
    return <Loading />;
  }

  if (isDiscussionError || isGeneralInfoError) {
    return <ErrorMessage />;
  }

  //   const [comments, setComments] = useState([]);
  //   const [newComment, setNewComment] = useState("");
  //   const [loading, setLoading] = useState(true);

  //   useEffect(() => {
  //     // Fetch top-level comments on load
  //     fetchComments();
  //   }, []);

  //   const fetchComments = async () => {
  //     try {
  //       const response = await axios.get("/api/comments?parentId=null");
  //       setComments(response.data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching comments:", error);
  //     }
  //   };

  //   const handleAddComment = async () => {
  //     if (!newComment.trim()) return; // Don't allow empty comments

  //     try {
  //       const response = await axios.post("/api/comments", {
  //         name: "Anonymous",
  //         avatar: `https://ui-avatars.com/api/?name=Anonymous&background=random`,
  //         content: newComment,
  //         parentId: null,
  //         reactions: {},
  //       });
  //       setComments([response.data, ...comments]); // Add the new comment to the top of the list
  //       setNewComment(""); // Clear the input field
  //     } catch (error) {
  //       console.error("Error adding comment:", error);
  //     }
  //   };

  return (
    <section className="with-top_header">
      <DiscussionsHeader discussionContent={discussionContent} />
      {/* Bottom part */}
      <div className="with-side-bar">
        <CommentsSection
          discussionContent={discussionContent}
          generalInfoContent={generalInfoContent}
        />
        <div className="w-[312px] h-[300px]">right</div>
      </div>
    </section>
  );
};

export default DiscussionsPage;

// {/* <div className="comments-section">
//       <h2>Comments</h2>

//       {/* Add New Comment */}
//       <div className="add-comment">
//         <textarea
//           value={newComment}
//           onChange={(e) => setNewComment(e.target.value)}
//           placeholder="Write a comment..."
//           rows="4"
//           className="textarea"
//         />
//         <button onClick={handleAddComment} className="btn-primary">
//           Post Comment
//         </button>
//       </div>

//       {/* Comments List */}
//       {loading ? (
//         <p>Loading comments...</p>
//       ) : (
//         comments.map((comment) => (
//           <div key={comment.id} className="comment">
//             <div className="comment-header">
//               <img
//                 src={comment.avatar}
//                 alt={`${comment.name}'s avatar`}
//                 className="avatar"
//               />
//               <div>
//                 <h3>{comment.name}</h3>
//                 <p>{new Date(comment.createdAt).toLocaleString()}</p>
//               </div>
//             </div>
//             <p>{comment.content}</p>
//             <div className="comment-footer">
//               <button className="btn-reaction">
//                 👍 {comment.reactions.likes || 0}
//               </button>
//               <button className="btn-reaction">
//                 😂 {comment.reactions.emoji1 || 0}
//               </button>
//               <button className="btn-reaction">
//                 ❤️ {comment.reactions.emoji2 || 0}
//               </button>
//             </div>
//           </div>
//         ))
//       )}
//     </div> */}
