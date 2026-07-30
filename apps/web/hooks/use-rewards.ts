
"use client";

import { useCallback, useEffect, useState } from "react";
import type { RewardSummary } from "@/types/rewards";

export function useRewards(userId?: string) {
  const [summary, setSummary] = useState<RewardSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const refresh = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/rewards?userId=${encodeURIComponent(userId)}`, { cache: "no-store" });
      if (!response.ok) throw new Error("Rewards request failed");
      const body = await response.json() as { data: RewardSummary };
      setSummary(body.data);
      setError(undefined);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Rewards request failed");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => { void refresh(); }, [refresh]);

  return { summary, loading, error, refresh };
}
