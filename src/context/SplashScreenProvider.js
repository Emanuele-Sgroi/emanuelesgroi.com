"use client";

import { createContext, useState } from "react";

const SplashScreenContext = createContext();

export const SplashScreenProvider = ({ children }) => {
  const [showSplash, setShowSplash] = useState(true);

  const hideSplashScreen = () => {
    setShowSplash(false);
  };

  return (
    <SplashScreenContext.Provider value={{ showSplash, hideSplashScreen }}>
      {children}
    </SplashScreenContext.Provider>
  );
};

export default SplashScreenContext;
