"use client";

import { createContext, useState, useEffect, useContext } from "react";

//const LanguageContext = createContext(null);
const defaultCtx = {
  language: "en",
  /* eslint-disable @typescript-eslint/no-empty-function */
  switchLanguage: () => {},
};
const LanguageContext = createContext(defaultCtx);
export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ initialLanguage = "en", children }) => {
  const [language, setLanguage] = useState(initialLanguage);

  useEffect(() => {
    const stored = localStorage.getItem("preferredLanguage");

    if (stored) {
      setLanguage(stored);
    } else {
      const browser = navigator.language.slice(0, 2);
      const supported = ["en", "it"];
      const detected = supported.includes(browser) ? browser : "en";
      setLanguage(detected);
      localStorage.setItem("preferredLanguage", detected);
      document.cookie = `preferredLanguage=${detected}; path=/`;
    }
  }, []);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "preferredLanguage" && e.newValue) {
        //setLanguage(e.newValue);
        setTimeout(() => setLanguage(e.newValue), 100);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const switchLanguage = (lang) => {
    if (lang === language) return; // nothing to do
    setTimeout(() => setLanguage(lang), 100); // update React state
    localStorage.setItem("preferredLanguage", lang);
    document.cookie = `preferredLanguage=${lang}; path=/`;
  };

  return (
    <LanguageContext.Provider value={{ language, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
