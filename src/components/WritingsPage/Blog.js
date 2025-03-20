"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getAssetUrl } from "@/utils/imageUtils";
import { GoDotFill } from "react-icons/go";

const POSTS_PER_PAGE = 6;

/**
 * Blog Component
 *
 * Displays a list of blog posts with pagination and detailed post information.
 * Each post includes:
 * - A title, description, tags, author, and date.
 * - A main image with hover effects for interactivity.
 * - Pagination controls to navigate between multiple pages of posts.
 *
 * Features:
 * - Supports paginated view with 6 posts per page.
 * - Displays tags for each post with separator dots.
 * - Animates the display of post titles with hover effects.
 * - Displays a "More posts coming soon" message when the last page is reached.
 * - Handles date formatting for when each post was published.
 *
 * Props:
 * - writingsContent: Object containing blog content data such as `blogTitle` and `blogPosts`.
 *    - blogTitle: The title of the blog section.
 *    - blogPosts: Array of blog posts with fields like `mainImage`, `datePosted`, `postTitle`, `smallDescription`, `tags`, and `author`.
 *
 * Pagination:
 * - Tracks the current page and allows users to navigate between pages.
 * - Provides previous, next, and page number controls.
 * - Disables navigation buttons when at the first or last page.
 */

const Blog = ({ writingsContent }) => {
  const { blogTitle, blogPosts } = writingsContent;

  // Access the referenced blog posts
  const blogPostsRef = blogPosts?.map((post) => post.fields);

  // Pagination Logic
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(blogPostsRef.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = blogPostsRef.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE
  );

  return (
    <div className="w-full center px-4 py-6 md:py-12 max-md:bg-bg-mobile-primary max-md:mt-4 max-md:border-b max-md:border-t max-md:border-accent-border">
      <div className="relative w-full max-w-[1280px]">
        <div className="flex">
          <h2 className="text-4xl md:text-7xl font-bold whitespace-nowrap text-nowrap">
            {blogTitle}
          </h2>
        </div>
        {/* Show posts */}
        <div className="grid grid-cols-1 gap-6 lg:gap-8 sm:grid-cols-1 md:grid-cols-2 mt-6 md:mt-8">
          {currentPosts.map((post, i) => {
            const {
              mainImage,
              datePosted,
              postTitle,
              smallDescription,
              tags,
              postSlug,
              author,
            } = post;

            return (
              <div key={i} className="w-full">
                <Link
                  // key={i}
                  href={`/writings/${postSlug}`}
                  className="block overflow-hidden group"
                >
                  <div className="w-full h-full flex flex-col">
                    {/* Main Image */}
                    {mainImage && mainImage.fields?.file?.url && (
                      <div className="relative w-full max-[340px]:h-[215px] max-[450px]:h-[235px] h-[290px] sm:h-[320px] overflow-hidden rounded-md">
                        <Image
                          src={getAssetUrl(mainImage)}
                          alt={postTitle}
                          fill
                          priority
                          className="object-cover object-center w-full h-full transform group-hover:scale-105 transition-all duration-700"
                        />
                      </div>
                    )}

                    {/* Text Content */}
                    <div className="pt-4 flex flex-col justify-between flex-1">
                      <div>
                        {/* Tags */}
                        {tags && tags.length > 0 && (
                          <div className="flex flex-wrap">
                            {tags.map((tag, idx) => (
                              <span
                                key={idx}
                                className="text-xs text-accent-extra flex items-center"
                              >
                                {tag}
                                {/* Show the dot if it's NOT the last tag */}
                                {idx < tags.length - 1 && (
                                  <GoDotFill
                                    size={5}
                                    className="text-text-secondary mx-2"
                                  />
                                )}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Post Title */}
                        <div className="w-fit group relative mt-2 sm:mt-3 mb-2 sm:mb-4">
                          <h1 className="w-fit text-3xl sm:text-5xl font-bold leading-tight text-text-primary z-0">
                            {postTitle}
                          </h1>
                          <span className="max-md:hidden absolute -bottom-2 left-0 w-0 h-px bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 group-hover:w-full transition-all duration-500" />
                        </div>

                        {/* Small Description */}
                        <p className="text-text-secondary mb-2 sm:mb-3">
                          {smallDescription}
                        </p>
                      </div>

                      {/* Author and Date Posted */}
                      <p className="text-sm text-gray-500 mb-1 flex items-center">
                        {author && (
                          <>
                            <span className="text-text-primary font-bold">
                              {author}
                            </span>
                            <span className="mx-2">
                              <GoDotFill
                                size={5}
                                className="text-text-secondary"
                              />
                            </span>
                          </>
                        )}
                        {new Date(datePosted).toLocaleDateString("en-US", {
                          month: "long",
                          day: "2-digit",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </Link>
                <div
                  className={`md:hidden w-full h-px mt-4 bg-accent-border`}
                ></div>
              </div>
            );
          })}
        </div>

        {/* Coming soon text */}
        {currentPage === totalPages && (
          <div className="w-full center mt-8">
            <p className="uppercase sm:text-lg font-bold text-text-secondary text-center ">
              More posts coming soon
            </p>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-6 sm:mt-12 max-[320px]:space-x-0 space-x-2">
            {/* Previous Button */}
            <button
              className={`max-[320px]:px-3 max-[320px]py-1 px-4 py-2 rounded-lg border border-transparent text-sm ${
                currentPage === 1
                  ? "text-text-secondary cursor-not-allowed"
                  : " text-text-link hover:border-accent-border transition"
              }`}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              ← Prev
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`max-[320px]:px-2 max-[320px]py-1 px-3 py-2 rounded-lg text-sm text-text-primary border border-transparent ${
                  currentPage === i + 1
                    ? "bg-text-link"
                    : " hover:border-accent-border transition"
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            {/* Next Button */}
            <button
              className={`max-[320px]:px-3 max-[320px]py-1 px-4 py-2 rounded-lg border border-transparent text-sm ${
                currentPage === totalPages
                  ? "text-text-secondary cursor-not-allowed"
                  : " text-text-link hover:border-accent-border transition"
              }`}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
