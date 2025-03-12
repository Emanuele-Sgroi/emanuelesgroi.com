"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { SplashScreenProvider } from "@/context/SplashScreenProvider";

// Dynamically import SplashScreen with ssr: false
const SplashScreen = dynamic(
  () => import("@/components/SplashScreen/SplashScreen"),
  {
    ssr: false,
    loading: () => null, // Show nothing while loading
  }
);

export default function SplashScreenWrapper({ children }) {
  const [isSplashScreenLoaded, setIsSplashScreenLoaded] = useState(false);

  useEffect(() => {
    // Simulate a delay to ensure SplashScreen is loaded
    const timer = setTimeout(() => {
      setIsSplashScreenLoaded(true);
    }, 100); // Adjust the delay as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <SplashScreenProvider>
      {/* Render SplashScreen only after it's loaded */}
      {isSplashScreenLoaded && <SplashScreen />}
      {/* Render children */}
      {children}
    </SplashScreenProvider>
  );
}
