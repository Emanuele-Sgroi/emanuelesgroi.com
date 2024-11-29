"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getAssetUrl } from "@/utils/imageUtils";

const WelcomeReadMe = ({ welcome }) => {
  const {
    readmeTitle,
    welcomeTitle,
    aboutText,
    stackTitle,
    stackReference,
    exploreText,
  } = welcome;

  // Access the referenced skills
  const skillsRef = stackReference?.map((skill) => skill.fields);

  return (
    <div className="main-container">
      <ReadmeTitle title={readmeTitle} />
      <div className="w-full center mt-4 border-b border-light-accent-border dark:border-dark-accent-border pb-1">
        <h2 className="font-semibold">{welcomeTitle}</h2>
      </div>
      <div className="w-full center mt-6">
        <p className="font-semibold text-[17.5px]">{aboutText}</p>
      </div>
      <div className="w-full mt-8 mb-4 border-b border-light-accent-border dark:border-dark-accent-border pb-1">
        <h4 className="font-semibold">{stackTitle}</h4>
      </div>
      <div className="w-full flex justify-start gap-3 flex-wrap">
        {skillsRef.map((skill, index) => (
          <div
            key={index}
            className="py-1 px-2 center gap-[5px] rounded-[2px]"
            style={{ backgroundColor: skill.skillColor }}
          >
            <Image
              src={getAssetUrl(skill.skillIcon)}
              alt={`${skill.skillName} icon`}
              width={20}
              height={20}
            />
            <p className="text-sm" style={{ color: skill.skillTextColor }}>
              {skill.skillName}
            </p>
          </div>
        ))}
      </div>
      <div className="w-full center mt-8">
        <p className="text-sm">{exploreText}</p>
      </div>
      <ProfileViews />
    </div>
  );
};

export default WelcomeReadMe;

const ReadmeTitle = ({ title }) => {
  // Match the exact pattern "something/something.md"
  const match = title.match(/^[^/]+\/[^/]+\.md$/);

  // If it doesn't match, return the plain title
  if (!match) {
    return <p className="w-full text-xs text-gray-700">{title}</p>;
  }

  // If it matches, split the title for styling
  const parts = title.split(/(\/|\.md)/); // Split on "/" and ".md"

  return (
    <p className="w-full text-xs monospace-text">
      {parts.map((part, index) => {
        // Style "/" and ".md" differently
        if (part === "/" || part === ".md") {
          return (
            <span
              key={index}
              className={`text-light-accent-icon dark:text-dark-accent-icon ${
                part === "/" && "mx-[2px]"
              }`}
            >
              {part}
            </span>
          );
        }

        // Default style for other parts
        return (
          <span
            key={index}
            className="text-light-text-primary dark:text-dark-text-primary"
          >
            {part}
          </span>
        );
      })}
    </p>
  );
};

const ProfileViews = () => {
  // Retrieve the number from session storage or start at 9
  const initialNumber = Number(sessionStorage.getItem("number") || 9);
  const [views, setViews] = useState(initialNumber); // initial value for profile views
  const [targetNumber, setTargetNumber] = useState(initialNumber); // Target number of views to reach

  useEffect(() => {
    // Save the number to session storage whenever it updates
    sessionStorage.setItem("number", views);
  }, [views]);

  useEffect(() => {
    // Function to generate a new random target number
    const generateTargetNumber = () => {
      const randomIncrement = Math.floor(Math.random() * 12) + 1; // Random number between 1 and 12
      setTargetNumber((prevTarget) => prevTarget + randomIncrement);
    };

    // Smoothly animate the number from `number` to `targetNumber`
    const smoothIncrement = () => {
      if (views < targetNumber) {
        setViews((prevNumber) => prevNumber + 1);
      }
    };

    // Generate a new target number every 4 seconds
    const targetInterval = setInterval(generateTargetNumber, 4000);

    // Animate the number every 100ms for a smooth effect
    const animationInterval = setInterval(smoothIncrement, 100);

    // Cleanup intervals on component unmount
    return () => {
      clearInterval(targetInterval);
      clearInterval(animationInterval);
    };
  }, [views, targetNumber]);

  return (
    <div className="w-full mt-5 flex justify-start">
      <div className=" center">
        <div className="bg-light-accent-icon pl-2 pr-1 py-1 rounded-s-sm ">
          <p className="text-xs text-white leading-none drop-shadow-[0_1px_1px_rgba(0,0,0,0.90)]">
            Profile views
          </p>
        </div>
        <div className="bg-light-accent-extra pl-1 pr-2 py-1 rounded-e-sm">
          <p className="text-xs text-white leading-none drop-shadow-[0_1px_1px_rgba(0,0,0,0.90)]">
            {views}
          </p>
        </div>
      </div>
    </div>
  );
};
