"use client";

import React from "react";
import Image from "next/image";
import { images } from "@/utils/imageImport";
import { useLanguage } from "@/context/LanguageContext";
import globalsTranslation from "@/translations/globals";

const NotFoundClient = () => {
  const { language } = useLanguage();
  const t = globalsTranslation[language];

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
        <h1 className="text-center font-black text-[80px]">
          {t.notFound.code}
        </h1>
        <p className="md:text-xl font-semibold text-center bg-bg-button px-4 py-1 rounded-full">
          {t.notFound.message}
        </p>
      </div>
    </div>
  );
};

export default NotFoundClient;
