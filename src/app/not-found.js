import React from "react";
import Image from "next/image";
import { images } from "@/utils/imageImport";
import { metadataByPage } from "@/config/metadata";

export const metadata = metadataByPage["/not-found"];

const NotFound = () => {
  return (
    <div className="w-full center rh-flex-col rh-p-loading gap-4">
      <div className="center border-2 border-accent-border rounded-full overflow-hidden">
        <Image
          src={images.privateinvestocat}
          alt="please_wait"
          width={150}
          height={150}
          className="w-[180px] md:w-[250px] h-[180px] md:h-[250px] animate-pulse"
        />
      </div>
      <div className="center flex-col gap-2">
        <h1 className="text-center font-black text-[80px]">404</h1>
        <p className="md:text-xl font-semibold text-center bg-bg-button px-4 py-1 rounded-full">
          This is not the web page you are looking for.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
