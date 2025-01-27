import React from "react";
import { images } from "@/utils/imageImport";
import Image from "next/image";

const TopHeaderAnimated = ({ writingsContent }) => {
  const { topTitle, topSubtitle } = writingsContent;
  return (
    <div className="relative w-full border-b border-accent-border center writings-header-gradient overflow-hidden">
      <div className="relative w-full max-w-[1280px] h-[215px] flex justify-start items-center ">
        <div className="flex flex-col items-start z-50">
          <h2 className="text-text-primary text-5xl font-bold">{topTitle}</h2>
          <p className="text-text-secondary text-xl font-medium">
            {topSubtitle}
          </p>
        </div>
        {/* Animated Images */}
        <div className="absolute right-0 center">
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
      <div className="absolute top-0 left-0 w-full h-[215px] bg-transparent backdrop-blur-sm z-20" />
    </div>
  );
};

export default TopHeaderAnimated;
