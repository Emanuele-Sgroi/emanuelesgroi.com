import React from "react";
import Image from "next/image";
import { images } from "@/utils/imageImport";

const Loading = () => {
  return (
    <div className="w-full center rh-flex-col rh-p-loading gap-4">
      <Image
        src={images.boxoctocat}
        alt="please_wait"
        width={150}
        height={150}
        className="w-auto h-[120px] md:h-[180px] animate-bounce"
      />
      <h5 className="text-base md:text-xl text-center">Please wait...</h5>
    </div>
  );
};

export default Loading;
