"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { images } from "@/utils/imageImport";
import { RiCloseLargeLine } from "react-icons/ri";
import ChatFloater from "../ChatWidget/ChatFloater";

export const dynamic = "force-dynamic";

/**
 * GreetingPopup Component
 *
 * Displays a welcome popup for first-time visitors.
 * Uses session storage to ensure the popup only appears once per session.
 * Also introduces the floating chat widget after the popup is dismissed.
 */

const GreetingPopup = () => {
  const [popupOn, setPopupOn] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [canShowFloater, setCanShowFloater] = useState(false);

  // Check if the greeting popup has already been shown in the session
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasShownPopup = window.sessionStorage.getItem(
        "hasShownGreetingPopup"
      );
      if (!hasShownPopup) {
        const delayPopup = setTimeout(() => {
          setPopupOn(true);
          window.sessionStorage.setItem("hasShownGreetingPopup", "true");
        }, 4000);
        return () => clearTimeout(delayPopup);
      } else {
        const delayFloater = setTimeout(() => {
          setCanShowFloater(true);
        }, 4000);
        return () => clearTimeout(delayFloater);
      }
    }
  }, []);

  // Handles closing animation before fully removing the popup
  useEffect(() => {
    if (isClosing) {
      const delayClose = setTimeout(() => {
        setPopupOn(false);
        setCanShowFloater(true);
      }, 100);

      return () => clearTimeout(delayClose);
    }
  }, [isClosing]);

  return (
    <>
      {popupOn && (
        <div
          className={`w-full min-h-dvh fixed left-0 top-0 z-[999999] overflow-hidden center`}
        >
          <div
            className={`flex items-center justify-start flex-col relative w-full max-[555px]:max-w-[90%] max-w-[500px] md:max-w-[600px] h-auto max-h-[90vh] shadow-lg bg-white rounded-md z-[9999998] overflow-hidden gp-modal-in ${
              isClosing ? "gp-modal-out" : ""
            }`}
          >
            {/* Close button */}
            <button
              onClick={() => setIsClosing(true)}
              className={`absolute top-3 right-3 z-[99999999] text-black dark:text-white hover:text-white dark:hover:text-black`}
            >
              <RiCloseLargeLine size={18} />
            </button>

            {/* Images container */}
            <div
              className="relative w-full h-[125px] sm:h-[150px] overflow-hidden rounded-t-md"
              style={{
                background:
                  "linear-gradient(45deg, var(--manupilot-badge-blue) 0%, var(--manupilot-badge-blue) 30%, var(--manupilot-badge-purple)  60%, var(--manupilot-badge-purple)  100%)",
              }}
            >
              <Image
                src={images.laptopoctocat}
                alt="laptopoctocat"
                width={300}
                height={300}
                quality={100}
                className={`absolute right-6 -bottomo-20 sm:-bottom-24 w-auto h-[210px] sm:h-[250px] z-20`}
              />
              <Image
                src={images.donut}
                alt="laptopoctocat"
                width={300}
                height={300}
                quality={100}
                className={`absolute right-4 bottom-4 w-auto h-[330px] z-[1] blur-md opacity-80`}
              />
              <Image
                src={images.donut}
                alt="laptopoctocat"
                width={300}
                height={300}
                quality={100}
                className={`absolute left-4 -bottom-40 w-auto h-[280px] z-[1] blur-md opacity-80`}
              />
              <Image
                src={images.models}
                alt="laptopoctocat"
                width={300}
                height={300}
                quality={100}
                className={`absolute left-6 bottom-4 w-auto h-[100px] sm:h-[120px] animate-spin-very-slow z-10`}
              />
            </div>

            {/* Text Container */}
            <div className="w-full center flex-col p-4 sm:p-6">
              <h4 className="text-center text-black text-lg sm:text-2xl font-bold mb-4">
                Hey there! 👋
              </h4>
              <p className="text-center text-sm sm:text-base text-black mb-4 sm:mb-8">
                Welcome to my GitHub inspired portfolio! This is not just a
                regular dev site. I&apos;ve added some extra features to make it
                more interactive and fun. Take a look around, check out my
                projects, or even chat with ManuPilot. Hope you enjoy it! 🚀
              </p>
              <button
                onClick={() => setIsClosing(true)}
                className="btn-primary"
              >
                Let&apos;s go
              </button>
            </div>
          </div>

          {/* Overlay layer */}
          <div
            className={`gp-overlay gp-overlay-fade-in z-[9999997] ${
              isClosing ? "gp-overlay-fade-out" : ""
            }`}
            onClick={() => setIsClosing(true)}
          />
        </div>
      )}

      {canShowFloater && <ChatFloater />}
    </>
  );
};

export default GreetingPopup;
