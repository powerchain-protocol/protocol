
import type { EnergyLocation, GeoPoint } from "@/types/locations";

export type MapBounds = {
  north: number;
  south: number;
  east: number;
  west: number;
};

export function calculateBounds(locations: EnergyLocation[]): MapBounds | null {
  if (!locations.length) return null;

  return locations.reduce<MapBounds>(
    (bounds, location) => ({
      north: Math.max(bounds.north, location.position.latitude),
      south: Math.min(bounds.south, location.position.latitude),
      east: Math.max(bounds.east, location.position.longitude),
      west: Math.min(bounds.west, location.position.longitude)
    }),
    {
      north: locations[0].position.latitude,
      south: locations[0].position.latitude,
      east: locations[0].position.longitude,
      west: locations[0].position.longitude
    }
  );
}

export function projectPoint(point: GeoPoint, bounds: MapBounds, width: number, height: number) {
  const longitudeSpan = Math.max(bounds.east - bounds.west, 0.0001);
  const latitudeSpan = Math.max(bounds.north - bounds.south, 0.0001);

  return {
    x: ((point.longitude - bounds.west) / longitudeSpan) * width,
    y: height - ((point.latitude - bounds.south) / latitudeSpan) * height
  };
}

export function distanceKm(a: GeoPoint, b: GeoPoint) {
  const earthRadiusKm = 6371;
  const toRadians = (degrees: number) => degrees * Math.PI / 180;
  const latitudeDelta = toRadians(b.latitude - a.latitude);
  const longitudeDelta = toRadians(b.longitude - a.longitude);
  const latitudeA = toRadians(a.latitude);
  const latitudeB = toRadians(b.latitude);

  const haversine =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(latitudeA) * Math.cos(latitudeB) * Math.sin(longitudeDelta / 2) ** 2;

  return earthRadiusKm * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
}
