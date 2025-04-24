"use client";

import React from "react";
import Image from "next/image";
import { images } from "@/utils/imageImport";
import { useLanguage } from "@/context/LanguageContext";
import globalsTranslation from "@/translations/globals";

/**
 * ErrorMessage Component
 *
 * Displays a user-friendly error message along with an image
 * indicating that something went wrong.
 * This components is used across multiple pages
 */

const ErrorMessage = () => {
  // translation
  const { language } = useLanguage();
  const t = globalsTranslation[language];

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
        <span>{t.error.title}</span>
        {t.error.description}
      </h5>
    </div>
  );
};

export default ErrorMessage;
