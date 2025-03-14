"use client";

import React from "react";
import Link from "next/link";

const NavLogo = () => {
  return (
    <Link
      href="/"
      className="text-text-primary flex items-center gap-1 min-[291px]:gap-2"
    >
      <span className="w-[32px] h-[32px] border border-text-primary center flex-shrink-0">
        <p className="text-2xl">E</p>
      </span>
      <span className="max-sm:hidden hover-box">
        <h6 className="leading-5">Emanuele Sgroi</h6>
      </span>
    </Link>
  );
};

export default NavLogo;
