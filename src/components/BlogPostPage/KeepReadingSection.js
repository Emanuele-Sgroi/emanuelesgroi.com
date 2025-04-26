"use client";

import React from "react";
import { useWritingsContent } from "@/hooks/useWritingsContent";
import Image from "next/image";
import Link from "next/link";
import { getAssetUrl } from "@/utils/imageUtils";
import { GoDotFill } from "react-icons/go";

/**
 * KeepReadingSection Component
 *
 * Displays a list of related blog posts to encourage further reading.
 * - Fetches all writings from the CMS.
 * - Filters out the currently open blog post.
 * - Displays either 1 featured post or up to 3 suggested posts.
 */

const KeepReadingSection = ({ blogPost, writingsContent, t, language }) => {
  //if (!writingsContent?.blogPosts?.length) return null;

  // const { writingsContent, isWritingsError } = useWritingsContent();

  // // Access the referenced blog posts
  // const blogPostsRef = writingsContent?.blogPosts?.map((post) => post.fields);

  // // Filter out the blog post to exclude the open one
  // const filteredBlogPosts = blogPostsRef?.filter(
  //   (post) => post.postSlug !== blogPost.postSlug
  // );
  // early return if we didn’t get the list (or it’s empty)
  if (!writingsContent?.blogPosts?.length) return null;

  // extract the posts (each entry’s fields were sent already)
  const allPosts = writingsContent.blogPosts.map((p) => p.fields);

  // strip current article and cap to 3
  const related = allPosts
    .filter((p) => p.postSlug !== blogPost.postSlug)
    .slice(0, 3);

  if (!related.length) return null; // nothing to suggest
  // Render only if there are additional blog posts to display
  return (
    <div className="w-full center max-[500px]:px-4 px-6 pt-20 md:pt-32">
      <div className="w-full max-w-[1232px] flex flex-col items-start justify-start">
        {/* Section Title */}
        <h3 className="text-text-primary text-left poppins-bold text-xl sm:text-3xl">
          {t.keepReading}
        </h3>
        {/* Display a single featured post if only one is available */}
        <div className="w-full h-[2px] bg-accent-border mt-3 mb-6"></div>
        {related && related.length === 1 && (
          <div className="w-full flex justify-start items-start">
            {related.slice(0, 1).map((post, i) => {
              const {
                mainImage,
                datePosted,
                postTitle,
                smallDescription,
                tags,
                postSlug,
              } = post;
              return (
                <Link key={i} href={`/writings/${postSlug}`} className="group">
                  <article className="flex items-center gap-4 overflow-hidden p-4 hover:bg-bg-hover transition rounded-lg">
                    {/* Main Image */}
                    {mainImage && mainImage.fields?.file?.url && (
                      <div className="group relative w-[430px] h-[300px] overflow-hidden rounded-lg">
                        <Image
                          src={getAssetUrl(mainImage)}
                          alt={postTitle}
                          fill
                          className="object-cover object-center w-full h-full transform group-hover:scale-105 transition-all duration-700 rounded-lg"
                        />
                      </div>
                    )}

                    {/* Text Content */}
                    <div className="flex-1 pt-4 flex flex-col justify-between">
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
                        <div className="w-fit group relative mt-2 sm:mt-3 mb-2 sm:mb-4 ">
                          <h1 className="w-fit text-3xl sm:text-5xl font-bold  leading-tight text-text-primary z-0">
                            {postTitle}
                          </h1>

                          <span className="max-md:hidden absolute -bottom-2 left-0 w-0 h-px bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  group-hover:w-full transition-all duration-500" />
                        </div>

                        {/* Small Description */}
                        <p className="text-text-secondary mb-2 sm:mb-3">
                          {smallDescription}
                        </p>
                      </div>
                      {/* Author and Date Posted */}
                      <p className="text-sm max-[300px]:text-text-primary text-text-primary mb-1 flex items-center">
                        {new Date(datePosted).toLocaleDateString(
                          language === "it" ? "it-IT" : "en-US",
                          {
                            month: "long",
                            day: "2-digit",
                            year: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        )}
        {/* Display up to 3 related blog posts if more than one exists */}
        {related && related.length > 1 && (
          <div className="grid gap-6 md:gap-4 lg:md:gap-6 grid-cols-1 md:grid-cols-3 ">
            {related.slice(0, 3).map((post, i) => {
              const {
                mainImage,
                datePosted,
                postTitle,
                smallDescription,
                tags,
                postSlug,
              } = post;
              return (
                <Link key={i} href={`/writings/${postSlug}`} className="group">
                  <article
                    className={`block overflow-hidden ${
                      i !== 2 &&
                      "max-md:pb-6 max-md:border-b border-accent-border"
                    }`}
                  >
                    {/* Main Image */}
                    {mainImage && mainImage.fields?.file?.url && (
                      <div className="group relative w-full max-[390px]:h-[220px] max-[540px]:h-[250px] h-[350px] md:h-[250px] overflow-hidden rounded-lg">
                        <Image
                          src={getAssetUrl(mainImage)}
                          alt={postTitle}
                          fill
                          className="object-cover object-center w-full h-full transform group-hover:scale-105 transition-all duration-700 rounded-lg"
                        />
                      </div>
                    )}

                    {/* Text Content */}
                    <div className=" pt-4 flex flex-col justify-between">
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
                        <div className="w-fit group relative mt-1  mb-2 ">
                          <h1 className="w-fit text-xl font-bold leading-tight text-text-primary z-0">
                            {postTitle}
                          </h1>

                          <span className="max-md:hidden absolute -bottom-2 left-0 w-0 h-px bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  group-hover:w-full transition-all duration-500" />
                        </div>

                        {/* Small Description */}
                        <p className="text-text-secondary text-sm mb-2 sm:mb-3">
                          {smallDescription}
                        </p>
                      </div>
                      {/* Author and Date Posted */}
                      <p className="text-sm  text-text-primary">
                        {new Date(datePosted).toLocaleDateString(
                          language === "it" ? "it-IT" : "en-US",
                          {
                            month: "long",
                            day: "2-digit",
                            year: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default KeepReadingSection;
