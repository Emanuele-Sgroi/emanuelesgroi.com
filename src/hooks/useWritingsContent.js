"use client";

import { useState, useEffect } from "react";
import { fetchWritingsContent } from "@/utils/fetchCMSContent";

export const useWritingsContent = () => {
  const [writingsContent, setWritingsContent] = useState(null);
  const [isWritingsLoading, setIsWritingsLoading] = useState(true);
  const [isWritingsError, setIsWritingsError] = useState(false);

  useEffect(() => {
    async function loadContent() {
      setIsWritingsLoading(true);
      setIsWritingsError(false);

      try {
        const { data, error } = await fetchWritingsContent();

        if (error) {
          console.error("Error fetching Writings content:", error);
          setIsWritingsError(true);
        } else {
          setWritingsContent(data);
        }
      } catch (error) {
        console.error("Unexpected error fetching Writings content:", error);
        setIsWritingsError(true);
      } finally {
        setIsWritingsLoading(false);
      }
    }

    loadContent();
  }, []);

  return { writingsContent, isWritingsLoading, isWritingsError };
};
