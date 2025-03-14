"use client";

import React, { createContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark"; // Default to 'dark'
    }
    return "dark"; // Return default when window is undefined (prevents hydration errors)
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check localStorage for saved theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const root = document.documentElement;
    const allElements = document.querySelectorAll("*");

    // Disable transitions for all elements
    root.classList.add("disable-transitions");
    allElements.forEach((el) => el.classList.add("disable-transitions"));

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Save the user's theme preference
    localStorage.setItem("theme", theme);

    // Re-enable transitions after a short delay
    setTimeout(() => {
      root.classList.remove("disable-transitions");
      allElements.forEach((el) => el.classList.remove("disable-transitions"));
    }, 100);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
