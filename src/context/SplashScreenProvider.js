"use client";

import { createContext, useState, useLayoutEffect } from "react";

const SplashScreenContext = createContext();

export const SplashScreenProvider = ({ children }) => {
  const [showSplash, setShowSplash] = useState(true);

  useLayoutEffect(() => {
    const navigationEntries = performance.getEntriesByType("navigation");
    const isReload =
      navigationEntries.length > 0 && navigationEntries[0].type === "reload";

    const splashShown = sessionStorage.getItem("splashShown");

    if (!splashShown || isReload) {
      setShowSplash(true);
      sessionStorage.setItem("splashShown", "true");
    } else {
      setShowSplash(false);
    }
  }, []);

  const hideSplashScreen = () => {
    setShowSplash(false);
  };

  if (showSplash === null) {
    return null;
  }

  return (
    <SplashScreenContext.Provider value={{ showSplash, hideSplashScreen }}>
      {children}
    </SplashScreenContext.Provider>
  );
};

export default SplashScreenContext;
