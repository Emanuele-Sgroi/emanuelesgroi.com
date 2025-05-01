import Link from "next/link";
import React from "react";
import { FiArrowLeftCircle } from "react-icons/fi";
import Image from "next/image";
import { getAssetUrl } from "@/utils/imageUtils";

/**
 * BlogPostTopSection Component
 *
 * Displays the top section of a blog post, including:
 * - A "Go Back" link to the writings page.
 * - The blog title and a short description.
 * - The main featured image.
 */

const BlogPostTopSection = ({ blogPost, t }) => {
  const { postTitle, smallDescription, mainImage } = blogPost;
  return (
    <div className="relative w-full center max-[500px]:px-4 px-6 overflow-hidden max-md:bg-bg-mobile-primary">
      <div className="w-full max-w-[1020px] pt-8 md:pt-10 z-50">
        {/* Back to Writings Button */}
        <Link
          href="/writings"
          className="flex items-center gap-2 poppins-medium text-accent-icon font-medium hover:text-text-link hover:underline"
        >
          <FiArrowLeftCircle size={20} /> {t.goBack}
        </Link>

        {/* Title and subtitle */}
        <div className="w-full flex flex-col justify-start items-start gap-4 mt-8 md:mt-14 mb-8">
          <h1 className="text-4xl md:text-[40px] lg:text-[48px] font-bold leading-tight poppins-extrabold">
            {postTitle}
          </h1>
          <p className="text-text-secondary poppins-regular">
            {smallDescription}
          </p>
        </div>
        {/* Blog Featured Image */}
        <Image
          src={getAssetUrl(mainImage)}
          alt={postTitle}
          width={1020}
          height={540}
          className="w-full h-auto max-h-[540px] object-cover object-center rounded-lg"
        />
      </div>
      <div className="blog-header-gradient" />
    </div>
  );
};

export default BlogPostTopSection;
