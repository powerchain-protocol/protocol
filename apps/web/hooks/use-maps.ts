
"use client";

import { useCallback, useMemo, useState } from "react";
import type { EnergyLocation, GeoPoint } from "@/types/locations";
import { calculateBounds } from "@/lib/maps/mapper";
import { createWayfinderRoute } from "@/lib/maps/wayfinder";

export function useMaps(locations: EnergyLocation[]) {
  const [selectedId, setSelectedId] = useState<string | null>(locations[0]?.id ?? null);
  const [origin, setOrigin] = useState<GeoPoint | null>(null);
  const [zoom, setZoom] = useState(6);

  const selected = useMemo(
    () => locations.find((location) => location.id === selectedId) ?? null,
    [locations, selectedId]
  );

  const bounds = useMemo(() => calculateBounds(locations), [locations]);
  const route = useMemo(
    () => origin && selected ? createWayfinderRoute(origin, selected) : null,
    [origin, selected]
  );

  const locate = useCallback(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      setOrigin({ latitude: coords.latitude, longitude: coords.longitude });
    });
  }, []);

  return {
    selected,
    selectedId,
    select: setSelectedId,
    origin,
    setOrigin,
    locate,
    zoom,
    zoomIn: () => setZoom((value) => Math.min(14, value + 1)),
    zoomOut: () => setZoom((value) => Math.max(3, value - 1)),
    bounds,
    route
  };
}
