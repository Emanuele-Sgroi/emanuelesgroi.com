import React from "react";
import Link from "next/link";
import { IoLogoGithub } from "react-icons/io";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full mt-auto pt-12 pb-10 px-4">
      <div className="w-full center gap-2">
        <Link
          href="/"
          className="text-light-text-primary dark:text-dark-text-primary center text-lg w-[26px] h-[26px] border border-light-text-primary dark:border-dark-text-primary center"
        >
          E
        </Link>
        <p className="text-xs  text-light-text-secondary dark:text-dark-text-secondary">
          &copy; {currentYear} Made with ❤️ by{" "}
          <span className="font-semibold">Emanuele Sgroi</span>
        </p>
        <div className="h-px w-2 bg-light-text-secondary dark:bg-dark-text-secondary mt-1" />
        <p className=" text-xs text-light-text-secondary dark:text-dark-text-secondary center gap-[3px]">
          Inspired by the design of GitHub <IoLogoGithub size={22} />
        </p>
        <div className="h-px w-2 bg-light-text-secondary dark:bg-dark-text-secondary mt-1" />
        <Link
          href="https://github.com/Emanuele-Sgroi/emanuelesgroi.com"
          target="_blank"
          className="text-xs text-light-text-secondary dark:text-dark-text-secondary hover:text-light-accent-extra hover:dark:text-dark-accent-extra"
        >
          Give it a star ⭐
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
