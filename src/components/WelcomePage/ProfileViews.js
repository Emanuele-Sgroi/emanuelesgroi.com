"use client";

import React, { useState, useEffect } from "react";

/**
 * ProfileViews Component
 *
 * Displays a dynamic profile views counter that:
 * - Starts with a default value (9) and retrieves stored value from sessionStorage.
 * - Randomly increases the view count at intervals to create an engaging effect.
 * - Smoothly animates the increment in small steps for a natural feel.
 * - Updates sessionStorage to persist the count across page refreshes.
 *
 * Features:
 * - Uses `sessionStorage` to store and retrieve the profile view count.
 * - Generates a new random target number every 4 seconds.
 * - Animates the count incrementally every 100ms to reach the target.
 * - Styled with GitHub-inspired labels for profile views.
 */

const ProfileViews = () => {
  // Start with a default value (e.g., 9)
  const [views, setViews] = useState(9);
  const [targetNumber, setTargetNumber] = useState(9);

  // On mount, read the stored value from sessionStorage if available
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedViews = window.sessionStorage.getItem("number");
      if (storedViews) {
        const parsed = Number(storedViews);
        setViews(parsed);
        setTargetNumber(parsed);
      }
    }
  }, []);

  // Whenever `views` changes, update sessionStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("number", views);
    }
  }, [views]);

  // Animate the number and update the target
  useEffect(() => {
    // Function to generate a new random target number
    const generateTargetNumber = () => {
      const randomIncrement = Math.floor(Math.random() * 12) + 1;
      setTargetNumber((prev) => prev + randomIncrement);
    };

    // Smoothly animate from `views` to `targetNumber`
    const smoothIncrement = () => {
      if (views < targetNumber) {
        setViews((prevNumber) => prevNumber + 1);
      }
    };

    // Generate a new target number every 4 seconds
    const targetInterval = setInterval(generateTargetNumber, 4000);

    // Animate the number every 100ms
    const animationInterval = setInterval(smoothIncrement, 100);

    return () => {
      clearInterval(targetInterval);
      clearInterval(animationInterval);
    };
  }, [views, targetNumber]);

  return (
    <div className="w-full mt-5 flex justify-start max-md:px-4">
      <div className=" center">
        <div className="bg-accent-icon pl-2 pr-1 py-1 rounded-s-sm ">
          <p className="text-xs text-white leading-none drop-shadow-[0_1px_1px_rgba(0,0,0,0.90)]">
            Profile views
          </p>
        </div>
        <div className="bg-[#0969da] pl-1 pr-2 py-1 rounded-e-sm">
          <p className="text-xs text-white leading-none drop-shadow-[0_1px_1px_rgba(0,0,0,0.90)]">
            {views}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileViews;
