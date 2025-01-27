"use client";

import useSWR from "swr";
import client from "@/utils/contentfulClient";
import { useEffect, useState } from "react";

const fetchWritingsContent = async () => {
  const response = await client.getEntries({
    content_type: "writingPage",
    limit: 1,
  });

  if (response.items.length > 0) {
    return response.items[0].fields;
  }
  throw new Error("No content found for Writings Page");
};

export const useWritingsContent = () => {
  const [isWritingsLoading, setIsWritingsLoading] = useState(true);

  const { data, error } = useSWR("writingPage", fetchWritingsContent, {
    onLoadingSlow: () => setIsWritingsLoading(true),
    onSuccess: () => setIsWritingsLoading(false),
    onError: () => setIsWritingsLoading(false),
  });

  useEffect(() => {
    setIsWritingsLoading(!data && !error);
  }, [data, error]);

  // Handling the loading and error states directly here
  return {
    writingsContent: data || null,
    isWritingsLoading,
    isWritingsError: !!error,
  };
};
