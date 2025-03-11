"use client";

import React from "react";
import { Link as ScrollLink } from "react-scroll";
import { Button } from "@/components/ui/button";
import { FiGithub } from "react-icons/fi";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const SiteDocContentRight = () => {
  return (
    <>
      <aside className="max-md:hidden w-[230px] lg:w-[250px] 2xl:w-[400px] min-h-[calc(100vh-76px)] max-h-[calc(100vh-76px)] sticky top-[76px] !bg-transparent border-r border-l border-accent-border p-4 lg:p-6">
        {/* Title */}
        <h2 className="text-xl font-bold mb-2">What&apos;s this?</h2>

        {/* Short Description */}
        <p className="text-text-secondary text-sm mb-6">
          Welcome to {'"'}About This Website{'"'}, a behind-the-scenes look at
          how I built this GitHub-inspired portfolio. If you&apos;re curious
          about the design choices, tech stack, or unique features (like the AI
          chatbot), this is the right place!
        </p>

        {/* Buttons Section */}
        <div className="flex flex-col gap-3">
          {/* Source Code Button */}
          <a
            href="https://github.com/Emanuele-Sgroi/emanuelesgroi.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="w-full">
              <FiGithub size={20} className="w-4 h-4 mr-2" />
              View on GitHub
            </Button>
          </a>

          {/* Scroll to Top */}
          <ScrollLink to="top" smooth={false} duration={500}>
            <button className="flex items-center gap-2 text-base text-text-link mt-12 mb-6">
              <FaArrowUp size={18} />
              Go to Top
            </button>
          </ScrollLink>

          {/* Scroll to Bottom */}
          <ScrollLink to="bottom" smooth={false} duration={500}>
            <button className="flex items-center gap-2 text-base text-text-link">
              <FaArrowDown size={18} />
              Go to Bottom
            </button>
          </ScrollLink>
        </div>
      </aside>
      <div className="md:hidden fixed right-6 bottom-24 center flex-col gap-2">
        {/* Source Code Button */}
        <a
          href="https://github.com/Emanuele-Sgroi/emanuelesgroi.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="w-[40px] h-[40px] p-0 rounded-full center">
            <FiGithub size={20} />
          </Button>
        </a>

        {/* Scroll to Top */}
        <ScrollLink to="top" smooth={false} duration={1000} offset={-76}>
          <Button className="w-[40px] h-[40px] p-0 rounded-full center">
            <FaArrowUp size={20} />
          </Button>
        </ScrollLink>

        {/* Scroll to Bottom */}
        <ScrollLink to="bottom" smooth={false} duration={1000} offset={-76}>
          <Button className="w-[40px] h-[40px] p-0 rounded-full center">
            <FaArrowDown size={20} />
          </Button>
        </ScrollLink>
      </div>
    </>
  );
};

export default SiteDocContentRight;
