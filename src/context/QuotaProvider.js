"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const QuotaContext = createContext({});
export const useQuota = () => useContext(QuotaContext);

export default function QuotaProvider({ children }) {
  const [remaining, setRemaining] = useState(Infinity);
  const [resetAt, setResetAt] = useState(null);
  const [now, setNow] = useState(Date.now());

  /* ticking clock for countdown */
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const updateFromHeaders = (headers) => {
    const rem = Number(headers.get("x-quota-remaining"));
    const reset = headers.get("x-quota-reset");
    if (!isNaN(rem)) setRemaining(rem);
    if (reset) setResetAt(new Date(reset));
  };

  /* ── initial fetch ───────────────────────────── */
  useEffect(() => {
    fetch("/api/manupilot/quota")
      .then((r) => updateFromHeaders(r.headers))
      .catch(() => {});
  }, []);

  const secondsLeft =
    resetAt != null ? Math.max(0, Math.floor((resetAt - now) / 1000)) : null;

  return (
    <QuotaContext.Provider
      value={{ remaining, resetAt, secondsLeft, updateFromHeaders }}
    >
      {children}
    </QuotaContext.Provider>
  );
}
