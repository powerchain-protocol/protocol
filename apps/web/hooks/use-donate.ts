"use client";

import { useCallback, useState } from "react";

export interface DonationInput { campaignId: string; amount: string; memo?: string }
export interface DonationResult { ok: true; signature: string; explorerUrl: string }

export function useDonate(endpoint = "/api/v1/donate") {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DonationResult | null>(null);

  const donate = useCallback(async (input: DonationInput) => {
    setLoading(true); setError(null); setResult(null);
    try {
      const response = await fetch(endpoint, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(input) });
      const body = await response.json() as DonationResult | { ok: false; error: string };
      if (!response.ok || !body.ok) throw new Error(body.ok ? "Donation failed" : body.error);
      setResult(body); return body;
    } catch (cause) {
      const message = cause instanceof Error ? cause.message : "Unable to submit donation";
      setError(message); throw cause;
    } finally { setLoading(false); }
  }, [endpoint]);

  return { donate, loading, error, result, reset: () => { setError(null); setResult(null); } };
}
