
import type { CarbonProject } from "@/types/carbon";

export const CARBON_PROJECTS: CarbonProject[] = [
  {
    id: "carbon_nordic_solar_01",
    slug: "nordic-solar-regeneration",
    name: "Nordic Solar Regeneration",
    location: "Oulu, Finland",
    standard: "PCC",
    issuedCredits: 148250,
    availableCredits: 84210,
    retiredCredits: 64040,
    pricePerCreditEur: 22.8,
    verificationRate: 99.98,
    status: "verified",
    operator: "Powerchain Nordic",
    image: "/screenshots/carbon-credits-tablet.webp",
    tokenMint: "PWRCRXXZxbg6FdQZfK3PMD7KP8xfxs9acvifJiG46wc"
  },
  {
    id: "carbon_baltic_wind_01",
    slug: "baltic-offshore-wind",
    name: "Baltic Offshore Wind",
    location: "Vaasa, Finland",
    standard: "PCC",
    issuedCredits: 326000,
    availableCredits: 192400,
    retiredCredits: 133600,
    pricePerCreditEur: 24.4,
    verificationRate: 99.95,
    status: "verified",
    operator: "Baltic Wind Cooperative",
    image: "/screenshots/carbon-credits-wide.webp"
  },
  {
    id: "carbon_forest_01",
    slug: "boreal-forest-restoration",
    name: "Boreal Forest Restoration",
    location: "Lapland, Finland",
    standard: "VCS",
    issuedCredits: 89000,
    availableCredits: 31450,
    retiredCredits: 57550,
    pricePerCreditEur: 31.2,
    verificationRate: 99.91,
    status: "verified",
    operator: "Northern Forest Trust",
    image: "/screenshots/carbon-credits-mobile.webp"
  }
];

export const CARBON_METRICS = {
  retiredTonnes: 15_200_000,
  creditsIssued: 847_000_000,
  verificationRate: 99.97,
  immutableAuditPercent: 100,
  verifiedProjects: 1248
} as const;
