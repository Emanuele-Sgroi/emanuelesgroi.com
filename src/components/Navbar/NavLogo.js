"use client";

import React from "react";
import Link from "next/link";

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

export default NavLogo;
