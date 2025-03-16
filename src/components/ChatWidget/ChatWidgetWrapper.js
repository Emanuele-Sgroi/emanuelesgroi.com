"use client";

import React from "react";
import ChatWidget from "./ChatWidget";

/**
 * ChatWidgetWrapper Component
 *
 * This wrapper component serves as a bridge for passing props to ChatWidget.
 * It allows easier integration and ensures that the necessary data is available.
 *
 * Props:
 * - manuPilotContent: Data for ManuPilot chat.
 * - portfolioContent: Data related to portfolio projects.
 * - isCmsError: Flag indicating if there was an error fetching CMS content.
 */

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
