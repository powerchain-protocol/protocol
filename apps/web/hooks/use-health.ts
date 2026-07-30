"use client";
import { useCallback, useEffect, useState } from "react";
import type { HealthReport } from "@powerchain/core/health";

export function useHealth(pollMs = 30_000) {
  const [data, setData] = useState<HealthReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const refresh = useCallback(async () => {
    try {
      const response = await fetch("/api/health", { cache: "no-store" });
      if (!response.ok) throw new Error(`Health endpoint returned ${response.status}`);
      setData(await response.json() as HealthReport); setError(null);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Health check failed"); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { void refresh(); const timer = window.setInterval(() => void refresh(), pollMs); return () => window.clearInterval(timer); }, [pollMs, refresh]);
  return { data, error, loading, refresh };
}
