"use client";

import React, { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import SiteDocTopSection from "./SiteDocTopSection";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { RiMenuLine } from "react-icons/ri";

const SiteDocNavigationMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <aside className="max-sm:hidden w-[230px] lg:w-[300px] 2xl:w-[400px] min-h-[calc(100vh-76px)] max-h-[calc(100vh-76px)] sticky top-[76px]  !bg-transparent border-r  border-l border-accent-border ">
        <SiteDocTopSection />
        <nav className="relative w-full h-[calc(100vh-192px)] !bg-transparent !border-none p-4 lg:!p-6 !overflow-y-auto thin-scrollbar">
          {/* Section Titles (Non-clickable) */}
          <p className="text-text-secondary !text-sm font-semibold mb-2">
            1. Introduction
          </p>
          <ul className="mb-4">
            <li className="px-2 flex items-center">
              <ScrollLink
                to="why-built"
                smooth={false}
                duration={900}
                spy={true}
                offset={-80}
                activeClass="!bg-bg-button"
                className="flex-1 cursor-pointer text-text-primary px-2 py-2 hover:bg-bg-hover2 rounded-lg"
              >
                Why I Built This
              </ScrollLink>
            </li>
            <li className="px-2 flex items-center">
              <ScrollLink
                to="technologies-used"
                smooth={false}
                duration={900}
                spy={true}
                offset={-80}
                activeClass="!bg-bg-button"
                className="flex-1 cursor-pointer text-text-primary px-2 py-2 hover:bg-bg-hover2 rounded-lg"
              >
                Key Technologies
              </ScrollLink>
            </li>
          </ul>

          <p className="text-text-secondary !text-sm font-semibold mb-2">
            2. Design & UI
          </p>
          <ul className="mb-4">
            <li className="px-2 flex items-center">
              <ScrollLink
                to="github-style"
                smooth={false}
                duration={900}
                spy={true}
                offset={-80}
                activeClass="!bg-bg-button"
                className="flex-1 cursor-pointer text-text-primary px-2 py-2 hover:bg-bg-hover2 rounded-lg"
              >
                GitHub-Style Inspiration
              </ScrollLink>
            </li>
            <li className="px-2 flex items-center">
              <ScrollLink
                to="extracting-ui"
                smooth={false}
                duration={900}
                spy={true}
                offset={-80}
                activeClass="!bg-bg-button"
                className="flex-1 cursor-pointer text-text-primary px-2 py-2 hover:bg-bg-hover2 rounded-lg"
              >
                Extracting GitHub&apos;s UI Elements
              </ScrollLink>
            </li>
            <li className="px-2 flex items-center">
              <ScrollLink
                to="dark-mode"
                smooth={false}
                duration={900}
                spy={true}
                offset={-80}
                activeClass="!bg-bg-button"
                className="flex-1 cursor-pointer text-text-primary px-2 py-2 hover:bg-bg-hover2 rounded-lg"
              >
                Dark Mode
              </ScrollLink>
            </li>
            <li className="px-2 flex items-center">
              <ScrollLink
                to="Responsiveness"
                smooth={false}
                duration={900}
                spy={true}
                offset={-80}
                activeClass="!bg-bg-button"
                className="flex-1 cursor-pointer text-text-primary px-2 py-2 hover:bg-bg-hover2 rounded-lg"
              >
                Responsiveness
              </ScrollLink>
            </li>
          </ul>

          <p className="text-text-secondary !text-sm font-semibold mb-2">
            3. Tech Stack
          </p>
          <ul className="mb-4">
            <li className="px-2 flex items-center">
              <ScrollLink
                to="nextjs"
                smooth={false}
                duration={900}
                spy={true}
                offset={-80}
                activeClass="!bg-bg-button"
                className="flex-1 cursor-pointer text-text-primary px-2 py-2 hover:bg-bg-hover2 rounded-lg"
              >
                Next.js
              </ScrollLink>
            </li>
            <li className="px-2 flex items-center">
              <ScrollLink
                to="tailwind"
                smooth={false}
                duration={900}
                spy={true}
                offset={-80}
                activeClass="!bg-bg-button"
                className="flex-1 cursor-pointer text-text-primary px-2 py-2 hover:bg-bg-hover2 rounded-lg"
              >
                Tailwind CSS & Plain CSS
              </ScrollLink>
            </li>
            <li className="px-2 flex items-center">
              <ScrollLink
                to="contentful"
                smooth={false}
                duration={900}
                spy={true}
                offset={-80}
                activeClass="!bg-bg-button"
                className="flex-1 cursor-pointer text-text-primary px-2 py-2 hover:bg-bg-hover2 rounded-lg"
              >
                Contentful as a CMS
              </ScrollLink>
            </li>
            <li className="px-2 flex items-center">
              <ScrollLink
                to="prisma"
                smooth={false}
                duration={900}
                spy={true}
                offset={-80}
                activeClass="!bg-bg-button"
                className="flex-1 cursor-pointer text-text-primary px-2 py-2 hover:bg-bg-hover2 rounded-lg"
              >
                Prisma & Supabase
              </ScrollLink>
            </li>
            <li className="px-2 flex items-center">
              <ScrollLink
                to="ai-integration"
                smooth={false}
                duration={900}
                spy={true}
                offset={-80}
                activeClass="!bg-bg-button"
                className="flex-1 cursor-pointer text-text-primary px-2 py-2 hover:bg-bg-hover2 rounded-lg"
              >
                AI Integration
              </ScrollLink>
            </li>
            <li className="px-2 flex items-center">
              <ScrollLink
                to="ui-frameworks"
                smooth={false}
                duration={900}
                spy={true}
                offset={-80}
                activeClass="!bg-bg-button"
                className="flex-1 cursor-pointer text-text-primary px-2 py-2 hover:bg-bg-hover2 rounded-lg"
              >
                UI Frameworks
              </ScrollLink>
            </li>
          </ul>

          <p className="text-text-secondary !text-sm font-semibold mb-2">
            4. Features Breakdown
          </p>
          <ul className="mb-4">
            {/* <li className="px-2 flex items-center">
            <ScrollLink
              to="side-profile-bar"
              smooth={false}
                        
              duration={900}
              spy={true}
              offset={-80}
              activeClass="!bg-bg-button"
              className="flex-1 cursor-pointer text-text-primary px-2 py-2 hover:bg-bg-hover2 rounded-lg"
            >
              Side Profile Bar GitHub Style
            </ScrollLink>
          </li> */}
            <li className="px-2 flex items-center">
              <ScrollLink
                to="welcome-page"
                smooth={false}
                duration={900}
                spy={true}
                offset={-80}
                activeClass="!bg-bg-button"
                className="flex-1 cursor-pointer text-text-primary px-2 py-2 hover:bg-bg-hover2 rounded-lg"
              >
                Welcome
              </ScrollLink>
            </li>
            <li className="px-2 flex items-center">
              <ScrollLink
                to="portfolio"
                smooth={false}
                duration={900}
                spy={true}
                offset={-80}
                activeClass="!bg-bg-button"
                className="flex-1 cursor-pointer text-text-primary px-2 py-2 hover:bg-bg-hover2 rounded-lg"
              >
                Portfolio
              </ScrollLink>
            </li>
            <li className="px-2 flex items-center">
              <ScrollLink
                to="writings"
                smooth={false}
                duration={900}
                spy={true}
                offset={-80}
                activeClass="!bg-bg-button"
                className="flex-1 cursor-pointer text-text-primary px-2 py-2 hover:bg-bg-hover2 rounded-lg"
              >
                Writings
              </ScrollLink>
            </li>
            <li className="px-2 flex items-center">
              <ScrollLink
                to="dev-quiz"
                smooth={false}
                duration={900}
                spy={true}
                offset={-80}
                activeClass="!bg-bg-button"
                className="flex-1 cursor-pointer text-text-primary px-2 py-2 hover:bg-bg-hover2 rounded-lg"
              >
                Dev Quiz
              </ScrollLink>
            </li>
            <li className="px-2 flex items-center">
              <ScrollLink
                to="discussion"
                smooth={false}
                duration={900}
                spy={true}
                offset={-80}
                activeClass="!bg-bg-button"
                className="flex-1 cursor-pointer text-text-primary px-2 py-2 hover:bg-bg-hover2 rounded-lg"
              >
                Discussion
              </ScrollLink>
            </li>
            <li className="px-2 flex items-center">
              <ScrollLink
                to="contacts"
                smooth={false}
                duration={900}
                spy={true}
                offset={-80}
                activeClass="!bg-bg-button"
                className="flex-1 cursor-pointer text-text-primary px-2 py-2 hover:bg-bg-hover2 rounded-lg"
              >
                Contacts
              </ScrollLink>
            </li>
            <li className="px-2 flex items-center">
              <ScrollLink
                to="manupilot-ai"
                smooth={false}
                duration={900}
                spy={true}
                offset={-80}
                activeClass="!bg-bg-button"
                className="flex-1 cursor-pointer text-text-primary px-2 py-2 hover:bg-bg-hover2 rounded-lg"
              >
                ManuPilot AI
              </ScrollLink>
            </li>
          </ul>

          <p className="text-text-secondary !text-sm font-semibold mb-2">
            5. Deployment & Future Plans
          </p>
          <ul className="">
            <li className="px-2 flex items-center">
              <ScrollLink
                to="hosting"
                smooth={false}
                duration={900}
                spy={true}
                offset={-80}
                activeClass="!bg-bg-button"
                className="flex-1 cursor-pointer text-text-primary px-2 py-2 hover:bg-bg-hover2 rounded-lg"
              >
                Hosting & CI/CD
              </ScrollLink>
            </li>
            <li className="px-2 flex items-center">
              <ScrollLink
                to="future-plans"
                smooth={false}
                duration={900}
                spy={true}
                offset={-80}
                activeClass="!bg-bg-button"
                className="flex-1 cursor-pointer text-text-primary px-2 py-2 hover:bg-bg-hover2 rounded-lg"
              >
                What&apos;s Next?
              </ScrollLink>
            </li>
          </ul>
        </nav>
      </aside>

      <div className="sm:hidden w-full bg-bg-mobile-primary border-b border-accent-border px-4 py-2 sticky top-[76px]">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <div className="sm:hidden  flex items-center gap-2">
              <RiMenuLine size={20} className="text-accent-icon" />{" "}
              <p className="text-sm text-accent-icon">Navigation Menu</p>
            </div>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="sm:hidden !border-r !border-accent-border !bg-bg-primary !overflow-y-auto thin-scrollbar z-[9999]"
          >
            <SheetHeader>
              <SheetDescription>
                <nav className="!bg-transparent !border-none">
                  {/* Section Titles (Non-clickable) */}
                  <p className="text-text-secondary !text-sm font-semibold mb-2">
                    1. Introduction
                  </p>
                  <ul className="mb-4">
                    <li className="px-2 flex items-center">
                      <ScrollLink
                        to="why-built"
                        smooth={false}
                        onClick={() => setOpen(false)}
                        duration={1500}
                        spy={true}
                        offset={-116}
                        activeClass="!bg-bg-button"
                        className="flex-1 cursor-pointer text-text-primary px-2 py-2 hover:bg-bg-hover2 rounded-lg"
                      >
                        Why I Built This
                      </ScrollLink>
                    </li>
                    <li className="px-2 flex items-center">
                      <ScrollLink
                        to="technologies-used"
                        smooth={false}
                        onClick={() => setOpen(false)}
                        duration={1500}
                        spy={true}
                        offset={-116}
                        activeClass="!bg-bg-button"
                        className="flex-1 cursor-pointer text-text-primary px-2 py-2 hover:bg-bg-hover2 rounded-lg"
                      >
                        Key Technologies
                      </ScrollLink>
                    </li>
                  </ul>

                  <p className="text-text-secondary !text-sm font-semibold mb-2">
                    2. Design & UI
                  </p>
                  <ul className="mb-4">
                    <li className="px-2 flex items-center">
                      <ScrollLink
                        to="github-style"
                        smooth={false}
                        onClick={() => setOpen(false)}
                        duration={1500}
                        spy={true}
                        offset={-116}
                        activeClass="!bg-bg-button"
                        className="flex-1 cursor-pointer text-text-primary px-2 py-2 hover:bg-bg-hover2 rounded-lg"
                      >
                        GitHub-Style Inspiration
                      </ScrollLink>
                    </li>
                    <li className="px-2 flex items-center">
                      <ScrollLink
                        to="extracting-ui"
                        smooth={false}
                        onClick={() => setOpen(false)}
                        duration={1500}
                        spy={true}
                        offset={-116}
                        activeClass="!bg-bg-button"
                        className="flex-1 cursor-pointer text-text-primary px-2 py-2 hover:bg-bg-hover2 rounded-lg"
                      >
                        Extracting GitHub&apos;s UI Elements
                      </ScrollLink>
                    </li>
                    <li className="px-2 flex items-center">
                      <ScrollLink
                        to="dark-mode"
                        smooth={false}
                        onClick={() => setOpen(false)}
                        duration={1500}
                        spy={true}
                        offset={-116}
                        activeClass="!bg-bg-button"
                        className="flex-1 cursor-pointer text-text-primary px-2 py-2 hover:bg-bg-hover2 rounded-lg"
                      >
                        Dark Mode
                      </ScrollLink>
                    </li>
                    <li className="px-2 flex items-center">
                      <ScrollLink
                        to="Responsiveness"
                        smooth={false}
                        onClick={() => setOpen(false)}
                        duration={1500}
                        spy={true}
                        offset={-116}
                        activeClass="!bg-bg-button"
                        className="flex-1 cursor-pointer text-text-primary px-2 py-2 hover:bg-bg-hover2 rounded-lg"
                      >
                        Responsiveness
                      </ScrollLink>
                    </li>
                  </ul>

                  <p className="text-text-secondary !text-sm font-semibold mb-2">
                    3. Tech Stack
                  </p>
                  <ul className="mb-4">
                    <li className="px-2 flex items-center">
                      <ScrollLink
                        to="nextjs"
                        smooth={false}
                        onClick={() => setOpen(false)}
                        duration={1500}
                        spy={true}
                        offset={-116}
                        activeClass="!bg-bg-button"
                        className="flex-1 cursor-pointer text-text-primary px-2 py-2 hover:bg-bg-hover2 rounded-lg"
                      >
                        Next.js
                      </ScrollLink>
                    </li>
                    <li className="px-2 flex items-center">
                      <ScrollLink
                        to="tailwind"
                        smooth={false}
                        onClick={() => setOpen(false)}
                        duration={1500}
                        spy={true}
                        offset={-116}
                        activeClass="!bg-bg-button"
                        className="flex-1 cursor-pointer text-text-primary px-2 py-2 hover:bg-bg-hover2 rounded-lg"
                      >
                        Tailwind CSS & Plain CSS
                      </ScrollLink>
                    </li>
                    <li className="px-2 flex items-center">
                      <ScrollLink
                        to="contentful"
                        smooth={false}
                        onClick={() => setOpen(false)}
                        duration={1500}
                        spy={true}
                        offset={-116}
                        activeClass="!bg-bg-button"
                        className="flex-1 cursor-pointer text-text-primary px-2 py-2 hover:bg-bg-hover2 rounded-lg"
                      >
                        Contentful as a CMS
                      </ScrollLink>
                    </li>
                    <li className="px-2 flex items-center">
                      <ScrollLink
                        to="prisma"
                        smooth={false}
                        onClick={() => setOpen(false)}
                        duration={1500}
                        spy={true}
                        offset={-116}
                        activeClass="!bg-bg-button"
                        className="flex-1 cursor-pointer text-text-primary px-2 py-2 hover:bg-bg-hover2 rounded-lg"
                      >
                        Prisma & Supabase
                      </ScrollLink>
                    </li>
                    <li className="px-2 flex items-center">
                      <ScrollLink
                        to="ai-integration"
                        smooth={false}
                        onClick={() => setOpen(false)}
                        duration={1500}
                        spy={true}
                        offset={-116}
                        activeClass="!bg-bg-button"
                        className="flex-1 cursor-pointer text-text-primary px-2 py-2 hover:bg-bg-hover2 rounded-lg"
                      >
                        AI Integration
                      </ScrollLink>
                    </li>
                    <li className="px-2 flex items-center">
                      <ScrollLink
                        to="ui-frameworks"
                        smooth={false}
                        onClick={() => setOpen(false)}
                        duration={1500}
                        spy={true}
                        offset={-116}
                        activeClass="!bg-bg-button"
                        className="flex-1 cursor-pointer text-text-primary px-2 py-2 hover:bg-bg-hover2 rounded-lg"
                      >
                        UI Frameworks
                      </ScrollLink>
                    </li>
                  </ul>

                  <p className="text-text-secondary !text-sm font-semibold mb-2">
                    4. Features Breakdown
                  </p>
                  <ul className="mb-4">
                    {/* <li className="px-2 flex items-center">
            <ScrollLink
              to="side-profile-bar"
              smooth={false}
                        onClick={() => setOpen(false)}
              duration={1500}
              spy={true}
              offset={-116}
              activeClass="!bg-bg-button"
              className="flex-1 cursor-pointer text-text-primary px-2 py-2 hover:bg-bg-hover2 rounded-lg"
            >
              Side Profile Bar GitHub Style
            </ScrollLink>
          </li> */}
                    <li className="px-2 flex items-center">
                      <ScrollLink
                        to="welcome-page"
                        smooth={false}
                        onClick={() => setOpen(false)}
                        duration={1500}
                        spy={true}
                        offset={-116}
                        activeClass="!bg-bg-button"
                        className="flex-1 cursor-pointer text-text-primary px-2 py-2 hover:bg-bg-hover2 rounded-lg"
                      >
                        Welcome
                      </ScrollLink>
                    </li>
                    <li className="px-2 flex items-center">
                      <ScrollLink
                        to="portfolio"
                        smooth={false}
                        onClick={() => setOpen(false)}
                        duration={1500}
                        spy={true}
                        offset={-116}
                        activeClass="!bg-bg-button"
                        className="flex-1 cursor-pointer text-text-primary px-2 py-2 hover:bg-bg-hover2 rounded-lg"
                      >
                        Portfolio
                      </ScrollLink>
                    </li>
                    <li className="px-2 flex items-center">
                      <ScrollLink
                        to="writings"
                        smooth={false}
                        onClick={() => setOpen(false)}
                        duration={1500}
                        spy={true}
                        offset={-116}
                        activeClass="!bg-bg-button"
                        className="flex-1 cursor-pointer text-text-primary px-2 py-2 hover:bg-bg-hover2 rounded-lg"
                      >
                        Writings
                      </ScrollLink>
                    </li>
                    <li className="px-2 flex items-center">
                      <ScrollLink
                        to="dev-quiz"
                        smooth={false}
                        onClick={() => setOpen(false)}
                        duration={1500}
                        spy={true}
                        offset={-116}
                        activeClass="!bg-bg-button"
                        className="flex-1 cursor-pointer text-text-primary px-2 py-2 hover:bg-bg-hover2 rounded-lg"
                      >
                        Dev Quiz
                      </ScrollLink>
                    </li>
                    <li className="px-2 flex items-center">
                      <ScrollLink
                        to="discussion"
                        smooth={false}
                        onClick={() => setOpen(false)}
                        duration={1500}
                        spy={true}
                        offset={-116}
                        activeClass="!bg-bg-button"
                        className="flex-1 cursor-pointer text-text-primary px-2 py-2 hover:bg-bg-hover2 rounded-lg"
                      >
                        Discussion
                      </ScrollLink>
                    </li>
                    <li className="px-2 flex items-center">
                      <ScrollLink
                        to="contacts"
                        smooth={false}
                        onClick={() => setOpen(false)}
                        duration={1500}
                        spy={true}
                        offset={-116}
                        activeClass="!bg-bg-button"
                        className="flex-1 cursor-pointer text-text-primary px-2 py-2 hover:bg-bg-hover2 rounded-lg"
                      >
                        Contacts
                      </ScrollLink>
                    </li>
                    <li className="px-2 flex items-center">
                      <ScrollLink
                        to="manupilot-ai"
                        smooth={false}
                        onClick={() => setOpen(false)}
                        duration={1500}
                        spy={true}
                        offset={-116}
                        activeClass="!bg-bg-button"
                        className="flex-1 cursor-pointer text-text-primary px-2 py-2 hover:bg-bg-hover2 rounded-lg"
                      >
                        ManuPilot AI
                      </ScrollLink>
                    </li>
                  </ul>

                  <p className="text-text-secondary !text-sm font-semibold mb-2">
                    5. Deployment & Future Plans
                  </p>
                  <ul className="">
                    <li className="px-2 flex items-center">
                      <ScrollLink
                        to="hosting"
                        smooth={false}
                        onClick={() => setOpen(false)}
                        duration={1500}
                        spy={true}
                        offset={-116}
                        activeClass="!bg-bg-button"
                        className="flex-1 cursor-pointer text-text-primary px-2 py-2 hover:bg-bg-hover2 rounded-lg"
                      >
                        Hosting & CI/CD
                      </ScrollLink>
                    </li>
                    <li className="px-2 flex items-center">
                      <ScrollLink
                        to="future-plans"
                        smooth={false}
                        onClick={() => setOpen(false)}
                        duration={1500}
                        spy={true}
                        offset={-116}
                        activeClass="!bg-bg-button"
                        className="flex-1 cursor-pointer text-text-primary px-2 py-2 hover:bg-bg-hover2 rounded-lg"
                      >
                        What&apos;s Next?
                      </ScrollLink>
                    </li>
                  </ul>
                </nav>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default SiteDocNavigationMenu;
