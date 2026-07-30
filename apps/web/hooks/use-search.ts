
"use client";

import { useDeferredValue, useMemo, useState } from "react";
import type { EnergyLocation, LocationCategory } from "@/types/locations";

export function useSearch(items: EnergyLocation[]) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"all" | LocationCategory>("all");
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  const results = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory = category === "all" || item.category === category;
      const haystack = [
        item.name,
        item.address,
        item.municipality,
        item.operator,
        item.category,
        ...item.tags
      ].join(" ").toLowerCase();

      return matchesCategory && (!deferredQuery || haystack.includes(deferredQuery));
    });
  }, [items, category, deferredQuery]);

  return {
    query,
    setQuery,
    category,
    setCategory,
    results,
    resultCount: results.length,
    clear: () => {
      setQuery("");
      setCategory("all");
    }
  };
}
