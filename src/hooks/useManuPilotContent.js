"use client";

import useSWR from "swr";
import client from "@/utils/contentfulClient";
import { useEffect, useState } from "react";

const fetchManuPilotContent = async () => {
  const response = await client.getEntries({
    content_type: "manuPilotPage",
    limit: 1,
  });

  if (response.items.length > 0) {
    return response.items[0].fields;
  }
  throw new Error("No content found for manuPilotPage");
};

export const useManuPilotContent = () => {
  const [isManuPilotLoading, setIsManuPilotLoading] = useState(true);

  const { data, error } = useSWR("manuPilotPage", fetchManuPilotContent, {
    onLoadingSlow: () => setIsManuPilotLoading(true),
    onSuccess: () => setIsManuPilotLoading(false),
    onError: () => setIsManuPilotLoading(false),
  });

  useEffect(() => {
    setIsManuPilotLoading(!data && !error);
  }, [data, error]);

  // Handling the loading and error states directly here
  return {
    manuPilotContent: data || null,
    isManuPilotLoading,
    isManuPilotError: !!error,
  };
};
