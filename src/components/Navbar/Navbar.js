"use client";

import React, { useContext, useState, useEffect } from "react";
import ThemeContext from "@/context/ThemeProvider";
import Link from "next/link";
import {
  RiHomeSmileLine,
  RiRobot2Line,
  RiRobot3Line,
  RiFolderInfoLine,
} from "react-icons/ri";
import { GoCodeSquare, GoCommentDiscussion } from "react-icons/go";
import { FaRegBookmark } from "react-icons/fa6";
import { GrContact } from "react-icons/gr";
import { IoMdArrowDropdown, IoLogoGithub, IoMdDownload } from "react-icons/io";
import { TbSchool } from "react-icons/tb";
import {
  FaSun,
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaDiscord,
} from "react-icons/fa";
import { BsVectorPen, BsMoonStarsFill } from "react-icons/bs";
import { HiOutlineSearch, HiDotsHorizontal } from "react-icons/hi";
import { LuSquareSlash, LuBrain } from "react-icons/lu";
import { PiGameControllerBold, PiWall } from "react-icons/pi";
import { TfiEmail } from "react-icons/tfi";
import { IoCopy } from "react-icons/io5";
import { CgFileDocument } from "react-icons/cg";
import { usePathname } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import "@theme-toggles/react/css/Lightbulb.css";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useGeneralInfoContent } from "@/hooks/useGeneralInfoContent";
import { getAssetUrl } from "@/utils/imageUtils";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import { Skeleton } from "@/components/ui/skeleton";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openSideMenu, setOpenSideMenu] = useState(false);
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
      setOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setOpen(false);
    }
  };

  const getLinkClassDiv = (path) => {
    return pathname === path
      ? "absolute bottom-[-11px] h-[2px] bg-accent-active "
      : "hidden";
  };
  const getLinkClassText = (path) => {
    return pathname === path ? "font-semibold" : "";
  };

  const getLinkClassDivMobile = (path) => {
    return pathname === path
      ? "w-[6px] h-[6px] rounded-full bg-accent-active "
      : "hidden";
  };

  return (
    <>
      <nav className="w-full relative max-sm:px-4 ">
        {/* Top part */}
        <div className="w-full mb-3 flex justify-between items-center">
          <NavLogo />{" "}
          <div className="center gap-[5px] sm:gap-4">
            <SearchBar />
            <div className="max-md:hidden w-px h-[20px] bg-accent-border " />
            <ToggleThemeButton onClick={toggleTheme} theme={theme} />
            <EmanueleAiLink />
            {/* Mobile only */}
            <MobileSideProfile onClick={toggleTheme} theme={theme} />
          </div>
        </div>
        {/* Bottom part */}
        <div className="w-full flex justify-between items-center gap-4">
          <div className="flex justify-start items-center gap-6">
            {/* Welcome */}
            <div className="max-[230px]:hidden relative center">
              <Link
                href="/"
                className={`relative center gap-1 text-text-primary hover-box ${getLinkClassText(
                  "/"
                )}`}
              >
                <RiHomeSmileLine size={18} className="text-accent-icon " />
                Welcome
              </Link>

              <div
                className={getLinkClassDiv("/")}
                style={{ width: `calc(100% + 10px)` }}
              />
            </div>

            {/* Portfolio */}
            <div className="relative center max-[330px]:hidden">
              <Link
                href="/portfolio"
                className={`relative center gap-1 text-text-primary hover-box ${getLinkClassText(
                  "/portfolio"
                )}`}
              >
                <GoCodeSquare size={18} className="text-accent-icon " />
                Portfolio
              </Link>
              <div
                className={getLinkClassDiv("/portfolio")}
                style={{ width: `calc(100% + 10px)` }}
              />
            </div>

            {/* Writings */}
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="max-[430px]:hidden relative center outline-none"
                aria-haspopup="menu"
                aria-expanded={open}
              >
                <div className="flex justify-center items-center cursor-pointer gap-1 text-text-primary text-sm hover-box">
                  <FaRegBookmark size={18} className="text-accent-icon" />
                  Writings
                  <IoMdArrowDropdown size={18} className="text-text-primary" />
                </div>
                <div
                  className={getLinkClassDiv("/writings/blog")}
                  style={{ width: `calc(100% + 10px)` }}
                />
                <div
                  className={getLinkClassDiv("/writings/academic")}
                  style={{ width: `calc(100% + 10px)` }}
                />
              </PopoverTrigger>
              <PopoverContent
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="max-[430px]:hidden w-[150px] p-2 bg-bg-button border-accent-border mt-[-4px]"
                role="menu"
              >
                <ul className="w-full">
                  <li role="menuitem" className="w-full mb-1">
                    <Link
                      href="/writings/blog"
                      className={`w-full flex items-center gap-2 hover-box text-text-primary ${getLinkClassText(
                        "/writings/blog"
                      )}`}
                      onClick={() => setOpen(false)}
                    >
                      <BsVectorPen size={18} className="text-accent-icon " />
                      Blog
                    </Link>
                  </li>
                  <li role="menuitem" className="w-full">
                    <Link
                      href="/writings/academic"
                      className={`w-full flex items-center gap-2 hover-box text-text-primary ${getLinkClassText(
                        "/writings/academic"
                      )}`}
                      onClick={() => setOpen(false)}
                    >
                      <TbSchool size={18} className="text-accent-icon " />
                      Academic
                    </Link>
                  </li>
                </ul>
              </PopoverContent>
            </Popover>

            {/* Dev Quiz */}
            <div className="max-[530px]:hidden relative center">
              <Link
                href="/dev-quiz"
                className={`relative center gap-1 text-text-primary hover-box ${getLinkClassText(
                  "/dev-quiz"
                )}`}
              >
                <LuBrain size={18} className="text-accent-icon" />
                Dev Quiz
              </Link>
              <div
                className={getLinkClassDiv("/dev-quiz")}
                style={{ width: `calc(100% + 10px)` }}
              />
            </div>

            {/* Discussions */}
            <div className="max-[676px]:hidden relative center">
              <Link
                href="/discussions"
                className={`relative center gap-1 text-text-primary hover-box ${getLinkClassText(
                  "/discussions"
                )}`}
              >
                <GoCommentDiscussion size={18} className="text-accent-icon" />
                Discussions
              </Link>
              <div
                className={getLinkClassDiv("/discussions")}
                style={{ width: `calc(100% + 10px)` }}
              />
            </div>

            {/* Get in touch */}
            <div className="max-[807px]:hidden relative center">
              <Link
                href="/contact"
                className={`relative center gap-1 text-text-primary hover-box ${getLinkClassText(
                  "/contact"
                )}`}
              >
                <GrContact size={18} className="text-accent-icon" />
                Get in Touch
              </Link>
              <div
                className={getLinkClassDiv("/contact")}
                style={{ width: `calc(100% + 10px)` }}
              />
            </div>
          </div>

          {/* Mobile */}
          <Popover open={openSideMenu} onOpenChange={setOpenSideMenu}>
            <PopoverTrigger
              className="min-[808px]:hidden relative center outline-none"
              aria-haspopup="menu"
              aria-expanded={open}
            >
              <div className="w-[32px] h-[32px] flex justify-center items-center bg-bg-button rounded-s border border-accent-border">
                <HiDotsHorizontal size={18} />
              </div>
            </PopoverTrigger>
            <PopoverContent className="min-[889px]:hidden w-[150px] p-4 bg-bg-button border-accent-border mr-4">
              <ul className="w-full flex flex-col justify-start items-start gap-4">
                {/* Welcome */}
                <li className="min-[231px]:hidden relative center gap-2">
                  <Link
                    href="/"
                    className={`relative center gap-1 text-text-primary ${getLinkClassText(
                      "/"
                    )}`}
                    onClick={() => setOpenSideMenu(false)}
                  >
                    <RiHomeSmileLine size={18} className="text-accent-icon " />
                    Welcome
                  </Link>

                  <div className={getLinkClassDivMobile("/")} />
                </li>

                {/* Portfolio */}
                <li className="relative center min-[331px]:hidden gap-2">
                  <Link
                    href="/portfolio"
                    className={`relative center gap-1 text-text-primary ${getLinkClassText(
                      "/portfolio"
                    )}`}
                    onClick={() => setOpenSideMenu(false)}
                  >
                    <GoCodeSquare size={18} className="text-accent-icon " />
                    Portfolio
                  </Link>
                  <div className={getLinkClassDivMobile("/portfolio")} />
                </li>

                {/* Writings */}
                <li className="min-[431px]:hidden center gap-1 text-text-secondary text-sm">
                  <FaRegBookmark size={18} className="text-accent-icon " />
                  Writings
                  <IoMdArrowDropdown size={18} className="text-text-primary" />
                </li>
                {/* Writings - sublinks */}
                <li className="min-[431px]:hidden">
                  <ul className="w-full flex flex-col gap-2 ml-4 mt-[-5px]">
                    <li className="w-full flex justify-start items-center gap-2">
                      <Link
                        href="/writings/blog"
                        className={`flex items-center gap-2 text-text-primary ${getLinkClassText(
                          "/writings/blog"
                        )}`}
                        onClick={() => setOpenSideMenu(false)}
                      >
                        <BsVectorPen size={18} className="text-accent-icon" />
                        Blog
                      </Link>
                      <div
                        className={getLinkClassDivMobile("/writings/blog")}
                      />
                    </li>
                    <li className="w-full flex justify-start items-center gap-2">
                      <Link
                        href="/writings/academic"
                        className={`flex items-center gap-2 text-text-primary ${getLinkClassText(
                          "/writings/academic"
                        )}`}
                        onClick={() => setOpenSideMenu(false)}
                      >
                        <TbSchool size={18} className="text-accent-icon" />
                        Academic
                      </Link>
                      <div
                        className={getLinkClassDivMobile("/writings/academic")}
                      />
                    </li>
                  </ul>
                </li>

                {/* Dev Quiz */}
                <li className="relative center min-[531px]:hidden gap-2">
                  <Link
                    href="/dev-quiz"
                    className={`relative center gap-1 text-text-primary ${getLinkClassText(
                      "/dev-quiz"
                    )}`}
                    onClick={() => setOpenSideMenu(false)}
                  >
                    <LuBrain size={18} className="text-accent-icon" />
                    Dev Quiz
                  </Link>
                  <div className={getLinkClassDivMobile("/dev-quiz")} />
                </li>

                {/* Discussions */}
                <li className="relative center min-[677px]:hidden gap-2">
                  <Link
                    href="/discussions"
                    className={`relative center gap-1 text-text-primary ${getLinkClassText(
                      "/discussions"
                    )}`}
                    onClick={() => setOpenSideMenu(false)}
                  >
                    <GoCommentDiscussion
                      size={18}
                      className="text-accent-icon"
                    />
                    Discussions
                  </Link>
                  <div className={getLinkClassDivMobile("/discussions")} />
                </li>

                {/* Get in touch */}
                <li className="min-[808px]:hidden relative center gap-2">
                  <Link
                    href="/contact"
                    className={`relative center gap-1 text-text-primary ${getLinkClassText(
                      "/contact"
                    )}`}
                    onClick={() => setOpenSideMenu(false)}
                  >
                    <GrContact size={18} className="text-accent-icon" />
                    Get in Touch
                  </Link>
                  <div className={getLinkClassDivMobile("/contact")} />
                </li>
              </ul>
            </PopoverContent>
          </Popover>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

const NavLogo = () => {
  return (
    <div>
      <Link
        href="/"
        className="text-text-primary flex items-center gap-1 min-[291px]:gap-2"
      >
        <div className="w-[32px] h-[32px] border border-text-primary center ">
          <p className="text-2xl">E</p>
        </div>
        <div className="max-sm:hidden hover-box">
          <h6 className="leading-5">Emanuele Sgroi</h6>
        </div>
      </Link>
    </div>
  );
};

const ToggleThemeButton = ({ onClick, theme }) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
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
      setOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setOpen(false);
    }
  };

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={onClick}
          className="max-[400px]:hidden relative center outline-none w-[32px] h-[32px] btn-secondary center"
          aria-expanded={open}
        >
          {theme !== "light" ? (
            <FaSun size={18} className="max-sm:w-[16px] max-sm:h-[16px]" />
          ) : (
            <BsMoonStarsFill
              size={18}
              className="max-sm:w-[16px] max-sm:h-[16px]"
            />
          )}
        </PopoverTrigger>
        <PopoverContent className="w-fit p-1 bg-bg-button border-accent-border">
          <p className="text-xs">
            {theme !== "light" ? "Light Mode" : "Dark Mode"}
          </p>
        </PopoverContent>
      </Popover>
    </>
  );
};

