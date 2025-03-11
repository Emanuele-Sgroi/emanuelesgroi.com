"use client";

import { useState, useEffect } from "react";
import { fetchManuPilotContent } from "@/utils/fetchCMSContent";

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
