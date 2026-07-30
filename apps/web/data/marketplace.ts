
import type { MarketplaceAsset } from "@/types/marketplace";

export const MARKETPLACE_ASSETS: MarketplaceAsset[] = [
  {
    id: "asset_carbon_001",
    slug: "nordic-solar-carbon-2026",
    title: "Nordic Solar PCC 2026",
    category: "carbon",
    location: "Oulu, Finland",
    issuer: "Powerchain Nordic",
    unitLabel: "credit",
    availableUnits: 84210,
    minimumUnits: 1,
    unitPriceEur: 22.8,
    impactMetric: "Avoided emissions",
    impactValue: "1 tCO₂e / credit",
    status: "open",
    verified: true,
    image: "/screenshots/carbon-credits-mobile.webp",
    tags: ["PCC", "solar", "2026"]
  },
  {
    id: "asset_solar_001",
    slug: "oulu-solar-community-note",
    title: "Oulu Solar Community Note",
    category: "solar",
    location: "Oulu, Finland",
    issuer: "Oulu Energy Cooperative",
    unitLabel: "share",
    availableUnits: 12400,
    minimumUnits: 10,
    unitPriceEur: 25,
    annualYieldPercent: 6.4,
    impactMetric: "Renewable capacity",
    impactValue: "2.5 kW / 100 shares",
    status: "funding",
    verified: true,
    image: "/screenshots/developer-portal-mobile.webp",
    tags: ["solar", "community", "yield"]
  },
  {
    id: "asset_wind_001",
    slug: "baltic-wind-revenue-share",
    title: "Baltic Wind Revenue Share",
    category: "wind",
    location: "Vaasa, Finland",
    issuer: "Baltic Wind Cooperative",
    unitLabel: "token",
    availableUnits: 50800,
    minimumUnits: 5,
    unitPriceEur: 42.5,
    annualYieldPercent: 7.1,
    impactMetric: "Annual clean energy",
    impactValue: "14.2 MWh / 100 tokens",
    status: "open",
    verified: true,
    image: "/screenshots/carbon-credits-tablet.webp",
    tags: ["wind", "income", "tokenized"]
  }
];
