"use client";

import React, { useContext, useState, useEffect } from "react";
import ThemeContext from "@/context/ThemeProvider";
import Link from "next/link";
import { RiHomeSmileLine } from "react-icons/ri";
import { GoCodeSquare } from "react-icons/go";
import { FaRegBookmark } from "react-icons/fa6";
import { GrContact } from "react-icons/gr";
import { IoMdArrowDropdown } from "react-icons/io";
import { TbSchool } from "react-icons/tb";
import { FaSun } from "react-icons/fa";
import { BsVectorPen, BsMoonStarsFill } from "react-icons/bs";
import { HiOutlineSearch } from "react-icons/hi";
import { LuSquareSlash } from "react-icons/lu";
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

  return (
    <>
      <nav className="w-full relative">
        {/* Top part */}
        <div className="w-full mb-4 flex justify-between items-center">
          <NavLogo />{" "}
          <div className="center gap-4">
            <SearchBar />
            <div className="w-px h-[20px] bg-light-accent-border dark:bg-dark-accent-border" />
            <ToggleThemeButton onClick={toggleTheme} theme={theme} />
          </div>
        </div>
        {/* Bottom part */}
        <div className="w-full flex justify-start items-center gap-6">
          <div className="relative center">
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
          <div className="relative center">
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
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="relative center outline-none"
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
              className="w-[150px] p-2 bg-light-bg-button dark:bg-dark-bg-button border-light-accent-border dark:border-dark-accent-border mt-[-4px]"
              role="menu"
            >
              <ul className="w-full">
                <li role="menuitem" className="w-full mb-1">
                  <Link
                    href="/writings/blog"
                    className="w-full flex items-center gap-2 hover-box text-light-text-primary dark:text-dark-text-primary"
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
                    className="w-full flex items-center gap-2 hover-box text-light-text-primary dark:text-dark-text-primary"
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
          <div className="relative center">
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

        {/* <button
          onClick={toggleTheme}
          className="absolute right-6 top-1/2 transform  -translate-y-1/2"
        >
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button> */}
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
        className="text-light-text-primary dark:text-dark-text-primary flex items-center gap-2"
      >
        <div className="w-[32px] h-[32px] border border-light-text-primary dark:border-dark-text-primary center ">
          <p className="text-2xl">E</p>
        </div>
        <div className="hover-box">
          <h6 className="leading-5">Emanuele Sgroi</h6>
        </div>
      </Link>
    </div>
  );
};

const ToggleThemeButton = ({ onClick, theme }) => {
  return (
    <button onClick={onClick} className=" btn-secondary center">
      <p className="text-sm text-light-accent-icon dark:text-dark-accent-icon">
        Switch Theme
      </p>
      {/* <div className="relative w-[22px] h-[22px] border border-light-accent-border dark:border-dark-bg-secondary rounded-full bg-transparent dark:bg-[#FFD45F] transition-all duration-300 ">
        <div
          className={`w-[15px] h-[15px] bg-[#FFD45F] dark:bg-dark-bg-secondary rounded-full absolute top-1/2 left-1/2 dark:left-[75%] transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300`}
        ></div> 
        
      </div> */}
      {theme === "light" ? <FaSun size={18} /> : <BsMoonStarsFill size={18} />}
    </button>
  );
};

const SearchBar = () => {
  return (
    <div className="w-[260px] btn-secondary hover:bg-transparent cursor-pointer flex items-center justify-start">
      <HiOutlineSearch
        size={18}
        className="text-light-accent-icon dark:text-dark-accent-icon"
      />
      <p className="text-sm flex items-center gap-1 text-light-accent-icon dark:text-dark-accent-icon">
        Type
        <span>
          <LuSquareSlash size={18} />
        </span>
        to search
      </p>
    </div>
  );
};
