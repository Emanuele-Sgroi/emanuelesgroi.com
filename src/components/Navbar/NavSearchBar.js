"use client";

import React from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { LuSquareSlash } from "react-icons/lu";

const NavSearchBar = () => {
  return (
    <div className="w-[32px] sm:w-[260px] h-[32px] btn-secondary hover:bg-transparent cursor-pointer flex items-center justify-center sm:justify-start">
      <HiOutlineSearch size={18} className=" text-accent-icon" />
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

export default NavSearchBar;
