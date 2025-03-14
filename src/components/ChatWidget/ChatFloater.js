"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useChat } from "@/context/ChatProvider";
import { images } from "@/utils/imageImport";

const ChatFloater = () => {
  const pathname = usePathname();
  const { openChat } = useChat();
  const [bounce, setBounce] = useState(false);
  const isManupilot = pathname === "/manupilot";

  useEffect(() => {
    const interval = setInterval(() => {
      setBounce(true);

      // Remove the bounce effect after 1.5s (match css)
      setTimeout(() => setBounce(false), 2000);
    }, 10000); // Triggers every 10 seconds

    return () => clearInterval(interval);
  }, []);

  if (isManupilot) {
    return null;
  }

  return (
    <div
      className="fixed bottom-6 md:bottom-8 right-6 md:right-8 z-[998] animate-fade-in-floater"
      style={{ pointerEvents: "auto" }}
    >
      <button onClick={openChat} className="relative center">
        <Image
          src={images.copilot}
          alt="ManuPilot"
          width={100}
          height={100}
          quality={100}
          className={`w-[40px] md:w-[44px] h-auto object-contain ${
            bounce ? "epic-bounce" : ""
          } `}
          priority={true}
          loading="eager"
        />
      </button>
    </div>
  );
};

export default ChatFloater;
