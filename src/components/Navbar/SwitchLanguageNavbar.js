"use client";

import { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useLanguage } from "@/context/LanguageContext";

const SwitchLanguageNavbar = () => {
  const { language, switchLanguage } = useLanguage();
  const [open, setOpen] = useState(false);

  const options = [
    { id: "en", label: "EN", full: "English" },
    { id: "it", label: "IT", full: "Italiano" },
  ];

  const selected = options.find((opt) => opt.id === language);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="max-[400px]:hidden relative center outline-none w-[32px] h-[32px] btn-secondary group">
          {selected?.label}

          {/* Tooltip (desktop only) with same animation as ShadCN popover */}
          <span
            className={`
              absolute -bottom-[33px] left-1/2 -translate-x-1/2 z-50 px-2 py-1 text-xs rounded-md shadow-md
              bg-white text-neutral-950 border dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50
              opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all
              data-[side=top]:slide-in-from-bottom-2
              hidden sm:block
            `}
          >
            {selected?.full}
          </span>
        </button>
      </PopoverTrigger>

      <PopoverContent className="max-[400px]:hidden w-fit p-2 bg-bg-button border-accent-border">
        {options.map((option) => (
          <div
            key={option.id}
            className={`px-3 py-2 cursor-pointer rounded-md text-sm transition ${
              language === option.id ? "bg-bg-hover" : "hover:bg-muted"
            }`}
            onClick={() => {
              switchLanguage(option.id);
              setOpen(false);
            }}
          >
            {option.label}
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default SwitchLanguageNavbar;
