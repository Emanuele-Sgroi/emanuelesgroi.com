"use client";

import React, { useContext, useState, useEffect } from "react";
import ThemeContext from "@/context/ThemeProvider";
import Link from "next/link";
import { RiHomeSmileLine, RiRobot2Line, RiRobot3Line } from "react-icons/ri";
import { GoCodeSquare } from "react-icons/go";
import { FaRegBookmark } from "react-icons/fa6";
import { GrContact } from "react-icons/gr";
import { IoMdArrowDropdown } from "react-icons/io";
import { TbSchool } from "react-icons/tb";
import { FaSun } from "react-icons/fa";
import { BsVectorPen, BsMoonStarsFill } from "react-icons/bs";
import { HiOutlineSearch, HiDotsHorizontal } from "react-icons/hi";
import { LuSquareSlash, LuBrain } from "react-icons/lu";
import { PiGameControllerBold, PiWall } from "react-icons/pi";
import { usePathname } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import "@theme-toggles/react/css/Lightbulb.css";

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
      ? "absolute bottom-[-11px] h-[2px] bg-light-accent-active dark:bg-dark-accent-active"
      : "hidden";
  };
  const getLinkClassText = (path) => {
    return pathname === path ? "font-semibold" : "";
  };

  const getLinkClassDivMobile = (path) => {
    return pathname === path
      ? "w-[6px] h-[6px] rounded-full bg-light-accent-active dark:bg-dark-accent-active"
      : "hidden";
  };

  return (
    <>
      <nav className="w-full relative max-sm:px-4">
        {/* Top part */}
        <div className="w-full mb-3 flex justify-between items-center">
          <NavLogo />{" "}
          <div className="center gap-[5px] min-[341px]:gap-4">
            <SearchBar />
            <div className="max-md:hidden w-px h-[20px] bg-light-accent-border dark:bg-dark-accent-border" />
            <ToggleThemeButton onClick={toggleTheme} theme={theme} />
            <EmanueleAiLink />
          </div>
        </div>
        {/* Bottom part */}
        <div className="w-full flex justify-between items-center gap-4">
          <div className="flex justify-start items-center gap-6">
            {/* Welcome */}
            <div className="max-[230px]:hidden relative center">
              <Link
                href="/"
                className={`relative center gap-1 text-light-text-primary dark:text-dark-text-primary hover-box ${getLinkClassText(
                  "/"
                )}`}
              >
                <RiHomeSmileLine
                  size={18}
                  className="text-light-accent-icon dark:text-dark-accent-icon"
                />
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
                className={`relative center gap-1 text-light-text-primary dark:text-dark-text-primary hover-box ${getLinkClassText(
                  "/portfolio"
                )}`}
              >
                <GoCodeSquare
                  size={18}
                  className="text-light-accent-icon dark:text-dark-accent-icon"
                />
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
                <div className="flex justify-center items-center cursor-pointer gap-1 text-light-text-primary dark:text-dark-text-primary text-sm hover-box">
                  <FaRegBookmark
                    size={18}
                    className="text-light-accent-icon dark:text-dark-accent-icon"
                  />
                  Writings
                  <IoMdArrowDropdown
                    size={18}
                    className="text-light-text-primary dark:text-dark-text-primary"
                  />
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
                className="max-[430px]:hidden w-[150px] p-2 bg-light-bg-button dark:bg-dark-bg-button border-light-accent-border dark:border-dark-accent-border mt-[-4px]"
                role="menu"
              >
                <ul className="w-full">
                  <li role="menuitem" className="w-full mb-1">
                    <Link
                      href="/writings/blog"
                      className={`w-full flex items-center gap-2 hover-box text-light-text-primary dark:text-dark-text-primary ${getLinkClassText(
                        "/writings/blog"
                      )}`}
                      onClick={() => setOpen(false)}
                    >
                      <BsVectorPen
                        size={18}
                        className="text-light-accent-icon dark:text-dark-accent-icon"
                      />
                      Blog
                    </Link>
                  </li>
                  <li role="menuitem" className="w-full">
                    <Link
                      href="/writings/academic"
                      className={`w-full flex items-center gap-2 hover-box text-light-text-primary dark:text-dark-text-primary ${getLinkClassText(
                        "/writings/academic"
                      )}`}
                      onClick={() => setOpen(false)}
                    >
                      <TbSchool
                        size={18}
                        className="text-light-accent-icon dark:text-dark-accent-icon"
                      />
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
                className={`relative center gap-1 text-light-text-primary dark:text-dark-text-primary hover-box ${getLinkClassText(
                  "/dev-quiz"
                )}`}
              >
                <LuBrain
                  size={18}
                  className="text-light-accent-icon dark:text-dark-accent-icon"
                />
                Dev Quiz
              </Link>
              <div
                className={getLinkClassDiv("/dev-quiz")}
                style={{ width: `calc(100% + 10px)` }}
              />
            </div>

            {/* Minigames */}
            <div className="max-[676px]:hidden relative center">
              <Link
                href="/minigames"
                className={`relative center gap-1 text-light-text-primary dark:text-dark-text-primary hover-box ${getLinkClassText(
                  "/minigames"
                )}`}
              >
                <PiGameControllerBold
                  size={18}
                  className="text-light-accent-icon dark:text-dark-accent-icon"
                />
                Minigames
              </Link>
              <div
                className={getLinkClassDiv("/minigames")}
                style={{ width: `calc(100% + 10px)` }}
              />
            </div>

            {/* Wall */}
            <div className="max-[758px]:hidden relative center">
              <Link
                href="/wall"
                className={`relative center gap-1 text-light-text-primary dark:text-dark-text-primary hover-box ${getLinkClassText(
                  "/wall"
                )}`}
              >
                <PiWall
                  size={18}
                  className="text-light-accent-icon dark:text-dark-accent-icon"
                />
                Wall
              </Link>
              <div
                className={getLinkClassDiv("/wall")}
                style={{ width: `calc(100% + 10px)` }}
              />
            </div>

            {/* Get in touch */}
            <div className="max-[838px]:hidden relative center">
              <Link
                href="/contact"
                className={`relative center gap-1 text-light-text-primary dark:text-dark-text-primary hover-box ${getLinkClassText(
                  "/contact"
                )}`}
              >
                <GrContact
                  size={18}
                  className="text-light-accent-icon dark:text-dark-accent-icon"
                />
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
              className="min-[839px]:hidden relative center outline-none"
              aria-haspopup="menu"
              aria-expanded={open}
            >
              <div className="w-[32px] h-[32px] flex justify-center items-center bg-light-bg-button dark:bg-dark-bg-button rounded-s border border-light-accent-border dark:border-dark-accent-border">
                <HiDotsHorizontal size={18} />
              </div>
            </PopoverTrigger>
            <PopoverContent className="min-[839px]:hidden w-[150px] p-4 bg-light-bg-button dark:bg-dark-bg-button border-light-accent-border dark:border-dark-accent-border mr-4">
              <ul className="w-full flex flex-col justify-start items-start gap-4">
                {/* Welcome */}
                <li className="min-[231px]:hidden relative center gap-2">
                  <Link
                    href="/"
                    className={`relative center gap-1 text-light-text-primary dark:text-dark-text-primary ${getLinkClassText(
                      "/"
                    )}`}
                    onClick={() => setOpenSideMenu(false)}
                  >
                    <RiHomeSmileLine
                      size={18}
                      className="text-light-accent-icon dark:text-dark-accent-icon"
                    />
                    Welcome
                  </Link>

                  <div className={getLinkClassDivMobile("/")} />
                </li>

                {/* Portfolio */}
                <li className="relative center min-[331px]:hidden gap-2">
                  <Link
                    href="/portfolio"
                    className={`relative center gap-1 text-light-text-primary dark:text-dark-text-primary  ${getLinkClassText(
                      "/portfolio"
                    )}`}
                    onClick={() => setOpenSideMenu(false)}
                  >
                    <GoCodeSquare
                      size={18}
                      className="text-light-accent-icon dark:text-dark-accent-icon"
                    />
                    Portfolio
                  </Link>
                  <div className={getLinkClassDivMobile("/portfolio")} />
                </li>

                {/* Writings */}
                <li className="min-[431px]:hidden center gap-1 text-light-text-secondary dark:text-dark-text-secondary text-sm">
                  <FaRegBookmark
                    size={18}
                    className="text-light-accent-icon dark:text-dark-accent-icon"
                  />
                  Writings
                  <IoMdArrowDropdown
                    size={18}
                    className="text-light-text-primary dark:text-dark-text-primary"
                  />
                </li>
                {/* Writings - sublinks */}
                <li className="min-[431px]:hidden">
                  <ul className="w-full flex flex-col gap-2 ml-4 mt-[-5px]">
                    <li className="w-full flex justify-start items-center gap-2">
                      <Link
                        href="/writings/blog"
                        className={`flex items-center gap-2  text-light-text-primary dark:text-dark-text-primary ${getLinkClassText(
                          "/writings/blog"
                        )}`}
                        onClick={() => setOpenSideMenu(false)}
                      >
                        <BsVectorPen
                          size={18}
                          className="text-light-accent-icon dark:text-dark-accent-icon"
                        />
                        Blog
                      </Link>
                      <div
                        className={getLinkClassDivMobile("/writings/blog")}
                      />
                    </li>
                    <li className="w-full flex justify-start items-center gap-2">
                      <Link
                        href="/writings/academic"
                        className={`flex items-center gap-2 text-light-text-primary dark:text-dark-text-primary ${getLinkClassText(
                          "/writings/academic"
                        )}`}
                        onClick={() => setOpenSideMenu(false)}
                      >
                        <TbSchool
                          size={18}
                          className="text-light-accent-icon dark:text-dark-accent-icon"
                        />
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
                    className={`relative center gap-1 text-light-text-primary dark:text-dark-text-primary  ${getLinkClassText(
                      "/dev-quiz"
                    )}`}
                    onClick={() => setOpenSideMenu(false)}
                  >
                    <LuBrain
                      size={18}
                      className="text-light-accent-icon dark:text-dark-accent-icon"
                    />
                    Dev Quiz
                  </Link>
                  <div className={getLinkClassDivMobile("/dev-quiz")} />
                </li>

                {/* Minigames */}
                <li className="relative center min-[677px]:hidden gap-2">
                  <Link
                    href="/minigames"
                    className={`relative center gap-1 text-light-text-primary dark:text-dark-text-primary  ${getLinkClassText(
                      "/minigames"
                    )}`}
                    onClick={() => setOpenSideMenu(false)}
                  >
                    <PiGameControllerBold
                      size={18}
                      className="text-light-accent-icon dark:text-dark-accent-icon"
                    />
                    Minigames
                  </Link>
                  <div className={getLinkClassDivMobile("/minigames")} />
                </li>

                {/* Wall */}
                <li className="relative center min-[759px]:hidden gap-2">
                  <Link
                    href="/wall"
                    className={`relative center gap-1 text-light-text-primary dark:text-dark-text-primary  ${getLinkClassText(
                      "/wall"
                    )}`}
                    onClick={() => setOpenSideMenu(false)}
                  >
                    <PiWall
                      size={18}
                      className="text-light-accent-icon dark:text-dark-accent-icon"
                    />
                    Wall
                  </Link>
                  <div className={getLinkClassDivMobile("/wall")} />
                </li>

                {/* Get in touch */}
                <li className="min-[839px]:hidden relative center gap-2">
                  <Link
                    href="/contact"
                    className={`relative center gap-1 text-light-text-primary dark:text-dark-text-primary  ${getLinkClassText(
                      "/contact"
                    )}`}
                    onClick={() => setOpenSideMenu(false)}
                  >
                    <GrContact
                      size={18}
                      className="text-light-accent-icon dark:text-dark-accent-icon"
                    />
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
        className="text-light-text-primary dark:text-dark-text-primary flex items-center gap-1 min-[291px]:gap-2"
      >
        <div className="w-[32px] h-[32px] border border-light-text-primary dark:border-dark-text-primary center ">
          <p className="text-2xl">E</p>
        </div>
        <div className="max-[280px]:hidden hover-box">
          <h6 className="leading-5 max-[284px]:hidden">Emanuele Sgroi</h6>
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
          className="relative center outline-none w-[32px] h-[32px] btn-secondary center"
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
        <PopoverContent className="w-fit p-1 bg-light-bg-button dark:bg-dark-bg-button border-light-accent-border dark:border-dark-accent-border ">
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
    return pathname === path
      ? "border-light-accent-active dark:border-dark-accent-active"
      : "";
  };

  const getLinkClassIcon = (path) => {
    return pathname === path
      ? "text-light-text-primary dark:text-dark-text-primary"
      : "text-light-accent-icon dark:text-dark-accent-icon";
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
            href="/emanuele-ai"
            className={`w-[32px] h-[32px] btn-secondary center ${getLinkClass(
              "/emanuele-ai"
            )}`}
          >
            <RiRobot2Line
              size={18}
              className={` ${getLinkClassIcon("/emanuele-ai")}`}
            />
          </Link>
        </PopoverTrigger>
        <PopoverContent className="w-fit p-1 bg-light-bg-button dark:bg-dark-bg-button border-light-accent-border dark:border-dark-accent-border ">
          <p className="text-xs">Emanuele AI</p>
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
        className="max-sm:w-[16px] max-sm:h-[16px] text-light-accent-icon dark:text-dark-accent-icon"
      />
      <p className="max-sm:hidden text-sm flex items-center gap-1 text-light-accent-icon dark:text-dark-accent-icon">
        Type
        <span>
          <LuSquareSlash size={18} />
        </span>
        to search
      </p>
    </div>
  );
};
