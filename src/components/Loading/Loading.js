import React from "react";
import Image from "next/image";
import { images } from "@/utils/imageImport";

/**
 * Loading Component
 *
 * Displays a simple loading animation with a bouncing image
 * and a "Please wait..." message.
 */

const Loading = () => {
  return (
    <div className="w-full center rh-flex-col rh-p-loading gap-4">
      {/* Image */}
      <Image
        src={images.boxoctocat}
        alt="please_wait"
        width={150}
        height={150}
        className="w-auto h-[100px] md:h-[130px] animate-bounce"
      />
      {/* Text */}
      <p className="text-base md:text-xl font-semibold text-center">
        Please wait...
      </p>
    </div>
  );
};

export default Loading;
