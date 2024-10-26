"use client";

import { useContext, useEffect } from "react";
import SplashScreenContext from "@/context/SplashScreenProvider";

const SplashScreen = () => {
  const { showSplash, hideSplashScreen } = useContext(SplashScreenContext);

  useEffect(() => {
    if (showSplash) {
      setTimeout(() => {
        hideSplashScreen();
      }, 2100);
    }
  }, [showSplash, hideSplashScreen]);

  if (!showSplash) {
    return null;
  }

  return (
    <div className="w-full h-svh center splash-container">
      <h1 className="text-7xl splash-text">
        <span>H</span>
        <span>e</span>
        <span>l</span>
        <span>l</span>
        <span>o</span>
      </h1>
    </div>
  );
};

export default SplashScreen;
