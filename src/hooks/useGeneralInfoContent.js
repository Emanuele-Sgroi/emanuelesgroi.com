"use client";

import useSWR from "swr";
import client from "@/utils/contentfulClient";
import { useEffect, useState } from "react";

const fetchGeneralInfoContent = async () => {
  const response = await client.getEntries({
    content_type: "generalInfo",
    limit: 1,
  });

  if (response.items.length > 0) {
    return response.items[0].fields;
  }
  throw new Error("No content found for General Info");
};

export const useGeneralInfoContent = () => {
  const [isGeneralInfoLoading, setIsGeneralInfoLoading] = useState(true);

  const { data, error } = useSWR("generalInfo", fetchGeneralInfoContent, {
    onLoadingSlow: () => setIsGeneralInfoLoading(true),
    onSuccess: () => setIsGeneralInfoLoading(false),
    onError: () => setIsGeneralInfoLoading(false),
  });

  useEffect(() => {
    setIsGeneralInfoLoading(!data && !error);
  }, [data, error]); // setIsGeneralInfoLoading

  // Handling the loading and error states directly here
  return {
    generalInfoContent: data || null,
    isGeneralInfoLoading,
    isGeneralInfoError: !!error,
  };
};
