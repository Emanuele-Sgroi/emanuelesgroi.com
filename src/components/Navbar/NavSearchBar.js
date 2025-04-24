"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { HiOutlineSearch } from "react-icons/hi";
import { LuSquareSlash, LuBrain } from "react-icons/lu";
import { IoMdCloseCircle, IoMdDownload } from "react-icons/io";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogOverlay,
} from "@/components/ui/dialog";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
  CommandGroup,
} from "@/components/ui/command";
import { useRouter } from "next/navigation";
import {
  RiFolderInfoLine,
  RiHomeSmileLine,
  RiFileListLine,
} from "react-icons/ri";
import { GoCodeSquare, GoCommentDiscussion, GoCopilot } from "react-icons/go";
import { FaRegBookmark } from "react-icons/fa6";
import { GrContact } from "react-icons/gr";
import { getAssetUrl } from "@/utils/imageUtils";
import { HiAcademicCap } from "react-icons/hi2";
import { PiCornersOutBold } from "react-icons/pi";
import { usePathname } from "next/navigation";
import { useChat } from "@/context/ChatProvider";

/**
 * NavSearchBar Component
 *
 * Provides a global search bar for navigating the website.
 * - Searches through projects, blog posts, academic papers, and key website pages.
 * - Supports quick access to ManuPilot's immersive and quick chat modes.
 * - Includes keyboard shortcut "/" to open the search bar.
 * - Displays search results dynamically as the user types.
 * - Highlights search results and allows navigation via keyboard.
 *
 * Props:
 * - generalInfoContent: Object containing general site information.
 * - portfolioContent: Object containing portfolio-related content.
 * - writingsContent: Object containing blog posts and academic papers.
 */

