"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { images } from "@/utils/imageImport";
import { RiCloseLargeLine } from "react-icons/ri";
import Typewriter from "typewriter-effect";
import ChatFloater from "../ChatWidget/ChatFloater";

export const dynamic = "force-dynamic";

const GreetingPopup = () => {
  const [popupOn, setPopupOn] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [canShowFloater, setCanShowFloater] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasShownPopup = window.sessionStorage.getItem(
        "hasShownGreetingPopup"
      );
      if (!hasShownPopup) {
        const delayPopup = setTimeout(() => {
          setPopupOn(true);
          window.sessionStorage.setItem("hasShownGreetingPopup", "true");
        }, 3000);
        return () => clearTimeout(delayPopup);
      } else {
        const delayFloater = setTimeout(() => {
          setCanShowFloater(true);
        }, 3000);
        return () => clearTimeout(delayFloater);
      }
    }
  }, []);

  useEffect(() => {
    if (isClosing) {
      const delayClose = setTimeout(() => {
        setPopupOn(false);
        setCanShowFloater(true);
      }, 1500);

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

// {/* <button
//             onClick={() => setIsClosing(true)}
//             className={`absolute top-6 left-1/2 transform -translate-x-1/2 z-[99999999] ${
//               isClosing ? "hidden" : ""
//             }`}
//           >
//             <RiCloseLargeLine size={33} className="text-red-500" />
//           </button>

//           <div
//             className={`max-[455px]:hidden absolute bottom-4 -right-[280px] gp-image-in small-height-hidden`}
//           >
//             {/* Comic text on the left */}
//             <div
//               style={{}}
//               className={`w-[300px] h-[220px] sm:h-[277px] absolute -left-[280px] sm:-left-[250px] top-[25px] p-4 text-left bg-white rounded-t-lg rounded-bl-lg border border-gray-300 shadow  z-[9999999] opacity-0 gp-comic-in ${
//                 isClosing ? "gp-comic-out" : ""
//               }`}
//             >
//               <div className="text-base sm:text-lg font-semibold text-black monospace-text">
//                 <Typewriter
//                   options={{
//                     cursor: null,
//                   }}
//                   onInit={(typewriter) => {
//                     typewriter
//                       .pauseFor(3200)
//                       .changeDelay(4)
//                       .typeString(
//                         '<span style="color: #4b0082;">Hey there! </span>'
//                       )
//                       .typeString(
//                         '<span style="color:#000000;">Welcome to my portfolio. </span>'
//                       )
//                       .typeString(
//                         '<span style="color: #26a641">Yep, I borrowed some inspiration from GitHub ’s style.</span>'
//                       )
//                       .typeString(
//                         '<span style="color: #000000;"> It’s not just another ordinary developer portfolio!!! </span>'
//                       )
//                       .typeString(
//                         '<span style="color: #f44336;">I’ve mixed in some extra features. </span>'
//                       )
//                       .typeString(
//                         '<span style="color: #000000;">I hope you enjoy it!</span>'
//                       )
//                       .start();
//                   }}
//                 />
//               </div>

//               {/* Triangle for the comic strip */}
//               <div className="triangle"></div>
//             </div>

//             {/* Image on the right */}
// <Image
//   src={images.laptopoctocat}
//   alt="laptopoctocat"
//   width={300}
//   height={300}
//   quality={100}
//   className={`w-auto h-[150px] sm:h-[250px] lg:h-[300px] relative z-[9999998] ${
//     isClosing ? "gp-image-out" : ""
//   }`}
// />
//           </div>

//           {/* Mobile */}
//           <div
//             className={`min-[456px]:hidden w-full h-full absolute bottom-0 -right-[280px] gp-image-in flex flex-col items-end justify-end gap-4 p-4 small-height-hidden`}
//           >
//             {/* Comic text on the left */}
//             <div
//               className={`w-full h-auto top-[25px] p-4 text-left bg-white rounded-lg border border-gray-300 shadow  z-[9999999] opacity-0 gp-comic-in ${
//                 isClosing ? "gp-comic-out" : ""
//               }`}
//             >
//               <div className="text-base sm:text-lg font-semibold text-black monospace-text">
//                 <Typewriter
//                   options={{
//                     cursor: null,
//                   }}
//                   onInit={(typewriter) => {
//                     typewriter
//                       .pauseFor(3200)
//                       .changeDelay(4)
//                       .typeString(
//                         '<span style="color: #4b0082;">Hey there! </span>'
//                       )
//                       .typeString(
//                         '<span style="color:#000000;">Welcome to my portfolio. </span>'
//                       )
//                       .typeString(
//                         '<span style="color: #26a641">Yep, I borrowed some inspiration from GitHub ’s style.</span>'
//                       )
//                       .typeString(
//                         '<span style="color: #000000;"> It’s not just another ordinary developer portfolio!!! </span>'
//                       )
//                       .typeString(
//                         '<span style="color: #f44336;">I’ve mixed in some extra features. </span>'
//                       )
//                       .typeString(
//                         '<span style="color: #000000;">I hope you enjoy it!</span>'
//                       )
//                       .start();
//                   }}
//                 />
//               </div>
//             </div>

//             {/* Image on the right */}
//             <Image
//               src={images.laptopoctocat}
//               alt="laptopoctocat"
//               width={300}
//               height={300}
//               quality={100}
//               className={`w-auto h-[150px] sm:h-[250px] lg:h-[300px] relative z-[9999998] ${
//                 isClosing ? "gp-image-out" : ""
//               }`}
//             />
//           </div>

//           {/* Small height */}
//           <div
//             className={`small-height-show z-[9999999] ${
//               isClosing ? "small-height-closing" : ""
//             }`}
//           >
//             {/* Comic text on the left */}
//             <div
//               className={`bg-white rounded-lg border border-gray-300 shadow small-height-show-comic `}
//             >
//               <div className="text-base sm:text-lg font-semibold text-black monospace-text relative z-[9999999]">
//                 <Typewriter
//                   options={{
//                     cursor: null,
//                   }}
//                   onInit={(typewriter) => {
//                     typewriter
//                       .pauseFor(3000)
//                       .changeDelay(4)
//                       .typeString(
//                         '<span style="color: #4b0082;">Hey there! </span>'
//                       )
//                       .typeString(
//                         '<span style="color:#000000;">Welcome to my portfolio. </span>'
//                       )
//                       .typeString(
//                         '<span style="color: #26a641">Yep, I borrowed some inspiration from GitHub ’s style.</span>'
//                       )
//                       .typeString(
//                         '<span style="color: #000000;"> It’s not just another ordinary developer portfolio!!! </span>'
//                       )
//                       .typeString(
//                         '<span style="color: #f44336;">I’ve mixed in some extra features. </span>'
//                       )
//                       .typeString(
//                         '<span style="color: #000000;">I hope you enjoy it!</span>'
//                       )
//                       .start();
//                   }}
//                 />
//               </div>
//             </div>

//             {/* Image on the right */}
//             <Image
//               src={images.laptopoctocat}
//               alt="laptopoctocat"
//               width={300}
//               height={300}
//               quality={100}
//               className={`w-auto h-[150px] sm:h-[250px] lg:h-[300px] relative z-[9999998]`}
//             />
//           </div> */}
