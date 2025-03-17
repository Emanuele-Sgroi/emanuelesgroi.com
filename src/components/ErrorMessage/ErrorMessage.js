import React from "react";
import Image from "next/image";
import { images } from "@/utils/imageImport";

/**
 * ErrorMessage Component
 *
 * Displays a user-friendly error message along with an image
 * indicating that something went wrong.
 * This components is used across multiple pages
 */

const ErrorMessage = () => {
  return (
    <div className="w-full center rh-flex-col rh-p-loading gap-4">
      <Image
        src={images.deckfailcat}
        alt="please_wait"
        width={150}
        height={150}
        className="w-auto h-[120px] md:h-[180px]"
      />
      <h5 className="text-base md:text-xl text-red-500 center flex-col text-center">
        <span>Oops! Something went wrong.</span>Please refresh the page or try
        again later.
      </h5>
    </div>
  );
};

export default ErrorMessage;
