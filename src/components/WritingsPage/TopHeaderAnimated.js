import React from "react";
import { images } from "@/utils/imageImport";
import Image from "next/image";

const TopHeaderAnimated = ({ writingsContent }) => {
  const { topTitle, topSubtitle } = writingsContent;
  return (
    <div className="relative w-full border-b border-accent-border center writings-header-gradient overflow-hidden px-4 pb-6 md:pb-0">
      <div className="relative w-full max-w-[1280px] h-[345px] md:h-[215px] flex justify-center md:justify-start items-end md:items-center ">
        <div className="w-full flex flex-col items-center md:items-start max-md:justify-end z-50">
          <h1 className="text-text-primary max-[420px]:text-[26px] text-4xl sm:text-5xl font-bold max-w-fit md:max-w-[500px] lg:max-w-fit text-center md:text-left">
            {topTitle}
          </h1>
          <p className="text-text-secondary sm:text-xl font-medium text-center md:text-left max-sm:mt-1">
            {topSubtitle}
          </p>
        </div>
        {/* Animated Images */}
        <div className="max-md:hidden absolute right-0 max-[1480px]:right-24  center">
          <Image
            src={images.copilot}
            alt="copilot"
            width={169}
            height={141}
            quality={100}
            priority
            className="w-[145px] h-auto z-30 wr-copilot-animation brightness-150 dark:brightness-100"
          />
          <Image
            src={images.models}
            alt="models"
            width={169}
            height={141}
            quality={100}
            priority
            className="absolute -left-[120px] -bottom-[30px]  w-[100px] h-auto z-30 wr-models-animation"
          />
          <Image
            src={images.workflow}
            alt="workflow"
            width={169}
            height={141}
            quality={100}
            priority
            className="absolute -right-[120px] -bottom-[30px]  w-[80px] h-auto z-30 brightness-150 dark:brightness-50"
          />
          <Image
            src={images.sparklesmall}
            alt="sparklesmall"
            width={20}
            height={20}
            quality={100}
            priority
            className="absolute right-0 -bottom-[18px]  w-[20px] h-auto z-30 wr-sparklesmall-animation"
          />
          <Image
            src={images.sparklelarge}
            alt="sparklelarge"
            width={40}
            height={40}
            quality={100}
            priority
            className="absolute -right-[45px] -bottom-[45px]  w-[40px] h-auto z-30 wr-sparklelarge-animation"
          />
          <Image
            src={images.arrow}
            alt="arrow"
            width={169}
            height={141}
            quality={100}
            priority
            className="absolute -left-[120px] -top-[72px]  w-[100px] h-auto z-30 brightness-150 dark:brightness-50"
          />
          <Image
            src={images.donut}
            alt="donut"
            width={300}
            height={300}
            quality={100}
            priority
            className="absolute -right-[120px] -top-[120px]  w-[250px] h-auto z-10 brightness-75"
          />
          <div className="absolute left-[15px] -bottom-[160px] w-[90px] h-[200px] rounded-e-full bg-gradient-to-br from-blue-900 via-violet-950 to-cyan-900 z-10 transform -rotate-12 brightness-150 dark:brightness-100" />
          <div className="absolute -left-[40px] -bottom-[200px] w-[60px] h-[200px] rounded-e-full bg-gradient-to-br from-cyan-600 via-violet-950 to-blue-900 z-10 transform -rotate-12 brightness-150 dark:brightness-100" />
          <div className="absolute -left-[66px] -bottom-[232px] w-[30px] h-[200px] rounded-e-full bg-gradient-to-br from-blue-900 via-violet-950 to-cyan-900  z-10 transform -rotate-12 brightness-150 dark:brightness-100" />
        </div>
      </div>
      {/* Blur overlay */}
      <div className="max-md:hidden absolute top-0 left-0 w-full h-[215px] bg-transparent backdrop-blur-sm z-20" />

      {/* Animation for mobile only */}
      <div className="md:hidden w-[768px] absolute top-12  center">
        <Image
          src={images.copilot}
          alt="copilot"
          width={169}
          height={141}
          quality={100}
          priority
          className="w-[145px] h-auto z-30 wr-copilot-animation brightness-150 dark:brightness-100"
        />
        <Image
          src={images.models}
          alt="models"
          width={169}
          height={141}
          quality={100}
          priority
          className="absolute max-[375px]:left-44 left-32 top-8 w-[124px] h-auto z-30 wr-models-animation"
        />
        <Image
          src={images.workflow}
          alt="workflow"
          width={169}
          height={141}
          quality={100}
          priority
          className="absolute right-32 top-6 w-[105px] h-auto z-30 brightness-150 dark:brightness-50"
        />

        <Image
          src={images.sparklelarge}
          alt="sparklelarge"
          width={40}
          height={40}
          quality={100}
          priority
          className="absolute right-64 top-28 w-[50px] h-auto z-30 wr-sparklelarge-animation"
        />
        <Image
          src={images.arrow}
          alt="arrow"
          width={169}
          height={141}
          quality={100}
          priority
          className="absolute max-[375px]:-top-28 -top-24 max-[375px]:left-44 left-24 w-[150px] h-auto z-30 brightness-150 dark:brightness-50"
        />
        <Image
          src={images.donut}
          alt="donut"
          width={300}
          height={300}
          quality={100}
          priority
          className="absolute -top-48 right-32  w-[256px] h-auto z-10 brightness-75"
        />
      </div>
    </div>
  );
};

export default TopHeaderAnimated;
