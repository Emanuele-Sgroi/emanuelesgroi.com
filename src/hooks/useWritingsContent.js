"use client";

import { useState, useEffect } from "react";
import { fetchWritingsContent } from "@/utils/fetchCMSContent";

/**
 * Custom Hook: useWritingsContent
 *
 * This hook fetches the content for the writings section of the website using the `fetchWritingsContent` function.
 * It manages the loading state, error state, and the fetched writings data.
 *
 * - **writingsContent**: Contains the fetched writings data, or `null` if no data has been fetched.
 * - **isWritingsLoading**: A boolean indicating whether the writings content is still being loaded.
 * - **isWritingsError**: A boolean indicating whether there was an error during the fetch of writings content.
 *
 * This hook performs an asynchronous operation to load writings content when the component is mounted.
 * It handles any errors that may occur during the fetching process and updates the loading and error states.
 *
 * Usage:
 * - Call `useWritingsContent()` to access the `writingsContent`, `isWritingsLoading`, and `isWritingsError` values in your component.
 * - The hook automatically triggers the content fetch when the component mounts.
 */

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
