"use client";

import React, { useState } from "react";
import Link from "next/link";
import { RiHomeSmileLine, RiFolderInfoLine } from "react-icons/ri";
import { GoCodeSquare, GoCommentDiscussion, GoCopilot } from "react-icons/go";
import { GrContact } from "react-icons/gr";
import { IoLogoGithub, IoMdDownload } from "react-icons/io";
import { TbSchool } from "react-icons/tb";
import {
  FaSun,
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaDiscord,
} from "react-icons/fa";
import { BsVectorPen, BsMoonStarsFill } from "react-icons/bs";
import { LuBrain } from "react-icons/lu";
import { TfiEmail } from "react-icons/tfi";
import { IoCopy } from "react-icons/io5";
import { CgFileDocument } from "react-icons/cg";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useGeneralInfoContent } from "@/hooks/useGeneralInfoContent";
import { getAssetUrl } from "@/utils/imageUtils";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import { Skeleton } from "@/components/ui/skeleton";

const NavMobileSideProfile = ({ onClick, theme }) => {
  const { generalInfoContent, isGeneralInfoLoading, isGeneralInfoError } =
    useGeneralInfoContent();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  if (isGeneralInfoLoading || !generalInfoContent) {
    return (
      <Skeleton className="w-[36px] h-[36px] !bg-bg-button rounded-full mt-px ml-2" />
    );
  }

  if (isGeneralInfoError) {
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
              <div>
                <p className="text-red-500">Failed to load...</p>
              </div>
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
          <div
            onClick={() => setOpen(true)}
            className="w-[36px] h-[36px] center relative border border-accent-border rounded-full mt-px ml-2 cursor-pointer"
          >
            <Image
              src={profilePirctureUrl}
              alt="Profile_Picture_open_menu"
              width={36}
              height={36}
              quality={100}
              className="w-[36px] h-[36px] rounded-full object-cover object-center z-10"
            />
          </div>
        </SheetTrigger>
        <SheetContent className="max-[308px]:w-screen !bg-bg-primary !border-accent-border overflow-y-auto thin-scrollbar max-[234px]:px-1">
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
                  <p className="text-[17px] text-text-secondary">
                    {generalInfoContent?.job}
                  </p>
                </div>
                <p className="text-left text-xs text-text-secondary mt-2">
                  {generalInfoContent?.sentence}
                </p>

                <div className="w-full text-left mt-6 border-b border-b-accent-border pb-1">
                  <p className="text-xs">Theme</p>
                </div>
                {/* Switch theme */}
                <ToggleThemeMobile onClick={onClick} theme={theme} />

                <div className="w-full text-left mt-6 border-b border-b-accent-border pb-1">
                  <p className="text-xs">Explore</p>
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
                      Welcome <div className={getLinkClassDivMobile("/")} />
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
                      <div className={getLinkClassDivMobile("/portfolio")} />
                    </Link>
                  </li>

                  <li className="w-full flex justify-start items-center gap-2">
                    <Link
                      href="/writings/blog"
                      className={`w-full relative flex items-center justify-start gap-1 text-text-primary rounded-md p-2 md:hover:bg-bg-button `}
                      onClick={() => setOpen(false)}
                    >
                      <BsVectorPen size={18} className="text-accent-icon" />
                      <p className="text-sm">
                        Writings
                        <span className="text-accent-icon mx-[3px]">/</span>
                        Blog
                      </p>{" "}
                      <div
                        className={getLinkClassDivMobile("/writings/blog")}
                      />
                    </Link>
                  </li>
                  <li className="w-full flex justify-start items-center gap-2">
                    <Link
                      href="/writings/academic"
                      className={`w-full relative flex items-center justify-start gap-1 text-text-primary rounded-md p-2 md:hover:bg-bg-button `}
                      onClick={() => setOpen(false)}
                    >
                      <TbSchool size={18} className="text-accent-icon" />
                      <p className="text-sm">
                        Writings
                        <span className="text-accent-icon mx-[3px]">/</span>
                        Academic
                      </p>{" "}
                      <div
                        className={getLinkClassDivMobile("/writings/academic")}
                      />
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
                      <div
                        className={`${getLinkClassDivMobile(
                          "/manupilot"
                        )} ml-1`}
                      />
                      <div className="absolute right-4 px-1 rounded-full border border-text-primary text-xs text-text-primary font-semibold">
                        AI Chat
                      </div>
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
                      <div className={getLinkClassDivMobile("/dev-quiz")} />
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
                      <div className={getLinkClassDivMobile("/discussions")} />
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
                      <div className={getLinkClassDivMobile("/contact")} />
                    </Link>
                  </li>
                </ul>

                {/* Contacts */}

                <div className="w-full text-left mt-6 border-b border-b-accent-border pb-1">
                  <p className="text-xs">Connect with me</p>
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
                      {" "}
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
                      {" "}
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
                      {" "}
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
                      <p className="text-text-primary text-sm mb-px">
                        {generalInfoContent?.discordDisplayName}
                      </p>
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
                      {" "}
                      <CgFileDocument size={18} className="text-accent-icon" />
                      Resume
                      <IoMdDownload size={18} className="text-text-primary" />
                    </a>
                  </li>
                </ul>

                <div className="w-full text-left mt-6 border-b border-b-accent-border pb-1">
                  <p className="text-xs">Other</p>
                </div>
                <div className="w-full relative center gap-2 mt-1">
                  <Link
                    href="/about-this-website"
                    className={`w-full relative flex items-center justify-start gap-1 text-text-primary rounded-md p-2 md:hover:bg-bg-button `}
                    onClick={() => setOpen(false)}
                  >
                    <RiFolderInfoLine size={18} className="text-accent-icon" />
                    About this website
                    <div
                      className={getLinkClassDivMobile("/about-this-website")}
                    />
                  </Link>
                </div>

                <div className="my-4 w-full h-px bg-accent-border" />
                <p className="text-xs text-left text-accent-extra">
                  One day, I&apos;ll keep adding features to make this site look
                  even more GitHub-like. For now, enjoy it just as it is! 😄🚀✨
                </p>
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
