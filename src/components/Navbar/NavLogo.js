"use client";

import React from "react";
import Link from "next/link";

const NavLogo = () => {
  return (
    <Link
      href="/"
      className="text-text-primary flex items-center gap-1 min-[291px]:gap-2"
    >
      <span className="w-[32px] h-[32px] border border-text-primary center flex-shrink-0 text-2xl">
        E
      </span>
      <span className="max-sm:hidden hover-box text-sm font-semibold leading-5">
        Emanuele Sgroi
      </span>
    </Link>
  );
};

export default NavLogo;
