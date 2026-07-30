
export type MarketplaceAsset = {
  id: string;
  slug: string;
  title: string;
  category: "carbon" | "solar" | "wind" | "battery" | "grid" | "local-energy";
  location: string;
  issuer: string;
  unitLabel: string;
  availableUnits: number;
  minimumUnits: number;
  unitPriceEur: number;
  annualYieldPercent?: number;
  impactMetric: string;
  impactValue: string;
  status: "open" | "funding" | "fully-funded" | "closed";
  verified: boolean;
  image: string;
  tags: string[];
};
