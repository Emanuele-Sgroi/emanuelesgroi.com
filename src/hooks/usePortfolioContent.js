"use client";

import { useState, useEffect } from "react";
import { fetchPortfolioContent } from "@/utils/fetchCMSContent";

/**
 * Custom Hook: usePortfolioContent
 *
 * This hook fetches the content for the portfolio section of the website using the `fetchPortfolioContent` function.
 * It manages the loading state, error state, and the fetched portfolio data.
 *
 * - **portfolioContent**: Contains the fetched portfolio data, or `null` if no data has been fetched.
 * - **isPortfolioLoading**: A boolean indicating whether the portfolio content is still being loaded.
 * - **isPortfolioError**: A boolean indicating whether there was an error during the fetch of portfolio content.
 *
 * This hook performs an asynchronous operation to load portfolio content when the component is mounted.
 * It handles any errors that may occur during the fetching process and updates the loading and error states.
 *
 * Usage:
 * - Call `usePortfolioContent()` to access the `portfolioContent`, `isPortfolioLoading`, and `isPortfolioError` values in your component.
 * - The hook automatically triggers the content fetch when the component mounts.
 */

export const usePortfolioContent = () => {
  const [portfolioContent, setPortfolioContent] = useState(null);
  const [isPortfolioLoading, setIsPortfolioLoading] = useState(true);
  const [isPortfolioError, setIsPortfolioError] = useState(false);

  useEffect(() => {
    async function loadContent() {
      setIsPortfolioLoading(true);
      setIsPortfolioError(false);

      try {
        const { data, error } = await fetchPortfolioContent();

        if (error) {
          console.error("Error fetching Portfolio content:", error);
          setIsPortfolioError(true);
        } else {
          setPortfolioContent(data);
        }
      } catch (error) {
        console.error("Unexpected error fetching Portfolio content:", error);
        setIsPortfolioError(true);
      } finally {
        setIsPortfolioLoading(false);
      }
    }

    loadContent();
  }, []);

  return { portfolioContent, isPortfolioLoading, isPortfolioError };
};