const NavSearchBar = ({
  generalInfoContent,
  portfolioContent,
  writingsContent,
  t,
}) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const { openChat } = useChat();
  const isManupilot = pathname === "/manupilot";

  // Access the referenced projects
  const projectsRef = portfolioContent?.projects?.map(
    (project) => project.fields
  );
  // Access the referenced blog posts
  const blogPostsRef = writingsContent?.blogPosts?.map((post) => post.fields);

  // Access the referenced academic papers from all years
  const academicPapers = [
    ...(writingsContent?.academicPdf3?.map((paper) => ({
      ...paper.fields,
      academicYear: "2023-2024",
    })) || []),
    ...(writingsContent?.academicPdf2?.map((paper) => ({
      ...paper.fields,
      academicYear: "2022-2023",
    })) || []),
    ...(writingsContent?.academicPdf1?.map((paper) => ({
      ...paper.fields,
      academicYear: "2021-2022",
    })) || []),
  ];

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "/" && !open) {
        event.preventDefault();
        setOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const pages = [
    {
      icon: <RiHomeSmileLine size={18} className="text-accent-icon" />,
      name: t.links.welcome,
      path: "/",
    },
    {
      icon: <GoCodeSquare size={18} className="text-accent-icon" />,
      name: t.links.portfolio,
      path: "/portfolio",
    },
    {
      icon: <FaRegBookmark size={18} className="text-accent-icon" />,
      name: t.links.writings,
      path: "/writings",
    },
    {
      icon: <LuBrain size={18} className="text-accent-icon" />,
      name: t.links.devQuiz,
      path: "/dev-quiz",
    },
    {
      icon: <GoCommentDiscussion size={18} className="text-accent-icon" />,
      name: t.links.discussions,
      path: "/discussions",
    },
    {
      icon: <GoCopilot size={18} className="text-accent-icon" />,
      name: t.links.manuPilot,
      path: "/manupilot",
    },
    {
      icon: <GrContact size={18} className="text-accent-icon" />,
      name: t.links.contact,
      path: "/contact",
    },
    {
      icon: <RiFolderInfoLine size={18} className="text-accent-icon" />,
      name: t.links.about,
      path: "/about-this-website",
    },
  ];

  const otherLinks = [
    {
      icon: <RiFileListLine size={18} className="text-accent-icon" />,
      name: t.searchFeature.links.sitemap,
      path: "/sitemap.xml",
      label: t.searchFeature.labels.open,
    },
    {
      icon: <IoMdDownload size={18} className="text-accent-icon" />,
      name: t.links.resume,
      path: generalInfoContent?.resume
        ? getAssetUrl(generalInfoContent.resume)
        : "#",
      label: t.searchFeature.labels.download,
      download: true,
    },
  ];

  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          onClick={() => setOpen(true)}
          className="w-[32px] sm:w-[200px] md:w-[260px] h-[32px] btn-secondary hover:bg-transparent cursor-pointer flex items-center justify-center sm:justify-start"
        >
          <HiOutlineSearch size={18} className="text-accent-icon" />
          <p className="max-sm:hidden text-sm flex items-center gap-1 text-accent-icon">
            {t.searchBarPlaceholder.part1}
            <span>
              <LuSquareSlash size={18} />
            </span>
            {t.searchBarPlaceholder.part2}
          </p>
        </button>
      </DialogTrigger>

      <DialogOverlay className="!flex !items-start !z-[99999999999999999999999999] !bg-gray-100/10 dark:!bg-black/50">
        <DialogContent className="!top-1 !right-1/2 !-translate-y-0 p-0 border-none shadow-lg !w-full max-[1469px]:!max-w-[99%] !max-w-[1459px] !h-screen !max-h-[50%] [&>button]:hidden !z-[99999999999999999999999999]">
          <Command className="!w-full !max-w-full !h-full !max-h-full !border-2 !border-accent-border !rounded-lg !p-3 relative !bg-bg-primary !z-[99999999999999999999999999]">
            {/* Custom Search Icon */}

            <div
              className={`relative w-full !border-x !border-t !border-accent-border !rounded-md px-[2px] !mb-4 transition ${
                isFocused ? "ring-2 ring-blue-500" : ""
              }`}
            >
              <CommandInput
                placeholder={t.searchFeature.placeholder}
                autoFocus
                className="!w-full !rounded-md !pr-8"
                value={searchValue}
                onValueChange={setSearchValue}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
              {searchValue && (
                <button
                  onClick={() => setSearchValue("")}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 w-[34px] h-[34px] p-1 rounded-sm hover:bg-bg-hover transition"
                >
                  <IoMdCloseCircle size={22} className="text-accent-icon" />
                </button>
              )}
            </div>
            <CommandList className="!h-full !max-h-full !overflow-y-auto thin-scrollbar">
              <CommandEmpty>{t.searchFeature.noResults}</CommandEmpty>
              <CommandGroup
                heading={t.searchFeature.titles.projects}
                className="w-full !bg-transparent !border-b !border-accent-border"
              >
                {projectsRef?.map((project, index) => {
                  const { projectTitle, projectSlug, authorImage } = project;
                  return (
                    <CommandItem
                      key={index}
                      onSelect={() => {
                        router.push(`/portfolio/${projectSlug}`);
                        setOpen(false);
                      }}
                      className="!w-full !bg-transparent hover:!bg-bg-hover flex justify-between items-center gap-2 cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <div className="w-[21px] h-[21px] min-w-[21px] min-h-[21px] border border-accent-border rounded-full overflow-hidden">
                          <Image
                            src={getAssetUrl(authorImage)}
                            alt="Profile_Picture"
                            width={21}
                            height={21}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-sm tracking-tight">
                          <span className="text-text-secondary mr-[1px] max-md:hidden">
                            Emanuele-Sgroi/
                          </span>
                          <span className="text-text-primary">
                            {truncateText(projectTitle, 65)}
                          </span>
                        </p>
                      </span>
                      <span className="text-text-secondary max-md:hidden">
                        {t.searchFeature.labels.jump}
                      </span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              <CommandGroup
                heading={t.searchFeature.titles.blog}
                className="w-full !bg-transparent !border-b !border-accent-border"
              >
                {blogPostsRef?.map((post, index) => {
                  const { postTitle, postSlug, imageAuthor } = post;
                  return (
                    <CommandItem
                      key={index}
                      onSelect={() => {
                        router.push(`/writings/${postSlug}`);
                        setOpen(false);
                      }}
                      className="!w-full !bg-transparent hover:!bg-bg-hover flex justify-between items-center gap-2 cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <div className="w-[21px] h-[21px] min-w-[21px] min-h-[21px] border border-accent-border rounded-full overflow-hidden">
                          <Image
                            src={getAssetUrl(imageAuthor)}
                            alt="Author_Picture"
                            width={21}
                            height={21}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-sm tracking-tight">
                          <span className="text-text-secondary mr-[1px] max-md:hidden">
                            Emanuele-Sgroi/
                          </span>
                          <span className="text-text-primary">
                            {truncateText(postTitle, 65)}
                          </span>
                        </p>
                      </span>
                      <span className="text-text-secondary max-md:hidden">
                        {t.searchFeature.labels.read}
                      </span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              {!isManupilot && (
                <CommandGroup
                  heading={t.searchFeature.titles.manupilot}
                  className="w-full !bg-transparent !border-b !border-accent-border"
                >
                  <CommandItem
                    onSelect={() => {
                      router.push("/manupilot");
                      setOpen(false);
                    }}
                    className="!w-full !bg-transparent hover:!bg-bg-hover flex justify-between items-center gap-2 cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <PiCornersOutBold
                        size={18}
                        className="text-accent-icon"
                      />
                      <p className="text-sm tracking-tight text-text-primary">
                        {t.searchFeature.links.immersive}
                      </p>
                    </span>
                    <span className="text-text-secondary max-md:hidden">
                      {t.searchFeature.labels.chat}
                    </span>
                  </CommandItem>
                  <CommandItem
                    onSelect={() => {
                      openChat();
                      setOpen(false);
                    }}
                    className="!w-full !bg-transparent hover:!bg-bg-hover flex justify-between items-center gap-2 cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <GoCopilot size={18} className="text-accent-icon" />
                      <p className="text-sm tracking-tight text-text-primary">
                        {t.searchFeature.links.quickChat}
                      </p>
                    </span>
                    <span className="text-text-secondary max-md:hidden">
                      {t.searchFeature.labels.chat}
                    </span>
                  </CommandItem>
                </CommandGroup>
              )}
              <CommandGroup
                heading={t.searchFeature.titles.papers}
                className="w-full !bg-transparent !border-b !border-accent-border"
              >
                {academicPapers?.map((paper, index) => {
                  const { title, module, academicYear, pdf } = paper;
                  return (
                    <CommandItem
                      key={index}
                      onSelect={() => {
                        if (typeof window !== "undefined") {
                          window.open(getAssetUrl(pdf), "_blank");
                          setOpen(false);
                        }
                      }}
                      className="!w-full !bg-transparent hover:!bg-bg-hover flex justify-between items-center gap-2 cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <HiAcademicCap size={18} className="text-accent-icon" />
                        <p className="text-sm tracking-tight text-text-primary">
                          <span className="text-text-secondary mr-[1px] max-md:hidden">
                            {module}/
                          </span>
                          {truncateText(title, 65)}
                        </p>
                      </span>
                      <span className="text-text-secondary max-md:hidden">
                        {academicYear}
                      </span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              <CommandGroup
                heading={t.searchFeature.titles.pages}
                className="w-full !bg-transparents !border-b !border-accent-border"
              >
                {pages.map((page) => (
                  <CommandItem
                    key={page.path}
                    onSelect={() => {
                      router.push(page.path);
                      setOpen(false);
                    }}
                    className="!w-full !bg-transparent hover:!bg-bg-hover flex justify-between items-center gap-2 cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      {page.icon}
                      {page.name}
                    </span>
                    <span className="text-text-secondary max-md:hidden">
                      {t.searchFeature.labels.visit}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandGroup heading="Other" className="w-full !bg-transparent">
                {otherLinks.map((link) => (
                  <CommandItem
                    key={link.name}
                    onSelect={() => {
                      if (typeof window !== "undefined") {
                        window.open(link.path, "_blank");
                        setOpen(false);
                      }
                    }}
                    className="!w-full !bg-transparent hover:!bg-bg-hover flex justify-between items-center gap-2 cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      {link.icon}
                      {link.name}
                    </span>
                    <span className="text-text-secondary max-md:hidden">
                      {link.label}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};

export default NavSearchBar;
