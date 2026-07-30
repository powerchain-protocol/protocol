
"use client";
import { useEffect, useState } from "react";

export function useEnergyMarketRates() {
  const [rates, setRates] = useState<Array<Record<string, unknown>>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api/v1"}/energy/markets`)
      .then((response) => response.json())
      .then((body) => setRates(body.data ?? []))
      .finally(() => setLoading(false));
  }, []);

  return { rates, loading };
}
