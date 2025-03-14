"use client";
import React from "react";
import Link from "next/link";
import { IoLogoGithub } from "react-icons/io";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  const isManuPilotPage = pathname === "/manupilot";
  const isSiteDoc = pathname === "/about-this-website";
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`w-full mt-auto pt-16 pb-16 sm:pb-12 px-10 ${
        (isManuPilotPage || isSiteDoc) && "hidden"
      }`}
    >
      <div className="w-full center flex-col md:flex-row-reverse gap-4 ">
        <div className="center gap-4 flex-wrap">
          <Link
            href="/contact"
            className="text-center text-xs text-text-secondary hover:text-accent-extra"
          >
            Contact
          </Link>

          <Link
            href="https://www.linkedin.com/in/emanuele-sgroi/"
            className="text-center text-xs text-text-secondary hover:text-accent-extra"
          >
            LinkedIn
          </Link>

          <Link
            href="/about-this-website"
            className="text-center text-xs text-text-secondary hover:text-accent-extra"
          >
            About this website
          </Link>

          <Link
            href="https://github.com/Emanuele-Sgroi/emanuelesgroi.com"
            target="_blank"
            className="text-center text-xs text-text-secondary hover:text-accent-extra "
          >
            Give it a star
          </Link>
        </div>

        <div className="center gap-2 flex-wrap">
          <Link
            href="/"
            className="text-text-primary center text-lg w-[26px] h-[26px] border border-text-primary center "
          >
            E
          </Link>
          <p className="text-xs text-center text-text-secondary ">
            &copy; {currentYear} Made by{" "}
            <span className="font-semibold">Emanuele Sgroi</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
