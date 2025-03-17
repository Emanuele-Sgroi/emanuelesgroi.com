"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getAssetUrl } from "@/utils/imageUtils";
import { usePathname } from "next/navigation";
import { FaWhatsapp, FaLinkedin, FaFacebook } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { FiArrowLeftCircle } from "react-icons/fi";
import { IoCopy } from "react-icons/io5";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ToastContainer, toast } from "react-toastify";
import { useIsMobile } from "@/hooks/useIsMobile";

const linkName = process.env.NEXT_PUBLIC_BASE_URL;

/**
 * ProjectTopSection Component
 *
 * Displays the top section of the project details page, including:
 * - Project title, author image, and a brief description.
 * - A "Go Back" button to navigate back to the portfolio page.
 * - Social media sharing options for Twitter/X, WhatsApp, Facebook, and LinkedIn.
 * - A "Copy Link" button to copy the project URL to the clipboard.
 *
 * Features:
 * - Dynamically generates a shareable link based on the current URL.
 * - Uses state to control the visibility of the "Copy Link" tooltip.
 * - Ensures a mobile-friendly and responsive design.
 * - Disables transitions when rendering server-side for improved SSR performance.
 *
 * Props:
 * - project: Object containing details such as the project title, author image, and description.
 * - isClient: Boolean indicating whether the component is rendered on the client side.
 */

const ProjectTopSection = ({ project, isClient }) => {
  const { authorImage, projectTitle, smallDescription } = project;
  const pathname = usePathname();
  const postUrl = `${linkName}${pathname}`;
  const [showCopy, setShowCopy] = useState(false);
  const isMobile = useIsMobile();

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
    <div
      className={`relative w-full center max-[500px]:px-4 max-md:px-6 overflow-hidden max-md:bg-bg-mobile-primary max-md:border-b max-md:border-accent-border max-md:py-8 ${
        isClient ? "" : "disable-transitions"
      }`}
    >
      <div
        className={`w-full max-w-[1216px] z-50 ${
          isClient ? "" : "disable-transitions"
        }`}
      >
        {isClient && (
          <Link
            href="/portfolio"
            className={`flex w-fit items-center gap-2 poppins-medium font-medium group/edit ${
              isClient ? "" : "disable-transitions"
            }`}
          >
            <FiArrowLeftCircle
              size={20}
              className={` text-accent-icon group-hover/edit:text-text-link ${
                isClient ? "" : "disable-transitions"
              }`}
            />
            <span
              className={`text-accent-icon group-hover/edit:text-text-link group-hover/edit:underline ${
                isClient ? "" : "disable-transitions"
              }`}
            >
              Go Back
            </span>
          </Link>
        )}
        <div
          className={`w-full flex items-start md:items-center justify-start md:justify-between flex-wrap max-md:flex-col gap-4 md:border-b border-accent-border md:pb-4 mt-8 ${
            isClient ? "" : "disable-transitions"
          }`}
        >
          {/* Title and author image */}
          <div
            className={`max-md:w-full center max-md:justify-start gap-2 flex-wrap max-md:border-b max-md:border-accent-border max-md:pb-6 ${
              isClient ? "" : "disable-transitions"
            }`}
          >
            <Image
              src={getAssetUrl(authorImage)}
              alt="Author_Image"
              width={32}
              height={32}
              priority
              quality={100}
              className={`w-[32px] h-[32px] object-cover object-center rounded-full border border-accent-border ${
                isClient ? "" : "disable-transitions"
              }`}
            />
            <h1
              className={`text-xl font-bold ${
                isClient ? "" : "disable-transitions"
              }`}
            >
              {projectTitle}
            </h1>
            <div
              className={`max-md:hidden border border-accent-border rounded-full px-[5px] py-[3px] ${
                isClient ? "" : "disable-transitions"
              }`}
            >
              <p
                className={`text-[11.9px] font-semibold text-accent-icon leading-none ${
                  isClient ? "" : "disable-transitions"
                }`}
              >
                Public
              </p>
            </div>
          </div>
          {/* Share */}
          {isClient && (
            <div
              className={`center max-md:justify-start gap-3 max-md:mt-2 flex-wrap ${
                isClient ? "" : "disable-transitions"
              }`}
            >
              <p
                className={`poppins-regular text-sm ${
                  isClient ? "" : "disable-transitions"
                }`}
              >
                Share:
              </p>
              <div
                className={` center max-md:justify-start gap-3 flex-wrap ${
                  isClient ? "" : "disable-transitions"
                }`}
              >
                {/* Twitter / X */}
                <Link
                  href={`https://x.com/intent/post?text=${encodeURIComponent(
                    `${projectTitle} - ${smallDescription}`
                  )}&url=${encodeURIComponent(postUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`rounded-full border border-accent-border text-accent-icon hover:text-text-link p-2 ${
                    isClient ? "" : "disable-transitions"
                  }`}
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
                  className={`rounded-full border border-accent-border text-accent-icon hover:text-text-link p-2 ${
                    isClient ? "" : "disable-transitions"
                  }`}
                >
                  <FaWhatsapp size={15} />
                </Link>

                {/* Facebook */}
                <Link
                  href={`https://www.facebook.com/sharer/sharer.php?t=${encodeURIComponent(
                    projectTitle
                  )}&u=${encodeURIComponent(postUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`rounded-full border border-accent-border text-accent-icon hover:text-text-link p-2 ${
                    isClient ? "" : "disable-transitions"
                  }`}
                >
                  <FaFacebook size={15} />
                </Link>

                {/* LinkedIn */}
                <Link
                  href={`https://www.linkedin.com/shareArticle/?title=${encodeURIComponent(
                    projectTitle
                  )}&url=${encodeURIComponent(postUrl)}%2F`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`rounded-full border border-accent-border text-accent-icon hover:text-text-link p-2 ${
                    isClient ? "" : "disable-transitions"
                  }`}
                >
                  <FaLinkedin size={15} />
                </Link>

                {/* Copy Link  */}
                <button
                  onClick={copyLink}
                  className={`md:hidden rounded-full border border-accent-border text-accent-icon hover:text-text-primary p-2 ${
                    isClient ? "" : "disable-transitions"
                  }`}
                >
                  <IoCopy size={15} />
                </button>
                <Popover open={showCopy} onOpenChange={setShowCopy}>
                  <PopoverTrigger
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    aria-expanded={showCopy}
                    className={`max-md:hidden rounded-full border border-accent-border text-accent-icon hover:text-text-primary p-2 ${
                      isClient ? "" : "disable-transitions"
                    }`}
                    onClick={copyLink}
                  >
                    <IoCopy size={15} />
                  </PopoverTrigger>
                  <PopoverContent
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className={`max-md:hidden w-fit p-1 bg-bg-button border-accent-border text-xs ${
                      isClient ? "" : "disable-transitions"
                    }`}
                  >
                    Copy link
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectTopSection;
