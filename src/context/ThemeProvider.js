"use client";

import React, { createContext, useState, useEffect } from "react";

const ThemeContext = createContext();

/**
 * Theme Context Provider
 *
 * This file manages the theme (light or dark mode) for the entire application.
 * The `ThemeContext` is used to provide the current theme and a function to toggle the theme across all components.
 *
 * - **theme**: The current theme ('dark' or 'light').
 * - **toggleTheme**: A function that toggles between light and dark themes.
 *
 * The context persists the user's theme preference across page reloads by saving the theme to `localStorage`.
 *
 * The `useEffect` hooks ensure that:
 * 1. The theme is set from `localStorage` when the component mounts.
 * 2. The theme is applied to the `document` element, adding/removing the `dark` class as necessary.
 * 3. Transitions are temporarily disabled during the theme switch to avoid visual glitches.
 *
 * Usage:
 * - To access the current theme and toggle function in any component, simply call `useContext(ThemeContext)`.
 * - The `ThemeProvider` should wrap the application to make the theme context available globally.
 */

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
