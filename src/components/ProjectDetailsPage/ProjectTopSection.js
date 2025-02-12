"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getAssetUrl } from "@/utils/imageUtils";
import { usePathname } from "next/navigation";
import { LuClock } from "react-icons/lu";
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

const linkName = process.env.NEXT_PUBLIC_BASE_URL;

const ProjectTopSection = ({ project }) => {
  const { authorImage, projectTitle, smallDescription } = project;
  const pathname = usePathname();
  const postUrl = `${linkName}${pathname}`;
  const [showCopy, setShowCopy] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile("ontouchstart" in window || navigator.maxTouchPoints > 0);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

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
    <div className="relative w-full center max-[500px]:px-4 max-md:px-6 overflow-hidden max-md:bg-bg-mobile-primary max-md:border-b max-md:border-accent-border max-md:py-8">
      <div className="w-full max-w-[1216px] z-50">
        <Link
          href="/portfolio"
          className="flex items-center gap-2 poppins-medium text-accent-icon font-medium hover:text-text-link hover:underline"
        >
          <FiArrowLeftCircle size={20} /> Go Back
        </Link>
        <div className="w-full flex items-start md:items-center justify-start md:justify-between flex-wrap max-md:flex-col gap-4 md:border-b border-accent-border md:pb-4 mt-8">
          {/* Title and author image */}
          <div className="max-md:w-full center max-md:justify-start gap-2 flex-wrap max-md:border-b max-md:border-accent-border max-md:pb-6">
            <Image
              src={getAssetUrl(authorImage)}
              alt="Author_Image"
              width={32}
              height={32}
              priority
              quality={100}
              className="w-[32px] h-[32px] object-cover object-center rounded-full border border-accent-border"
            />
            <h1 className="text-xl font-bold">{projectTitle}</h1>
            <div className="max-md:hidden border border-accent-border rounded-full px-[5px] py-[3px]">
              <p className="text-[11.9px] font-semibold text-accent-icon leading-none">
                Public
              </p>
            </div>
          </div>
          {/* Share */}
          <div className="center max-md:justify-start gap-3 max-md:mt-2 flex-wrap">
            <p className="poppins-regular text-sm">Share:</p>
            <div className="center max-md:justify-start gap-3 flex-wrap">
              {/* Twitter / X */}
              <Link
                href={`https://x.com/intent/post?text=${encodeURIComponent(
                  `${projectTitle} - ${smallDescription}`
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
                  projectTitle
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
                  projectTitle
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
      </div>
    </div>
  );
};

export default ProjectTopSection;
