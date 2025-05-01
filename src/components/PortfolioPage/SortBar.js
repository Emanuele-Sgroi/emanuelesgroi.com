"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { TbLayoutListFilled } from "react-icons/tb";
import { BsFillGridFill } from "react-icons/bs";
import { GoTriangleDown } from "react-icons/go";
import { GoCopilot } from "react-icons/go";
import { FaRandom } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useChat } from "@/context/ChatProvider";

/**
 * SortBar Component
 *
 * Provides sorting and filtering options for the portfolio page.
 * - Allows users to toggle between list and grid layouts.
 * - Filters projects by technology tags.
 * - Includes a "Random" button to navigate to a random project.
 * - Integrates a button to ask ManuPilot AI for assistance.
 *
 * Props:
 * - portfolio: Object containing portfolio projects.
 * - activeLayout: String indicating the current layout ("list" or "grid").
 * - setActiveLayout: Function to update the active layout.
 * - selectedTag: String representing the currently selected technology tag.
 * - setSelectedTag: Function to update the selected tag.
 */

const SortBar = ({
  portfolio,
  activeLayout,
  setActiveLayout,
  selectedTag,
  setSelectedTag,
  t,
}) => {
  const router = useRouter();
  const { openChat } = useChat();
  const [open, setOpen] = React.useState(false);

  // Access the referenced projects
  const projectsRef = portfolio?.projects?.map((project) => project.fields);

  // Extract and deduplicate tags
  // const uniqueTags = Array.from(
  //   new Set(projectsRef?.flatMap((project) => project.techTags) || [])
  // ).map((tag) => ({
  //   value: tag.toLowerCase().replace(/\s+/g, "-"), // Convert to lowercase with hyphens
  //   label: tag, // Keep the original name
  // }));

  // Extract, dedupe and alphabetically sort tags
  const uniqueTags = Array.from(
    new Set(projectsRef?.flatMap((project) => project.techTags) || [])
  )
    // sort the raw tag strings (before mapping to objects)
    .sort((a, b) => a.localeCompare(b))
    .map((tag) => ({
      value: tag.toLowerCase().replace(/\s+/g, "-"),
      label: tag,
    }));

  // Handle random project redirection
  const handleRandomProject = () => {
    if (projectsRef.length === 0) return;

    const randomIndex = Math.floor(Math.random() * projectsRef.length);
    const randomProject = projectsRef[randomIndex];

    if (randomProject?.projectSlug) {
      router.push(`/portfolio/${randomProject.projectSlug}`);
    }
  };

  return (
    <div className="w-full flex max-[1195px]:flex-col max-[1195px]:items-start items-center max-[335px]:gap-3 gap-4 border-b border-accent-border  pb-6 md:pb-4 max-md:px-6 max-md:pt-6 max-md:bg-bg-mobile-primary">
      <div className="max-[935px]:w-full flex items-center max-[935px]:justify-between max-[335px]:gap-3 gap-4 flex-wrap">
        <div className="center gap-2">
          <p className="max-md:text-sm">{t.layout}</p>
          <div className="flex items-center gap-2 rounded-md ">
            <button
              onClick={() => setActiveLayout("list")}
              className={`btn-tertiary max-[375px]:!p-3 !gap-2 ${
                activeLayout === "list"
                  ? " !bg-bg-button "
                  : "!bg-transparent hover:!bg-bg-hover2"
              }`}
            >
              <TbLayoutListFilled
                size={15}
                className={`${
                  activeLayout === "list"
                    ? "text-accent-active"
                    : "text-text-secondary dark:text-accent-icon"
                }`}
              />
              <span className="max-[375px]:hidden max-md:text-sm">
                {t.list}
              </span>
            </button>
            <button
              onClick={() => setActiveLayout("grid")}
              className={`btn-tertiary max-[375px]:!p-3  !gap-2 ${
                activeLayout === "grid"
                  ? " !bg-bg-button "
                  : "!bg-transparent hover:!bg-bg-hover2"
              }`}
            >
              <BsFillGridFill
                size={15}
                className={`${
                  activeLayout === "grid"
                    ? "text-accent-active"
                    : "text-text-secondary dark:text-accent-icon"
                }`}
              />
              <span className="max-[375px]:hidden max-md:text-sm">
                {t.grid}
              </span>
            </button>
          </div>
        </div>
        <div className="max-[552px]:w-full min-[936px]:hidden flex items-center max-sm:justify-between max-[335px]:gap-3 gap-2 max-[375px]:flex-wrap">
          {/* Random Button */}
          <button
            onClick={handleRandomProject}
            className="max-[552px]:w-full max-[552px]:!justify-center center gap-2 btn-tertiary !text-sm md:!text-base !font-semibold"
          >
            <FaRandom size={16} />
            {t.random}
          </button>
          {/* ManuPilot Button */}
          <button className="max-[552px]:w-full center gap-2 btn-primary !text-sm md:!text-base !font-semibold">
            <GoCopilot size={16} />
            {t.askManupilot}
          </button>
        </div>
      </div>
      <span className="text-accent-icon text-lg max-[1215px]:hidden">|</span>

      <div className="w-full flex max-sm:flex-col-reverse sm:items-center max-[335px]:gap-3 gap-4 flex-wrap">
        {/* Filter by tag */}
        <div className="center gap-1 flex-1 max-[370px]:flex-col max-[370px]:items-start">
          {selectedTag && (
            <button
              onClick={() => {
                setSelectedTag(""); // Clears the selection
                setOpen(false);
              }}
            >
              <IoIosCloseCircle
                size={22}
                className="text-text-secondary dark:text-text-primary hover:text-red-500 dark:hover:text-red-500"
              />
            </button>
          )}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="flex-1 btn-tertiary max-[920px]:min-w-[240px] max-[335px]:min-w-full max-md:text-sm"
              >
                {selectedTag
                  ? uniqueTags.find((tag) => tag.value === selectedTag)?.label
                  : t.filter}
                <GoTriangleDown size={18} className="text-accent-icon mt-1" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="max-w-full flex-1 p-0 !bg-bg-tertiary !border-accent-border thin-scrollbar">
              <Command>
                <CommandInput placeholder={t.placeholder} />
                <CommandList>
                  <CommandEmpty>{t.noFound}</CommandEmpty>
                  <CommandGroup className="!p-0">
                    <CommandItem
                      key="all"
                      value=""
                      onSelect={() => {
                        setSelectedTag(""); // Clears the selection
                        setOpen(false);
                      }}
                      className="text-text-primary !flex !gap-1 !items-center !rounded-none data-[selected='true']:!bg-transparent dark:data-[selected='true']:!bg-transparent group/item"
                    >
                      {/* <FaAngleRight size={16} className="text-accent-icon" /> */}
                      <span className="relative flex items-center gap-3 !z-50">
                        <FaCheck
                          className={`!w-[14px] !h-auto !text-text-primary !ml-2 ${
                            !selectedTag ? "visible" : "invisible"
                          }`}
                        />
                        {t.all}
                      </span>
                      <div className="group/edit invisible group-hover/item:visible absolute top-0 left-0 w-full h-full !bg-bg-hover dark:!bg-bg-hover2 !z-10" />
                    </CommandItem>
                    {uniqueTags.map((tag) => (
                      <CommandItem
                        key={tag.value}
                        value={tag.value}
                        onSelect={() => {
                          setSelectedTag(tag.value);
                          setOpen(false);
                          console.log(tag.value);
                        }}
                        className="!rounded-none !border-t !border-accent-border data-[selected='true']:!bg-transparent dark:data-[selected='true']:!bg-transparent group/item"
                      >
                        {/* {value === tag.value && <FaCheck />} */}
                        <span className="relative flex items-center gap-3 !z-50">
                          <FaCheck
                            className={`!w-[14px] !h-auto !text-text-primary !ml-2 ${
                              selectedTag === tag.value
                                ? "visible"
                                : "invisible"
                            }`}
                          />
                          {tag.label}
                        </span>
                        <div className="group/edit invisible group-hover/item:visible absolute top-0 left-0 w-full h-full !bg-bg-hover dark:!bg-bg-hover2 !z-10" />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className="max-[935px]:hidden flex items-center max-sm:justify-between gap-4 flex-wrap">
          {/* Random Button */}
          <button
            onClick={handleRandomProject}
            className="center gap-2 btn-tertiary !text-base !font-semibold"
          >
            <FaRandom size={16} />
            {t.random}
          </button>
          {/* ManuPilot Button */}
          <button
            onClick={openChat}
            className="center gap-2 btn-primary ! !text-base !font-semibold"
          >
            <GoCopilot size={16} />
            {t.askManupilot}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SortBar;
