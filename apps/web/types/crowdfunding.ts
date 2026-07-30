
export type CrowdfundingCampaign = {
  id: string;
  slug: string;
  title: string;
  location: string;
  category: "solar" | "wind" | "battery" | "grid";
  goalEur: number;
  raisedEur: number;
  minimumInvestmentEur: number;
  annualYieldPercent?: number;
  investors: number;
  status: "open" | "funded" | "closed";
  paymentMethods: Array<"card" | "solana-pay" | "usdc" | "pwrc" | "onramp">;
};
