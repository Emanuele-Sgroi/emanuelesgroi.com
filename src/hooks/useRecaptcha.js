"use client";

import { useEffect, useState } from "react";

export function useRecaptcha(siteKey) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if script already exists
    if (document.querySelector('script[src*="recaptcha"]')) {
      setIsLoaded(true);
      return;
    }

    // Load reCAPTCHA script
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;
    script.onload = () => setIsLoaded(true);
    document.head.appendChild(script);

    return () => {
      // Cleanup
      const badge = document.querySelector(".grecaptcha-badge");
      if (badge) badge.remove();
    };
  }, [siteKey]);

  const executeRecaptcha = async (action) => {
    if (!isLoaded || !window.grecaptcha) {
      throw new Error("reCAPTCHA not loaded");
    }

    return new Promise((resolve, reject) => {
      window.grecaptcha.ready(async () => {
        try {
          const token = await window.grecaptcha.execute(siteKey, { action });
          resolve(token);
        } catch (error) {
          reject(error);
        }
      });
    });
  };

  return { isLoaded, executeRecaptcha };
}
