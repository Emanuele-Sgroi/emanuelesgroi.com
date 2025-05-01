"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { GB, IT } from "country-flag-icons/react/3x2";
import { useRouter, usePathname } from "next/navigation";
import { useFullScreenSpinner } from "@/context/FullScreenSpinnerContext";

const flagMap = {
  en: <GB title="English" className="w-5 h-4 rounded-sm" />,
  it: <IT title="Italiano" className="w-5 h-4 rounded-sm" />,
};

const SwitchLanguageSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { setIsFullScreenSpinner } = useFullScreenSpinner();
  const { language, switchLanguage } = useLanguage();

  const [selectedLang, setSelectedLang] = useState(null);

  const options = [
    { id: "en", label: "English" },
    { id: "it", label: "Italiano" },
  ];

  const handleLanguageSwitch = (lang) => {
    setIsFullScreenSpinner(true);
    setSelectedLang(lang);
    switchLanguage(lang, true);

    setTimeout(() => {
      router.refresh(); // soft refresh

      setIsFullScreenSpinner(false);
    }, 400); // slight delay helps ensure state updates before refresh
  };

  const currentLang = selectedLang || language;

  return (
    <div className="mt-4">
      <div className="flex gap-2">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleLanguageSwitch(option.id)}
            className={`flex items-center gap-2 px-3 py-1 rounded-md text-sm border transition-all
              ${
                currentLang === option.id
                  ? "bg-bg-button text-text-primary border-accent-border"
                  : "bg-transparent text-text-secondary border-transparent hover:bg-bg-hover"
              }`}
          >
            {flagMap[option.id]}
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SwitchLanguageSidebar;
