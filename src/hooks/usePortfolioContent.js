"use client";

import useSWR from "swr";
import client from "@/utils/contentfulClient";
import { useEffect, useState } from "react";

const fetchPortfolioContent = async () => {
  const response = await client.getEntries({
    content_type: "portfolioPage",
    limit: 1,
  });

  if (response.items.length > 0) {
    return response.items[0].fields;
  }
  throw new Error("No content found for the Portfolio Page");
};

export const usePortfolioContent = () => {
  const [isPortfolioLoading, setIsPortfolioLoading] = useState(true);

  const { data, error } = useSWR("portfolioPage", fetchPortfolioContent, {
    onLoadingSlow: () => setIsPortfolioLoading(true),
    onSuccess: () => setIsPortfolioLoading(false),
    onError: () => setIsPortfolioLoading(false),
  });

  useEffect(() => {
    setIsPortfolioLoading(!data && !error);
  }, [data, error]); // setIsPortfolioLoading

  // Handling the loading and error states directly here
  return {
    portfolioContent: data || null,
    isPortfolioLoading,
    isPortfolioError: !!error,
  };
};
