// ProfileBar.js

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getAssetUrl } from "@/utils/imageUtils";
import { GrLocation } from "react-icons/gr";
import { TfiEmail } from "react-icons/tfi";
import { IoLogoGithub } from "react-icons/io";
import { FaLinkedin, FaInstagram, FaFacebook, FaDiscord } from "react-icons/fa";
import { IoCopy } from "react-icons/io5";
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
    <div className="w-[256px] min-[1010px]:w-[296px] flex flex-col items-start">
      <div className="w-[256px] min-[1010px]:w-[296px] h-[256px] min-[1010px]:h-[296px]  relative border-2 border-light-accent-border dark:border-dark-accent-border rounded-full">
        <Image
          src={profilePirctureUrl}
          alt="Profile_Picture"
          width={680}
          height={510}
          className="w-full h-full rounded-full object-cover object-center z-10"
        />
        {/* "Status" that expands outward to the right while anchored to the right side */}
        <div className="group/item w-[38px] hover:w-auto h-[38px] bg-light-bg-primary dark:bg-dark-bg-primary border border-light-accent-border dark:border-dark-accent-border rounded-full flex items-center justify-start p-2 absolute left-[83%] bottom-6 z-20 overflow-hidden transform origin-right">
          <p className="text-sm leading-none cursor-default">
            {generalInfo?.emoji}
          </p>
          <p className="group-hover/item:opacity-100 opacity-0 text-sm leading-none cursor-default ml-1 whitespace-nowrap">
            {generalInfo?.status}
          </p>
        </div>
      </div>
      <h3 className="mt-4">{generalInfo?.name}</h3>
      <p className="text-xl text-light-text-secondary dark:text-dark-text-secondary">
        {generalInfo?.job}
      </p>
      <p className=" mt-4">{generalInfo?.sentence}</p>
      <div className="w-full h-px my-4 bg-light-accent-border dark:bg-dark-accent-border" />
      <div className="flex items-center gap-2">
        <GrLocation
          size={18}
          className="text-light-accent-icon dark:text-dark-accent-icon"
        />
        <p className="text-sm">{generalInfo?.location}</p>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <TfiEmail
          size={18}
          className="text-light-accent-icon dark:text-dark-accent-icon"
        />
        <a
          href={`mailto:${generalInfo?.email}`}
          target="_blank"
          className="text-light-text-primary dark:text-dark-text-primary hover:text-light-text-link hover:dark:text-light-text-link hover:underline"
        >
          {generalInfo?.email}
        </a>
      </div>
      <div className="mt-4 flex flex-col items-start gap-2">
        <div className="flex items-center gap-2">
          <IoLogoGithub
            size={18}
            className="text-light-accent-icon dark:text-dark-accent-icon"
          />
          <a
            href={`${generalInfo?.gitHubLink}`}
            target="_blank"
            className="text-light-text-primary dark:text-dark-text-primary hover:text-light-text-link hover:dark:text-light-text-link hover:underline"
          >
            {generalInfo?.gitHubDisplayName}
          </a>
        </div>
        <div className="flex items-center gap-2">
          <FaLinkedin
            size={18}
            className="text-light-accent-icon dark:text-dark-accent-icon"
          />
          <a
            href={`${generalInfo?.linkedInLink}`}
            target="_blank"
            className="text-light-text-primary dark:text-dark-text-primary hover:text-light-text-link hover:dark:text-light-text-link hover:underline"
          >
            {generalInfo?.linkedInDisplayName}
          </a>
        </div>
        <div className="flex items-center gap-2">
          <FaInstagram
            size={18}
            className="text-light-accent-icon dark:text-dark-accent-icon"
          />
          <a
            href={`${generalInfo?.instagramLink}`}
            target="_blank"
            className="text-light-text-primary dark:text-dark-text-primary hover:text-light-text-link hover:dark:text-light-text-link hover:underline"
          >
            {generalInfo?.instagramDisplayName}
          </a>
        </div>
        <div className="flex items-center gap-2">
          <FaFacebook
            size={18}
            className="text-light-accent-icon dark:text-dark-accent-icon"
          />
          <a
            href={`${generalInfo?.facebookLink}`}
            target="_blank"
            className="text-light-text-primary dark:text-dark-text-primary hover:text-light-text-link hover:dark:text-light-text-link hover:underline"
          >
            {generalInfo?.facebookDisplayName}
          </a>
        </div>
        <div className="flex items-center gap-2">
          <FaDiscord
            size={18}
            className="text-light-accent-icon dark:text-dark-accent-icon"
          />
          <p className="text-light-text-primary dark:text-dark-text-primary">
            {generalInfo?.discordDisplayName}
          </p>
          <button
            onClick={() => copyText(generalInfo?.discordDisplayName)}
            className="md:hidden"
          >
            <IoCopy
              size={18}
              className="text-light-text-primary dark:text-dark-text-primary"
            />
          </button>
          <Popover open={showCopy} onOpenChange={setShowCopy}>
            <PopoverTrigger
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              aria-expanded={showCopy}
              className="max-md:hidden outline-none center"
              onClick={() => copyText(generalInfo?.discordDisplayName)}
            >
              <IoCopy
                size={18}
                className="text-light-text-primary dark:text-dark-text-primary"
              />
            </PopoverTrigger>
            <PopoverContent
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="max-md:hidden w-fit p-1 bg-light-bg-button dark:bg-dark-bg-button border-light-accent-border dark:border-dark-accent-border text-xs"
            >
              Copy
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="w-full h-px my-4 bg-light-accent-border dark:bg-dark-accent-border" />
      <p className="text-sm text-light-accent-extra dark:text-dark-accent-extra">
        One day, I&apos;ll keep adding features to make this site look even more
        GitHub-like. For now, enjoy it just as it is! 😄🚀✨
      </p>
    </div>
  );
};

export default ProfileBar;
