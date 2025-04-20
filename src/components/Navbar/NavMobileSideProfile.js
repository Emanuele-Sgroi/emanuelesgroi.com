"use client";

import React, { useState } from "react";
import Link from "next/link";
import { RiHomeSmileLine, RiFolderInfoLine } from "react-icons/ri";
import { GoCodeSquare, GoCommentDiscussion, GoCopilot } from "react-icons/go";
import { GrContact } from "react-icons/gr";
import { IoLogoGithub, IoMdDownload } from "react-icons/io";
import { FaRegBookmark } from "react-icons/fa6";
import {
  FaSun,
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaDiscord,
} from "react-icons/fa";
import { BsMoonStarsFill } from "react-icons/bs";
import { LuBrain } from "react-icons/lu";
import { TfiEmail } from "react-icons/tfi";
import { IoCopy } from "react-icons/io5";
import { CgFileDocument, CgMenuLeftAlt } from "react-icons/cg";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getAssetUrl } from "@/utils/imageUtils";
import Image from "next/image";
import { toast } from "react-toastify";
import { Skeleton } from "@/components/ui/skeleton";
import { SwitchLanguageSidebar } from "@/components";

/**
 * NavMobileSideProfile Component
 *
 * Displays a mobile-friendly side menu with profile details and navigation links.
 * - Shows the user's profile picture, name, and job title.
 * - Includes theme toggle functionality.
 * - Provides navigation links to various sections like Portfolio, Writings, ManuPilot, Dev Quiz, Discussions, and Contact.
 * - Displays social media and contact links, including email, GitHub, LinkedIn, Instagram, Facebook, and Discord.
 * - Allows users to download the resume.
 * - Includes an "About This Website" section for additional details.
 *
 * Props:
 * - onClick: Function to toggle the website theme.
 * - theme: String indicating the current theme (light/dark).
 * - generalInfoContent: Object containing user profile details from the CMS.
 * - error: Boolean indicating if there's an error loading content.
 */

