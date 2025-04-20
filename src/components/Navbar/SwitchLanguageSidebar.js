"use client";

import { useLanguage } from "@/context/LanguageContext";
import { GB, IT } from "country-flag-icons/react/3x2";

const flagMap = {
  en: <GB title="English" className="w-5 h-4 rounded-sm" />,
  it: <IT title="Italiano" className="w-5 h-4 rounded-sm" />,
};

const SwitchLanguageSidebar = () => {
  const { language, switchLanguage } = useLanguage();

  const options = [
    { id: "en", label: "English" },
    { id: "it", label: "Italiano" },
  ];

  return (
    <div className="mt-4">
      <div className="flex gap-2">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => switchLanguage(option.id)}
            className={`flex items-center gap-2 px-3 py-1 rounded-md text-sm border transition-all
              ${
                language === option.id
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
