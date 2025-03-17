"use client";

import { useState, useEffect } from "react";
import { fetchManuPilotContent } from "@/utils/fetchCMSContent";

/**
 * Custom Hook: useManuPilotContent
 *
 * This hook fetches the content for ManuPilot, an AI assistant, using the `fetchManuPilotContent` function.
 * It manages the loading state, error state, and the fetched data.
 *
 * - **manuPilotContent**: Contains the fetched data for ManuPilot, or `null` if no data has been fetched.
 * - **isManuPilotLoading**: A boolean indicating whether the data is still being loaded.
 * - **isManuPilotError**: A boolean indicating whether there was an error during the data fetch.
 *
 * This hook performs an asynchronous operation to load content when the component is mounted. It also handles error cases and ensures that loading and error states are updated appropriately.
 *
 * Usage:
 * - Call `useManuPilotContent()` to access the `manuPilotContent`, `isManuPilotLoading`, and `isManuPilotError` values in your component.
 * - The hook automatically triggers the fetch when the component mounts.
 */

export const useManuPilotContent = () => {
  const [manuPilotContent, setManuPilotContent] = useState(null);
  const [isManuPilotLoading, setIsManuPilotLoading] = useState(true);
  const [isManuPilotError, setIsManuPilotError] = useState(false);

  useEffect(() => {
    async function loadContent() {
      setIsManuPilotLoading(true);
      setIsManuPilotError(false);

      try {
        const { data, error } = await fetchManuPilotContent();

        if (error) {
          console.error("Error fetching ManuPilot content:", error);
          setIsManuPilotError(true);
        } else {
          setManuPilotContent(data);
        }
      } catch (error) {
        console.error("Unexpected error fetching ManuPilot content:", error);
        setIsManuPilotError(true);
      } finally {
        setIsManuPilotLoading(false);
      }
    }

    loadContent();
  }, []);

  return { manuPilotContent, isManuPilotLoading, isManuPilotError };
};
