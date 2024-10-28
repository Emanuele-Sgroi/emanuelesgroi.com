"use client";

import useSWR from "swr";
import client from "@/utils/contentfulClient";
import { useEffect, useState } from "react";

const fetchWelcomeContent = async () => {
  const response = await client.getEntries({
    content_type: "welcomePage",
    limit: 1,
  });

  if (response.items.length > 0) {
    return response.items[0].fields;
  }
  throw new Error("No content found for the Welcome Page");
};

export const useWelcomeContent = () => {
  const [isWelcomeLoading, setIsWelcomeLoading] = useState(true);

  const { data, error } = useSWR("welcomePage", fetchWelcomeContent, {
    onLoadingSlow: () => setIsWelcomeLoading(true),
    onSuccess: () => setIsWelcomeLoading(false),
    onError: () => setIsWelcomeLoading(false),
  });

  useEffect(() => {
    setIsWelcomeLoading(!data && !error);
  }, [data, error]); // setIsWelcomeLoading

  // Handling the loading and error states directly here
  return {
    welcomeContent: data || null,
    isWelcomeLoading,
    isWelcomeError: !!error,
  };
};
