"use client";

import React, { useContext, useState, useEffect } from "react";
import ThemeContext from "@/context/ThemeProvider";
import Link from "next/link";
import { RiHomeSmileLine } from "react-icons/ri";
import { GoCodeSquare, GoCommentDiscussion } from "react-icons/go";
import { FaRegBookmark } from "react-icons/fa6";
import { GrContact } from "react-icons/gr";
import { IoMdArrowDropdown } from "react-icons/io";
import { TbSchool } from "react-icons/tb";
import { BsVectorPen } from "react-icons/bs";
import { HiDotsHorizontal } from "react-icons/hi";
import { LuBrain } from "react-icons/lu";
import { usePathname } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  NavLogo,
  NavSearchBar,
  ToggleThemeButton,
  NavManuPilotLink,
  NavMobileSideProfile,
} from "@/components";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const isManuPilotPage = pathname === "/manupilot";
  const isBlogPost = pathname.startsWith("/writings/");
  const isProjectDetails = pathname.startsWith("/portfolio/");

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
        <div
          className={`w-full flex justify-between items-center ${
            isManuPilotPage ? "mt-[-5px]" : "mb-3"
          }`}
        >
          <NavLogo />{" "}
          <div className="center gap-3 sm:gap-4">
            <NavSearchBar />
            <div className="max-md:hidden w-px h-[20px] bg-accent-border " />
            <NavManuPilotLink />
            <ToggleThemeButton onClick={toggleTheme} theme={theme} />

            {/* Mobile only */}
            <NavMobileSideProfile onClick={toggleTheme} theme={theme} />
          </div>
        </div>
        {/* Bottom part */}
        <div
          className={`w-full flex justify-between items-center gap-4 ${
            (isManuPilotPage || isBlogPost || isProjectDetails) && "hidden"
          }`}
        >
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
            <div className="relative center max-[430px]:hidden">
              <Link
                href="/writings"
                className={`relative center gap-1 text-text-primary hover-box ${getLinkClassText(
                  "/portfolio"
                )}`}
              >
                <FaRegBookmark size={18} className="text-accent-icon " />
                Writings
              </Link>
              <div
                className={getLinkClassDiv("/writings")}
                style={{ width: `calc(100% + 10px)` }}
              />
            </div>

            {/* <Popover open={open} onOpenChange={setOpen}>
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
            </Popover> */}

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
                <li className="relative center min-[431px]:hidden gap-2">
                  <Link
                    href="/writings"
                    className={`relative center gap-1 text-text-primary ${getLinkClassText(
                      "/writings"
                    )}`}
                    onClick={() => setOpenSideMenu(false)}
                  >
                    <FaRegBookmark size={18} className="text-accent-icon " />
                    Writings
                  </Link>
                  <div className={getLinkClassDivMobile("/writings")} />
                </li>

                {/* <li className="min-[431px]:hidden center gap-1 text-text-secondary text-sm">
                  <FaRegBookmark size={18} className="text-accent-icon " />
                  Writings
                  <IoMdArrowDropdown size={18} className="text-text-primary" />
                </li> */}
                {/* Writings - sublinks */}
                {/* <li className="min-[431px]:hidden">
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
                </li> */}

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
