"use client";

import React from "react";
import { useWritingsContent } from "@/hooks/useWritingsContent";
import Image from "next/image";
import Link from "next/link";
import { getAssetUrl } from "@/utils/imageUtils";
import { GoDotFill } from "react-icons/go";

const KeepReadingSection = ({ blogPost }) => {
  const { writingsContent, isWritingsLoading, isWritingsError } =
    useWritingsContent();

  // Access the referenced blog posts
  const blogPostsRef = writingsContent?.blogPosts?.map((post) => post.fields);

  // Filter out the blog post to exclude the open one
  const filteredBlogPosts = blogPostsRef?.filter(
    (post) => post.postSlug !== blogPost.postSlug
  );

  if (writingsContent && !isWritingsError && filteredBlogPosts.length > 0) {
    return (
      <div className="w-full max-w-[1232px] pt-32 flex flex-col items-start justify-start">
        <h3 className="text-text-primary text-left poppins-bold text-3xl">
          Keep Reading
        </h3>
        <div className="w-full h-[2px] bg-accent-border mt-3 mb-6"></div>
        {filteredBlogPosts && filteredBlogPosts.length === 1 && (
          <div className="w-full flex justify-start items-start">
            {filteredBlogPosts.slice(0, 1).map((post, i) => {
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
                <Link
                  key={i}
                  href={`/writings/${postSlug}`}
                  className="flex items-center gap-4 overflow-hidden group p-4 hover:bg-bg-hover transition rounded-lg"
                >
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
                      {new Date(datePosted).toLocaleDateString("en-US", {
                        month: "long",
                        day: "2-digit",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
        {filteredBlogPosts && filteredBlogPosts.length > 1 && (
          <div className="grid gap-6 grid-cols-3 ">
            {filteredBlogPosts.slice(0, 3).map((post, i) => {
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
                <Link
                  key={i}
                  href={`/writings/${postSlug}`}
                  className="block overflow-hidden group"
                >
                  {/* Main Image */}
                  {mainImage && mainImage.fields?.file?.url && (
                    <div className="group relative w-full h-[250px] overflow-hidden rounded-lg">
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
                      {new Date(datePosted).toLocaleDateString("en-US", {
                        month: "long",
                        day: "2-digit",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  }
};

export default KeepReadingSection;
