
export type LocationCategory =
  | "power-station"
  | "ev-station"
  | "solar-farm"
  | "wind-farm"
  | "battery-site"
  | "local-energy"
  | "grid-node";

export type GeoPoint = {
  latitude: number;
  longitude: number;
};

export type EnergyLocation = {
  id: string;
  slug: string;
  name: string;
  category: LocationCategory;
  position: GeoPoint;
  address: string;
  municipality: string;
  countryCode: string;
  capacityMw?: number;
  availableKw?: number;
  status: "online" | "offline" | "maintenance" | "planned";
  renewableSharePercent?: number;
  operator: string;
  tags: string[];
  updatedAt: string;
};
