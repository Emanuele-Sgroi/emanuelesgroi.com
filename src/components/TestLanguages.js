"use client";

import { useLanguage } from "@/context/LanguageContext";

const TestLanguages = () => {
  const { language, switchLanguage } = useLanguage();

  return (
    <div className="p-20">
      <p>Current language: {language}</p>
      <button onClick={() => switchLanguage("en")}>🇬🇧</button>
      <button onClick={() => switchLanguage("it")}>🇮🇹</button>
    </div>
  );
};

export default TestLanguages;
