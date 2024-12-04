"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getAssetUrl } from "@/utils/imageUtils";
import { GrLocation } from "react-icons/gr";
import { TfiEmail } from "react-icons/tfi";
import { IoLogoGithub, IoMdDownload } from "react-icons/io";
import { FaLinkedin, FaInstagram, FaFacebook, FaDiscord } from "react-icons/fa";
import { IoCopy } from "react-icons/io5";
import { CgFileDocument } from "react-icons/cg";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfileBar = ({ generalInfo }) => {
  const [showCopy, setShowCopy] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Retrieve image URLs from content
  const profilePirctureUrl = generalInfo?.profilePicture
    ? getAssetUrl(generalInfo.profilePicture)
    : "";

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

  const copyText = (text) => {
    let copiedText = `${text}`;

    navigator.clipboard
      .writeText(copiedText)
      .then(() => {
        toast("Copied to clipboard.");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div className="w-full md:w-[256px] min-[1010px]:w-[296px] flex flex-row md:flex-col items-center md:items-start max-md:p-6 max-sm:gap-4 max-md:gap-6 max-md:bg-bg-mobile-primary max-md:border-b max-md:border-accent-border max-md:shadow-sm">
      <div className="w-[80px] min-[375px]:w-[99px] sm:w-[122px] md:w-[256px] min-[1010px]:w-[296px] h-[80px] min-[375px]:h-[99px] sm:h-[122px] md:h-[256px] min-[1010px]:h-[296px]  relative border-2 border-accent-border rounded-full">
        <Image
          src={profilePirctureUrl}
          alt="Profile_Picture"
          width={680}
          height={510}
          className="w-full h-full rounded-full object-cover object-center z-10"
        />
        {/* "Status" that expands outward to the right while anchored to the right side */}
        <div className="max-md:hidden group/item w-[38px] hover:w-auto h-[38px] bg-bg-primary border border-accent-border rounded-full flex items-center justify-start p-2 absolute left-[83%] bottom-6 z-20 overflow-hidden transform origin-right">
          <p className="text-sm leading-none cursor-default">
            {generalInfo?.emoji}
          </p>
          <p className="group-hover/item:opacity-100 opacity-0 text-sm leading-none cursor-default ml-1 whitespace-nowrap">
            {generalInfo?.status}
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-start items-start md:mt-4">
        <h3 className="max-[375px]:text-[22px]">{generalInfo?.name}</h3>
        <p className="text-xl text-text-secondary">{generalInfo?.job}</p>
      </div>

      <p className="max-md:hidden mt-4">{generalInfo?.sentence}</p>
      <div className="max-md:hidden w-full h-px my-4 bg-accent-border" />
      <div className="max-md:hidden flex items-center gap-2">
        <GrLocation size={18} className="text-accent-icon" />
        <p className="text-sm">{generalInfo?.location}</p>
      </div>
      <div className="max-md:hidden flex items-center gap-2 mt-2">
        <TfiEmail size={18} className="text-accent-icon" />
        <a
          href={`mailto:${generalInfo?.email}`}
          target="_blank"
          className="text-text-primary hover:text-text-link hover:underline"
        >
          {generalInfo?.email}
        </a>
      </div>
      <div className="max-md:hidden mt-4 flex flex-col items-start gap-2">
        <div className="flex items-center gap-2">
          <IoLogoGithub size={18} className="text-accent-icon" />
          <a
            href={`${generalInfo?.gitHubLink}`}
            target="_blank"
            className="text-text-primary hover:text-text-link hover:underline"
          >
            {generalInfo?.gitHubDisplayName}
          </a>
        </div>
        <div className="flex items-center gap-2">
          <FaLinkedin size={18} className="text-accent-icon" />
          <a
            href={`${generalInfo?.linkedInLink}`}
            target="_blank"
            className="text-text-primary hover:text-text-link hover:underline"
          >
            {generalInfo?.linkedInDisplayName}
          </a>
        </div>
        <div className="flex items-center gap-2">
          <FaInstagram size={18} className="text-accent-icon" />
          <a
            href={`${generalInfo?.instagramLink}`}
            target="_blank"
            className="text-text-primary hover:text-text-link hover:underline"
          >
            {generalInfo?.instagramDisplayName}
          </a>
        </div>
        <div className="flex items-center gap-2">
          <FaFacebook size={18} className="text-accent-icon" />
          <a
            href={`${generalInfo?.facebookLink}`}
            target="_blank"
            className="text-text-primary hover:text-text-link hover:underline"
          >
            {generalInfo?.facebookDisplayName}
          </a>
        </div>
        <div className="flex items-center gap-2">
          <FaDiscord size={18} className="text-accent-icon" />
          <p className="text-text-primary">{generalInfo?.discordDisplayName}</p>
          <button
            onClick={() => copyText(generalInfo?.discordDisplayName)}
            className="md:hidden"
          >
            <IoCopy size={18} className="text-text-primary" />
          </button>
          <Popover open={showCopy} onOpenChange={setShowCopy}>
            <PopoverTrigger
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              aria-expanded={showCopy}
              className="max-md:hidden outline-none center"
              onClick={() => copyText(generalInfo?.discordDisplayName)}
            >
              <IoCopy size={18} className="text-text-primary" />
            </PopoverTrigger>
            <PopoverContent
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="max-md:hidden w-fit p-1 bg-bg-button border-accent-border text-xs"
            >
              Copy
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="max-md:hidden mt-4 flex flex-col items-start gap-2">
        <div className="flex items-center gap-2">
          <CgFileDocument size={18} className="text-accent-icon" />
          <a
            href={`${getAssetUrl(generalInfo?.resume)}`}
            target="_blank"
            rel="noopener noreferrer"
            download="Emanuele-Sgroi-Resume.pdf"
            className="text-text-primary hover:text-text-link hover:underline center gap-2"
          >
            Resume
            <IoMdDownload size={18} className="text-text-primary" />
          </a>
        </div>
      </div>

      <div className="max-md:hidden w-full h-px my-4 bg-accent-border" />
      <p className="max-md:hidden text-sm text-accent-extra">
        One day, I&apos;ll keep adding features to make this site look even more
        GitHub-like. For now, enjoy it just as it is! 😄🚀✨
      </p>
    </div>
  );
};

export default ProfileBar;
