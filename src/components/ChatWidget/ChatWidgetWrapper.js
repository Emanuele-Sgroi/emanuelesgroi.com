"use client";

import React from "react";
import ChatWidget from "./ChatWidget";

export default function ChatWidgetWrapper({
  manuPilotContent,
  portfolioContent,
  isCmsError,
}) {
  return (
    <ChatWidget
      manuPilotContent={manuPilotContent}
      portfolioContent={portfolioContent}
      isCmsError={isCmsError}
    />
  );
}
