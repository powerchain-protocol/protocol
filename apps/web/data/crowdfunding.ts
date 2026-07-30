
import type { CrowdfundingCampaign } from "@/types/crowdfunding";

export const CROWDFUNDING_CAMPAIGNS: CrowdfundingCampaign[] = [
  {
    id: "campaign_solar_001",
    slug: "oulu-community-solar",
    title: "Oulu Community Solar Expansion",
    location: "Oulu, Finland",
    category: "solar",
    goalEur: 1200000,
    raisedEur: 864000,
    minimumInvestmentEur: 100,
    annualYieldPercent: 6.2,
    investors: 842,
    status: "open",
    paymentMethods: ["card", "solana-pay", "usdc", "pwrc", "onramp"]
  },
  {
    id: "campaign_battery_001",
    slug: "espoo-battery-reserve",
    title: "Espoo Battery Reserve",
    location: "Espoo, Finland",
    category: "battery",
    goalEur: 2400000,
    raisedEur: 1395000,
    minimumInvestmentEur: 250,
    annualYieldPercent: 7.4,
    investors: 511,
    status: "open",
    paymentMethods: ["solana-pay", "usdc", "pwrc", "onramp"]
  }
];