const NavMobileSideProfile = ({
  onClick,
  theme,
  generalInfoContent,
  error,
}) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  if (!generalInfoContent) {
    return (
      <Skeleton className="w-[36px] h-[36px] !bg-bg-button rounded-full mt-px ml-2" />
    );
  }

  if (error) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Skeleton
            onClick={() => setOpen(true)}
            className="md:hidden w-[36px] h-[36px] !bg-bg-button rounded-full mt-px ml-2"
          />
        </SheetTrigger>
        <SheetContent className="!bg-bg-primary !border-accent-border md:hidden overflow-y-auto thin-scrollbar">
          <SheetHeader>
            <SheetDescription>
              <div className="text-red-500">Failed to load...</div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    );
  }

  // Retrieve image URLs from content
  const profilePirctureUrl = generalInfoContent?.profilePicture
    ? getAssetUrl(generalInfoContent.profilePicture)
    : "";

  const getLinkClassDivMobile = (path) => {
    return pathname === path
      ? "w-[6px] h-[6px] rounded-full bg-accent-active mt-1 ml-2 "
      : "hidden";
  };

  const copyText = (text) => {
    let copiedText = `${text}`;

    navigator.clipboard
      .writeText(copiedText)
      .then(() => {
        toast("Copied to clipboard.");
      })
      .catch((err) => {
        alert("Failed to copy. Sorry!");
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button
            onClick={() => setOpen(true)}
            className="center gap-[2px] relative rounded-full mt-px ml-2 cursor-pointer group/edit"
          >
            <Image
              src={profilePirctureUrl}
              alt="Profile_Picture_open_menu"
              width={36}
              height={36}
              quality={100}
              className="w-[36px] h-[36px] border border-accent-border rounded-full object-cover object-center z-10"
            />
            <CgMenuLeftAlt
              size={25}
              className="text-accent-icon group-hover/edit:text-text-primary"
            />
          </button>
        </SheetTrigger>
        <SheetContent className="max-[308px]:w-screen !bg-bg-primary !border-accent-border overflow-y-auto thin-scrollbar max-[234px]:px-1 z-[99999999999999]">
          <SheetHeader>
            <SheetDescription>
              <div>
                <div className="w-[100px] sm:w-[122px] h-[100px] sm:h-[122px] relative border-2 border-accent-border rounded-full">
                  <Image
                    src={profilePirctureUrl}
                    alt="Profile_Picture"
                    width={680}
                    height={510}
                    className="w-full h-full rounded-full object-cover object-center z-10"
                  />
                </div>
                <div className="flex flex-col justify-start items-start mt-1">
                  <h3 className="max-[375px]:text-[20px]">
                    {generalInfoContent?.name}
                  </h3>
                  <div className="text-[17px] text-text-secondary">
                    {generalInfoContent?.job}
                  </div>
                </div>
                <div className="text-left text-xs text-text-secondary mt-2">
                  {generalInfoContent?.sentence}
                </div>

                <div className="w-full text-left mt-6 border-b border-b-accent-border pb-1">
                  <div className="text-xs">Settings</div>
                </div>
                {/* Switch theme */}
                <ToggleThemeMobile onClick={onClick} theme={theme} />
                <SwitchLanguageSidebar />
                <div className="w-full text-left mt-6 border-b border-b-accent-border pb-1">
                  <div className="text-xs">Explore</div>
                </div>
                <ul className="w-full flex flex-col justify-start items-start gap-1 mt-1">
                  {/* Welcome */}
                  <li className="w-full relative center gap-2">
                    <Link
                      href="/"
                      className={`w-full relative flex items-center justify-start gap-1 text-text-primary rounded-md p-2 md:hover:bg-bg-button`}
                      onClick={() => setOpen(false)}
                    >
                      <RiHomeSmileLine
                        size={18}
                        className="text-accent-icon "
                      />
                      Welcome <span className={getLinkClassDivMobile("/")} />
                    </Link>
                  </li>

                  {/* Portfolio */}
                  <li className="w-full relative center gap-2">
                    <Link
                      href="/portfolio"
                      className={`w-full relative flex items-center justify-start gap-1 text-text-primary rounded-md p-2 md:hover:bg-bg-button `}
                      onClick={() => setOpen(false)}
                    >
                      <GoCodeSquare size={18} className="text-accent-icon " />
                      Portfolio{" "}
                      <span className={getLinkClassDivMobile("/portfolio")} />
                    </Link>
                  </li>

                  {/* Writings */}
                  <li className="w-full relative center gap-2">
                    <Link
                      href="/writings"
                      className={`w-full relative flex items-center justify-start gap-1 text-text-primary rounded-md p-2 md:hover:bg-bg-button `}
                      onClick={() => setOpen(false)}
                    >
                      <FaRegBookmark size={18} className="text-accent-icon " />
                      Writings{" "}
                      <span className={getLinkClassDivMobile("/writings")} />
                    </Link>
                  </li>

                  {/* ManuPilot */}
                  <li className="w-full flex justify-start items-center gap-2">
                    <Link
                      href="/manupilot"
                      className={`w-full relative flex items-center justify-start gap-1 text-text-primary rounded-md p-2 md:hover:bg-bg-button `}
                      onClick={() => setOpen(false)}
                    >
                      <GoCopilot size={18} className="text-accent-icon" />
                      ManuPilot
                      <span
                        className={`${getLinkClassDivMobile(
                          "/manupilot"
                        )} ml-1`}
                      />
                      <span className="absolute right-4 px-1 rounded-full border border-text-primary text-xs text-text-primary font-semibold">
                        AI Chat
                      </span>
                    </Link>
                  </li>

                  {/* Dev Quiz */}
                  <li className="w-full relative center gap-2">
                    <Link
                      href="/dev-quiz"
                      className={`w-full relative flex items-center justify-start gap-1 text-text-primary rounded-md p-2 md:hover:bg-bg-button  `}
                      onClick={() => setOpen(false)}
                    >
                      <LuBrain size={18} className="text-accent-icon" />
                      Dev Quiz{" "}
                      <span className={getLinkClassDivMobile("/dev-quiz")} />
                    </Link>
                  </li>

                  {/* Discussions */}
                  <li className="w-full relative center gap-2">
                    <Link
                      href="/discussions"
                      className={`w-full relative flex items-center justify-start gap-1 text-text-primary rounded-md p-2 md:hover:bg-bg-button `}
                      onClick={() => setOpen(false)}
                    >
                      <GoCommentDiscussion
                        size={18}
                        className="text-accent-icon"
                      />
                      Discussions{" "}
                      <span className={getLinkClassDivMobile("/discussions")} />
                    </Link>
                  </li>

                  {/* Get in touch */}
                  <li className="w-full relative center gap-2">
                    <Link
                      href="/contact"
                      className={`w-full relative flex items-center justify-start gap-1 text-text-primary rounded-md p-2 md:hover:bg-bg-button `}
                      onClick={() => setOpen(false)}
                    >
                      <GrContact size={18} className="text-accent-icon" />
                      Get in Touch{" "}
                      <span className={getLinkClassDivMobile("/contact")} />
                    </Link>
                  </li>
                </ul>

                {/* Contacts */}

                <div className="w-full text-left mt-6 border-b border-b-accent-border pb-1">
                  <div className="text-xs">Connect with me</div>
                </div>

                <ul className="w-full flex flex-col justify-start items-start gap-1 mt-1">
                  <li className="w-full relative center gap-2">
                    <a
                      href={`mailto:${generalInfoContent?.email}`}
                      target="_blank"
                      className="w-full relative flex items-center justify-start gap-1 text-text-primary rounded-md p-2 md:hover:bg-bg-button"
                    >
                      <TfiEmail size={18} className="text-accent-icon" />
                      {generalInfoContent?.email}
                    </a>
                  </li>

                  <li className="w-full relative center gap-2">
                    <a
                      href={`${generalInfoContent?.gitHubLink}`}
                      target="_blank"
                      className="w-full relative flex items-center justify-start gap-1 text-text-primary rounded-md p-2 md:hover:bg-bg-button"
                    >
                      <IoLogoGithub size={18} className="text-accent-icon" />
                      {generalInfoContent?.gitHubDisplayName}
                    </a>
                  </li>

                  <li className="w-full relative center gap-2">
                    <a
                      href={`${generalInfoContent?.linkedInLink}`}
                      target="_blank"
                      className="w-full relative flex items-center justify-start gap-1 text-text-primary rounded-md p-2 md:hover:bg-bg-button"
                    >
                      <FaLinkedin size={18} className="text-accent-icon" />
                      {generalInfoContent?.linkedInDisplayName}
                    </a>
                  </li>
                  <li className="w-full relative center gap-2">
                    <a
                      href={`${generalInfoContent?.instagramLink}`}
                      target="_blank"
                      className="w-full relative flex items-center justify-start gap-1 text-text-primary rounded-md p-2 md:hover:bg-bg-button"
                    >
                      <FaInstagram size={18} className="text-accent-icon" />
                      {generalInfoContent?.instagramDisplayName}
                    </a>
                  </li>
                  <li className="w-full relative center gap-2">
                    <a
                      href={`${generalInfoContent?.facebookLink}`}
                      target="_blank"
                      className="w-full relative flex items-center justify-start gap-1 text-text-primary rounded-md p-2 md:hover:bg-bg-button"
                    >
                      <FaFacebook size={18} className="text-accent-icon" />
                      {generalInfoContent?.facebookDisplayName}
                    </a>
                  </li>
                  <li className="w-full relative center gap-2">
                    <button
                      onClick={() =>
                        copyText(generalInfoContent?.discordDisplayName)
                      }
                      className="w-full relative flex items-center justify-start gap-1 text-text-primary rounded-md p-2 md:hover:bg-bg-button"
                    >
                      <FaDiscord size={18} className="text-accent-icon" />
                      <span className="text-text-primary text-sm mb-px">
                        {generalInfoContent?.discordDisplayName}
                      </span>
                      {generalInfoContent &&
                        generalInfoContent.discordDisplayName && (
                          <IoCopy size={18} className="text-text-primary" />
                        )}
                    </button>
                  </li>
                  <li className="w-full relative center gap-2">
                    <a
                      href={`${getAssetUrl(generalInfoContent?.resume)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      download="Emanuele-Sgroi-Resume.pdf"
                      className="w-full relative flex items-center justify-start gap-1 text-text-primary rounded-md p-2 md:hover:bg-bg-button"
                    >
                      <CgFileDocument size={18} className="text-accent-icon" />
                      Resume
                      <IoMdDownload size={18} className="text-text-primary" />
                    </a>
                  </li>
                </ul>

                <div className="w-full text-left mt-6 border-b border-b-accent-border pb-1">
                  <div className="text-xs">Other</div>
                </div>
                <div className="w-full relative center gap-2 mt-1">
                  <Link
                    href="/about-this-website"
                    className={`w-full relative flex items-center justify-start gap-1 text-text-primary rounded-md p-2 md:hover:bg-bg-button `}
                    onClick={() => setOpen(false)}
                  >
                    <RiFolderInfoLine size={18} className="text-accent-icon" />
                    About this Website
                    <span
                      className={getLinkClassDivMobile("/about-this-website")}
                    />
                  </Link>
                </div>

                <div className="my-4 w-full h-px bg-accent-border" />
                <div className="text-xs text-left text-accent-extra">
                  One day, I&apos;ll keep adding features to make this site look
                  even more GitHub-like. For now, enjoy it just as it is! 😄🚀✨
                </div>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default NavMobileSideProfile;

const ToggleThemeMobile = ({ onClick, theme }) => {
  return (
    <div className=" w-full flex justify-start items-center gap-1 mt-4">
      <button onClick={onClick} className="relative center outline-none">
        <span className="center gap-1 mr-2">
          <FaSun size={18} className="max-sm:w-[16px] max-sm:h-[16px]" />{" "}
          <span className="max-[288px]:hidden">Light</span>
        </span>
        <div
          className={`px-1 rounded-full w-[44px] h-[24px] border border-accent-border flex items-center ${
            theme === "light" ? "justify-start" : "justify-end"
          }`}
        >
          <div className="h-[17px] w-[17px] rounded-full bg-text-primary"></div>
        </div>
        <span className="center gap-1 ml-2">
          {" "}
          <BsMoonStarsFill
            size={18}
            className="max-sm:w-[16px] max-sm:h-[16px]"
          />{" "}
          <span className="max-[288px]:hidden">Dark</span>
        </span>
      </button>
    </div>
  );
};
