"use client";

import { useContext, useEffect, useRef } from "react";
import SplashScreenContext from "@/context/SplashScreenProvider";

const SplashScreen = () => {
  const { showSplash, hideSplashScreen } = useContext(SplashScreenContext);
  const splashRef = useRef(null);

  useEffect(() => {
    const splashElement = splashRef.current;

    const handleAnimationEnd = (event) => {
      // Check if the animation that ended is the 'end-splash' animation
      if (event.animationName === "end-splash") {
        hideSplashScreen();
      }
    };

    if (splashElement) {
      splashElement.addEventListener("animationend", handleAnimationEnd);
    }

    return () => {
      if (splashElement) {
        splashElement.removeEventListener("animationend", handleAnimationEnd);
      }
    };
  }, [hideSplashScreen]);

  if (!showSplash) {
    return null;
  }

  return (
    <div className="w-full h-svh center splash-container" ref={splashRef}>
      <h1 className="text-5xl splash-text">
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