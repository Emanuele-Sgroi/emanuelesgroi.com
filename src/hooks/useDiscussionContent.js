"use client";

import useSWR from "swr";
import client from "@/utils/contentfulClient";
import { useEffect, useState } from "react";

const fetchDiscussionContent = async () => {
  const response = await client.getEntries({
    content_type: "discussionPage",
    limit: 1,
  });

  if (response.items.length > 0) {
    return response.items[0].fields;
  }
  throw new Error("No content found for Discussion Page");
};

export const useDiscussionContent = () => {
  const [isDiscussionLoading, setIsDiscussionLoading] = useState(true);

  const { data, error } = useSWR("discussionPage", fetchDiscussionContent, {
    onLoadingSlow: () => setIsDiscussionLoading(true),
    onSuccess: () => setIsDiscussionLoading(false),
    onError: () => setIsDiscussionLoading(false),
  });

  useEffect(() => {
    setIsDiscussionLoading(!data && !error);
  }, [data, error]);

  // Handling the loading and error states directly here
  return {
    discussionContent: data || null,
    isDiscussionLoading,
    isDiscussionError: !!error,
  };
};
