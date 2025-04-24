"use client";

import { createContext, useContext, useState } from "react";
import { Spinner } from "@/components";

const FullScreenSpinningContext = createContext();

export const useFullScreenSpinner = () => useContext(FullScreenSpinningContext);

export const FullScreenSpinnerProvider = ({ children }) => {
  const [isFullScreenSpinner, setIsFullScreenSpinner] = useState(false);

  return (
    <FullScreenSpinningContext.Provider
      value={{ isFullScreenSpinner, setIsFullScreenSpinner }}
    >
      {children}
      {isFullScreenSpinner && (
        <div className="fixed inset-0 z-[9999999999999999999999999999999999] bg-[rgba(255,255,255,0.69)] dark:bg-[rgba(13,17,23,0.69)] flex items-center justify-center">
          <Spinner />
        </div>
      )}
    </FullScreenSpinningContext.Provider>
  );
};
