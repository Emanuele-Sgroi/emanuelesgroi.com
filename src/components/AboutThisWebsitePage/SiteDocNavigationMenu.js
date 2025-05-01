// This component provides a navigation menu for the "About This Website" page.
// It includes a table of contents with scrollable links for quick navigation
// and a mobile-friendly menu using a sidebar drawer.

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

const SiteDocNavigationMenu = ({ t }) => {
  const menuTitles = t.navigationMenu.titles;
  const menuLinks = t.navigationMenu.links;

  const [open, setOpen] = useState(false);

  return (
    <>
      <aside className="max-sm:hidden w-[230px] lg:w-[300px] 2xl:w-[400px] min-h-[calc(100vh-76px)] max-h-[calc(100vh-76px)] sticky top-[76px]  !bg-transparent border-r  border-l border-accent-border ">
        <SiteDocTopSection t={t} />
        <nav className="relative w-full h-[calc(100vh-192px)] !bg-transparent !border-none p-4 lg:!p-6 !overflow-y-auto thin-scrollbar">
          {/* Section Titles (Non-clickable) */}
          <p className="text-text-secondary !text-sm font-semibold mb-2">
            1. {menuTitles.introduction}
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
                {menuLinks.whyBuilt}
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
                {menuLinks.technologiesUsed}
              </ScrollLink>
            </li>
          </ul>

          <p className="text-text-secondary !text-sm font-semibold mb-2">
            2. {menuTitles.design}
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
                {menuLinks.githubStyle}
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
                {menuLinks.extractingUI}
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
                {menuLinks.darkMode}
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
                {menuLinks.responsiveness}
              </ScrollLink>
            </li>
          </ul>

          <p className="text-text-secondary !text-sm font-semibold mb-2">
            3. {menuTitles.techStack}
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
                {menuLinks.nextjs}
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
                {menuLinks.tailwind}
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
                {menuLinks.contentful}
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
                {menuLinks.prisma}
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
                {menuLinks.aiIntegration}
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
                {menuLinks.uiFrameworks}
              </ScrollLink>
            </li>
          </ul>

          <p className="text-text-secondary !text-sm font-semibold mb-2">
            4. {menuTitles.features}
          </p>
          <ul className="mb-4">
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
                {menuLinks.welcome}
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
                {menuLinks.portfolio}
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
                {menuLinks.writings}
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
                {menuLinks.devQuiz}
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
                {menuLinks.discussion}
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
                {menuLinks.contacts}
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
                {menuLinks.manupilot}
              </ScrollLink>
            </li>

            <li className="px-2 flex items-center">
              <ScrollLink
                to="languages"
                smooth={false}
                duration={900}
                spy={true}
                offset={-80}
                activeClass="!bg-bg-button"
                className="flex-1 cursor-pointer text-text-primary px-2 py-2 hover:bg-bg-hover2 rounded-lg"
              >
                {menuLinks.languages}
              </ScrollLink>
            </li>
          </ul>

          <p className="text-text-secondary !text-sm font-semibold mb-2">
            5. {menuTitles.deployment}
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
                {menuLinks.hosting}
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
                {menuLinks.futurePlans}
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
              <p className="text-sm text-accent-icon">
                {t.navigationMenu.mobileButton}
              </p>
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
                    1. {menuTitles.introduction}
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
                        {menuLinks.whyBuilt}
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
                        {menuLinks.technologiesUsed}
                      </ScrollLink>
                    </li>
                  </ul>

                  <p className="text-text-secondary !text-sm font-semibold mb-2">
                    2. {menuTitles.design}
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
                        {menuLinks.githubStyle}
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
                        {menuLinks.extractingUI}
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
                        {menuLinks.darkMode}
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
                        {menuLinks.responsiveness}
                      </ScrollLink>
                    </li>
                  </ul>

                  <p className="text-text-secondary !text-sm font-semibold mb-2">
                    3. {menuTitles.techStack}
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
                        {menuLinks.nextjs}
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
                        {menuLinks.tailwind}
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
                        {menuLinks.contentful}
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
                        {menuLinks.prisma}
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
                        {menuLinks.aiIntegration}
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
                        {menuLinks.uiFrameworks}
                      </ScrollLink>
                    </li>
                  </ul>

                  <p className="text-text-secondary !text-sm font-semibold mb-2">
                    4. {menuTitles.features}
                  </p>
                  <ul className="mb-4">
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
                        {menuLinks.welcome}
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
                        {menuLinks.portfolio}
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
                        {menuLinks.writings}
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
                        {menuLinks.devQuiz}
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
                        {menuLinks.discussion}
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
                        {menuLinks.contacts}
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
                        {menuLinks.manupilot}
                      </ScrollLink>
                    </li>
                    <li className="px-2 flex items-center">
                      <ScrollLink
                        to="languages"
                        smooth={false}
                        onClick={() => setOpen(false)}
                        duration={1500}
                        spy={true}
                        offset={-116}
                        activeClass="!bg-bg-button"
                        className="flex-1 cursor-pointer text-text-primary px-2 py-2 hover:bg-bg-hover2 rounded-lg"
                      >
                        {menuLinks.languages}
                      </ScrollLink>
                    </li>
                  </ul>

                  <p className="text-text-secondary !text-sm font-semibold mb-2">
                    5. {menuTitles.deployment}
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
                        {menuLinks.hosting}
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
                        {menuLinks.futurePlans}
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