const EmanueleAiLink = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
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
      setOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setOpen(false);
    }
  };

  const getLinkClass = (path) => {
    return pathname === path ? "border-accent-active" : "";
  };

  const getLinkClassIcon = (path) => {
    return pathname === path ? "text-text-primary" : "text-accent-icon";
  };

  return (
    <>
      {/* Writings */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative center outline-none"
          aria-expanded={open}
        >
          <Link
            href="/manupilot"
            className={`w-[32px] h-[32px] btn-secondary center ${getLinkClass(
              "/manupilot"
            )}`}
          >
            <RiRobot2Line
              size={18}
              className={` ${getLinkClassIcon("/manupilot")}`}
            />
          </Link>
        </PopoverTrigger>
        <PopoverContent className="w-fit p-1 bg-bg-button border-accent-border">
          <p className="text-xs">Try ManuPilot AI</p>
        </PopoverContent>
      </Popover>
    </>
  );
};

const SearchBar = () => {
  return (
    <div className="w-[32px] sm:w-[260px] h-[32px] btn-secondary hover:bg-transparent cursor-pointer flex items-center justify-center sm:justify-start">
      <HiOutlineSearch
        size={18}
        className="max-sm:w-[16px] max-sm:h-[16px] text-accent-icon"
      />
      <p className="max-sm:hidden text-sm flex items-center gap-1 text-accent-icon">
        Type
        <span>
          <LuSquareSlash size={18} />
        </span>
        to search
      </p>
    </div>
  );
};

const MobileSideProfile = ({ onClick, theme }) => {
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
                      <RiRobot2Line size={18} className="text-accent-icon" />
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
                      <PiWall size={18} className="text-accent-icon" />
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
