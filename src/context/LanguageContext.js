"use client";

import { createContext, useState, useEffect, useContext } from "react";

// Create context
const LanguageContext = createContext();

// Custom hook for using language context
export const useLanguage = () => useContext(LanguageContext);

// Provider component
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en"); // default

  useEffect(() => {
    // Try from localStorage first
    const storedLang = localStorage.getItem("preferredLanguage");

    if (storedLang) {
      setLanguage(storedLang);
    } else {
      // Auto detect browser language
      const browserLang = navigator.language.slice(0, 2);
      const supportedLangs = ["en", "it"]; // to simplify since my website only supports 2 languages
      const detectedLang = supportedLangs.includes(browserLang)
        ? browserLang
        : "en"; // fallback to English
      setLanguage(detectedLang);
      localStorage.setItem("preferredLanguage", detectedLang); // Update local storage
    }
  }, []);

  // Change language and persist
  const switchLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("preferredLanguage", lang);
  };

  return (
    <LanguageContext.Provider value={{ language, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
