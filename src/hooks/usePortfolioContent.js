"use client";

import { useState, useEffect } from "react";
import { fetchPortfolioContent } from "@/utils/fetchCMSContent";

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
