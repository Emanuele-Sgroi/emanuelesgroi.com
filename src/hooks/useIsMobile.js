import { useState, useEffect } from "react";

/**
 * Custom Hook: useIsMobile
 *
 * This hook determines if the current device is a mobile device based on touch capabilities.
 * It listens for changes in the window size and updates the `isMobile` state accordingly.
 *
 * - **isMobile**: A boolean that indicates whether the user is on a mobile device.
 *
 * The hook checks if the device has touch support (either through the `ontouchstart` event or `navigator.maxTouchPoints`).
 * This is a simple, performance-efficient way to identify mobile devices and adjust the UI or behavior accordingly.
 *
 * Usage:
 * - Import and call `useIsMobile()` to get a boolean value (`true` or `false`) indicating if the device is mobile.
 * - It also listens for window resizing, ensuring that changes in device orientation or size are reflected.
 */

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(
        typeof window !== "undefined" &&
          ("ontouchstart" in window || navigator.maxTouchPoints > 0)
      );
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  return isMobile;
}
