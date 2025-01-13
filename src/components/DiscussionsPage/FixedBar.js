"use client";

import React, { useState, useEffect } from "react";
import { getAssetUrl } from "@/utils/imageUtils";
import Image from "next/image";
import { formatRelativeDate } from "@/utils/formatRelativeDate";
import { GoDotFill } from "react-icons/go";
import { IoCaretUp, IoCaretDown } from "react-icons/io5";

const FixedBar = ({ discussionContent, comments, generalInfoContent }) => {
  // Retrieve image URLs from content
  const profilePictureUrl = generalInfoContent?.profilePicture
    ? getAssetUrl(generalInfoContent?.profilePicture)
    : "";

  //destructure content from discussion
  const { title, myName, startedConversationText, category } =
    discussionContent;
  const date = new Date();
  const discussionNumber = `#${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}${String(date.getDate()).padStart(2, "0")}`;

  const [isVisible, setIsVisible] = useState(false);

  // Find the top comment
  const topComment = comments.find((comment) => comment.isTopComment);
  // find replies
  const [replies, setReplies] = useState(
    comments.filter((c) => !c.isTopComment && c.parentId !== null)
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 250;
      setIsVisible(window.scrollY > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full center bg-bg-primary border-b border-accent-border py-4 px-4 md:px-8 transition-transform duration-300 z-[99999] ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Container */}
      <div className="w-full max-w-[1216px] flex items-center justify-between">
        {/* Left content */}
        <div className="max-[170px]:hidden flex flex-col items-start gap-1">
          <h5 className="max-[388px]:hidden max-[440px]:text-xs text-sm font-bold text-text-primary">
            {title}{" "}
            <span className="font-light text-accent-icon">
              {discussionNumber}
            </span>
          </h5>
          <h5 className="max-[250px]:hidden min-[389px]:hidden max-[440px]:text-xs text-sm font-bold text-text-primary">
            {title.substring(0, 19)}...{" "}
            <span className="font-light text-accent-icon">
              {discussionNumber}
            </span>
          </h5>
          <h5 className="min-[251px]:hidden max-[440px]:text-xs text-sm font-bold text-text-primary">
            {title.substring(0, 10)}...{" "}
            <span className="max-[200px]:hidden font-light text-accent-icon">
              {discussionNumber}
            </span>
          </h5>
          <div className="center">
            {generalInfoContent && generalInfoContent.profilePicture ? (
              <Image
                src={profilePictureUrl}
                alt="Profile_Picture"
                width={24}
                height={24}
                quality={100}
                className="max-[200px]:hidden w-[22px] h-[22px] sm:w-[24px] sm:h-[24px] rounded-full object-cover object-center border border-accent-border"
              />
            ) : (
              <div className="max-[200px]:hidden w-[22px] h-[22px] sm:w-[24px] sm:h-[24px] rounded-full bg-bg-button flex items-center justify-center text-sm font-semibold text-accent-icon border border-accent-border">
                ?
              </div>
            )}
            <p className="max-[595px]:hidden text-xs text-text-primary font-bold ml-1">
              {myName}
            </p>
            <p className="text-accent-icon text-xs center gap-[6px] max-[388px]:gap-3px min-[201px]:ml-2">
              <span className="max-[250px]:hidden">
                {formatRelativeDate(topComment.createdAt)}
              </span>
              <GoDotFill
                size={3}
                className="text-accent-icon max-[388px]:hidden"
              />
              <span className="max-[388px]:hidden">
                {comments.filter((comment) => comment.parentId === null).length}{" "}
                Comment
                {comments.filter((comment) => comment.parentId === null)
                  .length !== 1 && "s"}
              </span>
              <span className="min-[389px]:hidden">
                {comments.filter((comment) => comment.parentId === null).length}{" "}
                Com.
              </span>
              <GoDotFill
                size={3}
                className="text-accent-icon max-[388px]:hidden"
              />
              <span className="max-[388px]:hidden">
                {replies.length} Repl
                {replies.length !== 1 ? "ies" : "y"}
              </span>
              <span className="min-[389px]:hidden">{replies.length} Rep.</span>
            </p>
          </div>
        </div>
        {/* Right Content */}
        <div className="flex gap-4 max-[170px]:w-full max-[170px]:justify-between">
          <button
            onClick={scrollToBottom}
            className="center gap-1 text-xs text-accent-icon hover:underline"
          >
            <span className="max-[595px]:hidden">Go to</span>{" "}
            <span className="max-[302px]:hidden">Bottom</span>{" "}
            <IoCaretDown className="max-[302px]:text-xl" />
          </button>
          <button
            onClick={scrollToTop}
            className="center gap-1 text-xs text-accent-icon hover:underline"
          >
            <span className="max-[595px]:hidden">Return to</span>{" "}
            <span className="max-[302px]:hidden">Top</span>
            <IoCaretUp className="max-[302px]:text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FixedBar;
