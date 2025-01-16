"use client";
import React from "react";
import Link from "next/link";
import { IoLogoGithub } from "react-icons/io";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  const isManuPilotPage = pathname === "/manupilot";
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`w-full mt-auto pt-10 md:pt-12 pb-10 px-4 ${
        isManuPilotPage && "hidden"
      }`}
    >
      <div className="w-full center gap-2 max-md:flex-col">
        <Link
          href="/"
          className="text-text-primary center text-[22px] md:text-lg w-[38px] md:w-[26px] h-[38px] md:h-[26px] border border-text-primary center max-md:mb-2"
        >
          E
        </Link>
        <p className="text-xs text-center text-text-secondary ">
          &copy; {currentYear} Made with ❤️ by{" "}
          <span className="font-semibold">Emanuele Sgroi</span>
        </p>
        <div className="max-md:hidden h-px w-2 bg-text-secondary mt-1" />
        <p className="text-center text-xs text-text-secondary center gap-[3px]">
          Inspired by the design of GitHub <IoLogoGithub size={22} />
        </p>
        <div className="max-md:hidden h-px w-2 bg-text-secondary mt-1" />
        <Link
          href="https://github.com/Emanuele-Sgroi/emanuelesgroi.com"
          target="_blank"
          className="text-center text-xs text-text-secondary hover:text-accent-extra "
        >
          Give it a star ⭐
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
