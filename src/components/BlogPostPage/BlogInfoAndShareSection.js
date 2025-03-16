"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { LuClock } from "react-icons/lu";
import { FaWhatsapp, FaLinkedin, FaFacebook } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { IoCopy } from "react-icons/io5";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "react-toastify";
import { useIsMobile } from "@/hooks/useIsMobile";

const linkName = process.env.NEXT_PUBLIC_BASE_URL;

/**
 * BlogInfoAndShareSection Component
 *
 * Displays blog metadata (author, date, reading time) and share buttons for social media.
 * - Generates a shareable post URL.
 * - Provides social media share links (Twitter/X, WhatsApp, Facebook, LinkedIn).
 * - Includes a copy-to-clipboard button with a tooltip.
 */

const BlogInfoAndShareSection = ({ blogPost }) => {
  const { author, datePosted, timeReading, postTitle, smallDescription } =
    blogPost;

  const pathname = usePathname();
  const postUrl = `${linkName}${pathname}`;
  const [showCopy, setShowCopy] = useState(false);
  const isMobile = useIsMobile();

  // Show tooltip only on desktop
  const handleMouseEnter = () => {
    if (!isMobile) {
      setShowCopy(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setShowCopy(false);
    }
  };

  // Copies post URL to clipboard
  const copyLink = () => {
    navigator.clipboard
      .writeText(postUrl)
      .then(() => {
        toast("Link Copied");
      })
      .catch((err) => {
        alert("Failed to copy. Sorry!");
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div className="w-full center pt-6 max-[500px]:px-4 px-6 ">
      <div className="w-full max-w-[1020px]">
        {/* Blog Author & Metadata */}
        <div className="w-full flex justify-start md:justify-between items-start md:items-center max-md:flex-col gap-6 md:gap-4">
          <div className="flex flex-col items-start gap-2">
            <h6 className="poppins-semibold">{author}</h6>
            <div className="flex items-start sm:items-center max-sm:flex-col gap-3 text-text-secondary poppins-regular text-sm">
              <span>
                {new Date(datePosted).toLocaleDateString("en-US", {
                  month: "long",
                  day: "2-digit",
                  year: "numeric",
                })}
              </span>
              <span className="max-sm:hidden">|</span>
              <span className="flex items-center gap-2">
                <LuClock />
                {timeReading}
              </span>
            </div>
          </div>
          {/* Social Share Section */}
          <div className="center max-[430px]:flex-col max-[430px]:items-start  gap-3">
            <p className="poppins-regular text-sm">Share:</p>
            <div className="center gap-3 max-[430px]:flex-wrap max-[430px]:justify-start">
              {/* Twitter / X */}
              <Link
                href={`https://x.com/intent/post?text=${encodeURIComponent(
                  `${postTitle} - ${smallDescription}`
                )}&url=${encodeURIComponent(postUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-accent-border text-accent-icon hover:text-text-link p-2"
              >
                <RiTwitterXLine size={15} />
              </Link>

              {/* WhatsApp */}
              <Link
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                  postUrl
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-accent-border text-accent-icon hover:text-text-link p-2"
              >
                <FaWhatsapp size={15} />
              </Link>

              {/* Facebook */}
              <Link
                href={`https://www.facebook.com/sharer/sharer.php?t=${encodeURIComponent(
                  postTitle
                )}&u=${encodeURIComponent(postUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-accent-border text-accent-icon hover:text-text-link p-2"
              >
                <FaFacebook size={15} />
              </Link>

              {/* LinkedIn */}
              <Link
                href={`https://www.linkedin.com/shareArticle/?title=${encodeURIComponent(
                  postTitle
                )}&url=${encodeURIComponent(postUrl)}%2F`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-accent-border text-accent-icon hover:text-text-link p-2"
              >
                <FaLinkedin size={15} />
              </Link>

              {/* Copy Link  */}
              <button
                onClick={copyLink}
                className="md:hidden rounded-full border border-accent-border text-accent-icon hover:text-text-primary p-2"
              >
                <IoCopy size={15} />
              </button>
              <Popover open={showCopy} onOpenChange={setShowCopy}>
                <PopoverTrigger
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  aria-expanded={showCopy}
                  className="max-md:hidden rounded-full border border-accent-border text-accent-icon hover:text-text-primary p-2"
                  onClick={copyLink}
                >
                  <IoCopy size={15} />
                </PopoverTrigger>
                <PopoverContent
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="max-md:hidden w-fit p-1 bg-bg-button border-accent-border text-xs"
                >
                  Copy link
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
        <div className="w-full h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mt-6"></div>
      </div>
    </div>
  );
};

export default BlogInfoAndShareSection;
