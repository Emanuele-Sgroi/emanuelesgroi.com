// Top part used in the navigation menu on the left side

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FiArrowLeftCircle } from "react-icons/fi";

const SiteDocTopSection = ({ t }) => {
  const router = useRouter();
  return (
    <div className="relative w-full overflow-hidden p-4 lg:p-6 border-b border-accent-border">
      <div className="w-full flex flex-col items-start gap-4 z-50">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-accent-icon font-medium hover:text-text-link hover:underline"
        >
          <FiArrowLeftCircle size={16} /> {t.goBack}
        </button>

        <h2 className="text-xl font-bold">{t.about}</h2>
      </div>
    </div>
  );
};

export default SiteDocTopSection;
