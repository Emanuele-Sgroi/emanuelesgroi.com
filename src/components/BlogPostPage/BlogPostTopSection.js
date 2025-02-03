import Link from "next/link";
import React from "react";
import { FiArrowLeftCircle } from "react-icons/fi";
import Image from "next/image";
import { getAssetUrl } from "@/utils/imageUtils";

const BlogPostTopSection = ({ blogPost }) => {
  const { postTitle, smallDescription, mainImage } = blogPost;
  return (
    <div className="relative w-full center max-[500px]:px-4 px-6 overflow-hidden max-md:bg-bg-mobile-primary">
      <div className="w-full max-w-[1020px] pt-8 md:pt-10 z-50">
        <Link
          href="/writings"
          className="flex items-center gap-2 poppins-medium text-accent-icon font-medium hover:text-text-link hover:underline"
        >
          <FiArrowLeftCircle size={20} /> Go Back
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
