
"use client";
import { useCallback, useEffect, useState } from "react";

export function useDevices(refreshMs = 30_000) {
  const [devices, setDevices] = useState<Array<Record<string, unknown>>>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api/v1"}/iot/devices`);
      const body = await response.json();
      setDevices(body.data ?? []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
    const timer = window.setInterval(refresh, refreshMs);
    return () => window.clearInterval(timer);
  }, [refresh, refreshMs]);

  return { devices, loading, refresh };
}
