import React from "react";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";
import { images } from "@/utils/imageImport";
import Image from "next/image";
import { RiFolderInfoLine } from "react-icons/ri";

const AboutThisWebsite = ({ portfolio }) => {
  const { aboutThisWebsiteTitle, aboutText1, aboutText2, aboutText3 } =
    portfolio;
  return (
    <div className="w-full flex items-start flex-col bg-bg-mobile-primary md:bg-bg-tertiary md:border max-md:border-b max-md:border-t border-accent-border md:rounded-md p-4 mt-4 md:mt-8 max-md:pb-8">
      <h2 className="text-xl md:text-2xl font-semibold flex items-center gap-1 md:gap-2 mb-3">
        <span className="max-[250px]:hidden">
          <FaAngleRight
            size={26}
            className="max-md:w-[22px] max-md:h-[22px] text-accent-icon"
          />
        </span>
        {aboutThisWebsiteTitle}
      </h2>
      <p className="max-md:!text-sm font-medium text-text-secondary">
        {aboutText1}
      </p>
      <p className="max-md:!text-sm font-medium text-text-secondary">
        {aboutText2}
      </p>
      <div className="w-1/6 h-px bg-accent-border mt-2" />
      <div className="w-full flex justify-between items-start gap-8 mt-2">
        <p className="max-md:!text-sm font-medium text-text-secondary">
          {aboutText3}
        </p>

        <Image
          src={images.laptopoctocat}
          alt="laptopoctocat"
          width={140}
          height={140}
          className="max-[315px]:hidden w-auto h-[120px]  object-cover object-center -mt-2"
        />
      </div>
      <Link
        href={"/site-documentation"}
        className="btn-primary max-md:!text-sm center gap-2 max-[320px]:mt-4 mt-2 lg:mt-0"
      >
        <RiFolderInfoLine size={18} className="max-[235px]:hidden" />
        Site Documentation
      </Link>
    </div>
  );
};

export default AboutThisWebsite;
