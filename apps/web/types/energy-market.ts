export type EnergySource = "solar" | "wind" | "hydro" | "battery" | "biogas";
export type MarketStatus = "open" | "balancing" | "closed";

export interface LocalEnergyMarket {
  id: string;
  name: string;
  region: string;
  country: string;
  latitude: number;
  longitude: number;
  source: EnergySource;
  availableKwh: number;
  pricePerKwh: number;
  currency: "USD" | "EUR";
  carbonIntensity: number;
  distanceKm: number;
  status: MarketStatus;
  verifiedMeters: number;
}

export interface EnergyProject {
  id: string;
  title: string;
  location: string;
  source: EnergySource;
  target: number;
  raised: number;
  currency: "USD" | "EUR";
  contributors: number;
  impact: string;
  verified: boolean;
}

export interface EnergyRoute {
  marketIds: string[];
  totalDistanceKm: number;
  estimatedKwh: number;
  estimatedCost: number;
  avoidedKgCo2: number;
}
