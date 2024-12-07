"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { images } from "@/utils/imageImport";
import { RiCloseLargeLine } from "react-icons/ri";

const GreetingPopup = () => {
  const [popupOn, setPopupOn] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [text, setText] = useState("");
  const fullText =
    "Hey there! Welcome to my portfolio. Yep, I borrowed some inspiration from GitHub’s style. It’s not just another ordinary developer portfolio!!! I’ve mixed in some extra features. I hope you enjoy it!";

  useEffect(() => {
    // Check if the popup has already been shown
    const hasShownPopup = sessionStorage.getItem("hasShownGreetingPopup");

    if (!hasShownPopup) {
      const delayPopup = setTimeout(() => {
        setPopupOn(true);
        sessionStorage.setItem("hasShownGreetingPopup", "true"); // Mark as shown
      }, 3000);

      return () => clearTimeout(delayPopup);
    }
  }, []);

  useEffect(() => {
    if (isClosing) {
      const delayClose = setTimeout(() => {
        setPopupOn(false);
      }, 1500);

      return () => clearTimeout(delayClose);
    }
  }, [isClosing]);

  useEffect(() => {
    let index = 0;

    if (popupOn) {
      const interval = setInterval(() => {
        if (index < fullText.length) {
          setText((prev) => prev + fullText[index - 1]);
          index++;
        } else {
          clearInterval(interval); // Stop the interval when the text is fully displayed
        }
      }, 15); //typing speed

      return () => clearInterval(interval);
    }
  }, [popupOn]);

  return (
    <div
      className={`w-full min-h-dvh fixed left-0 top-0 z-[999999] overflow-hidden ${
        !popupOn ? "hidden" : ""
      }`}
    >
      <button
        onClick={() => setIsClosing(true)}
        className={`absolute top-6 left-6 z-[9999999] ${
          isClosing ? "hidden" : ""
        }`}
      >
        <RiCloseLargeLine size={33} className="text-red-500" />
      </button>

      <div
        className={`max-[455px]:hidden absolute bottom-4 -right-[280px] gp-image-in `}
      >
        {/* Comic text on the left */}
        <div
          className={`w-[300px] h-[220px] sm:h-[277px] absolute -left-[280px] sm:-left-[250px] top-[25px] p-4 text-left bg-white rounded-t-lg rounded-bl-lg border border-gray-300 shadow  z-[9999999] opacity-0 gp-comic-in ${
            isClosing ? "gp-comic-out" : ""
          }`}
        >
          <p className="text-base sm:text-lg font-semibold text-black monospace-text">
            {text}
          </p>
          {/* Triangle for the comic strip */}
          <div className="triangle"></div>
        </div>

        {/* Image on the right */}
        <Image
          src={images.laptopoctocat}
          alt="laptopoctocat"
          width={300}
          height={300}
          quality={100}
          className={`w-auto h-[150px] sm:h-[250px] lg:h-[300px] relative z-[9999998] ${
            isClosing ? "gp-image-out" : ""
          }`}
        />

        <button
          onClick={() => setIsClosing(true)}
          className={`absolute top-[-80px] right-12 z-[9999999] ${
            isClosing ? "hidden" : ""
          }`}
        >
          <RiCloseLargeLine size={33} className="text-red-500" />
        </button>
      </div>

      {/* Mobile */}
      <div
        className={`min-[456px]:hidden w-full h-full absolute bottom-0 -right-[280px] gp-image-in flex flex-col items-end justify-end gap-4 p-4`}
      >
        {/* Comic text on the left */}
        <div
          className={`w-full h-auto top-[25px] p-4 text-left bg-white rounded-lg border border-gray-300 shadow  z-[9999999] opacity-0 gp-comic-in ${
            isClosing ? "gp-comic-out" : ""
          }`}
        >
          <p className="text-base sm:text-lg font-semibold text-black monospace-text">
            {text}
          </p>
        </div>

        {/* Image on the right */}
        <Image
          src={images.laptopoctocat}
          alt="laptopoctocat"
          width={300}
          height={300}
          quality={100}
          className={`w-auto h-[150px] sm:h-[250px] lg:h-[300px] relative z-[9999998] ${
            isClosing ? "gp-image-out" : ""
          }`}
        />
      </div>

      {/* Overlay layer */}
      <div
        className={`gp-overlay gp-overlay-fade-in z-[9999997] ${
          isClosing ? "gp-overlay-fade-out" : ""
        }`}
      />
    </div>
  );
};

export default GreetingPopup;
