import React from "react";
import ChatWidget from "./ChatWidget";
import { fetchPortfolioContent } from "@/utils/fetchCMSContent";

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

const ChatWidgetWrapper = async ({ manuPilotContent, isCmsError, lang }) => {
  const { data: portfolioContent, error: portfolioError } =
    await fetchPortfolioContent(lang);
  const hasError = isCmsError || portfolioError;
  return (
    <ChatWidget
      manuPilotContent={manuPilotContent}
      portfolioContent={portfolioContent}
      hasError={hasError}
    />
  );
};

export default ChatWidgetWrapper;
