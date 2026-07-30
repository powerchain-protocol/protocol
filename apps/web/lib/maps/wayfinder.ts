
import type { EnergyLocation, GeoPoint } from "@/types/locations";
import { distanceKm } from "./mapper";

export type WayfinderRoute = {
  id: string;
  origin: GeoPoint;
  destination: EnergyLocation;
  distanceKm: number;
  estimatedMinutes: number;
  mode: "drive" | "walk" | "grid";
};

export function createWayfinderRoute(
  origin: GeoPoint,
  destination: EnergyLocation,
  mode: WayfinderRoute["mode"] = "drive"
): WayfinderRoute {
  const directDistance = distanceKm(origin, destination.position);
  const multiplier = mode === "walk" ? 1.18 : mode === "drive" ? 1.28 : 1;
  const speed = mode === "walk" ? 5 : mode === "drive" ? 70 : 180;

  return {
    id: `route_${destination.id}_${mode}`,
    origin,
    destination,
    distanceKm: directDistance * multiplier,
    estimatedMinutes: Math.max(1, Math.round((directDistance * multiplier / speed) * 60)),
    mode
  };
}

export function nearestLocations(origin: GeoPoint, locations: EnergyLocation[], limit = 5) {
  return [...locations]
    .map((location) => ({ location, distanceKm: distanceKm(origin, location.position) }))
    .sort((a, b) => a.distanceKm - b.distanceKm)
    .slice(0, limit);
}
