
export type MarketRate = {
  id: string;
  region: string;
  currency: "GBP" | "EUR" | "USD";
  pricePerKwh: number;
  source: string;
  validFrom: string;
  validUntil: string;
};
