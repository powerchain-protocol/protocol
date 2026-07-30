
export type BillingCycle = "monthly" | "yearly";
export type PurchaseTierId = "developer" | "starter" | "growth" | "enterprise";

export type PurchaseTier = {
  id: PurchaseTierId;
  name: string;
  description: string;
  monthlyUsd: number | null;
  yearlyUsd: number | null;
  yearlySavingsPercent?: number;
  seats: number | null;
  apiRequestsPerMonth: number | null;
  popular?: boolean;
  features: string[];
  companyAccess: string[];
  prosumerAccess: boolean;
};

export type PurchaseTierQuote = {
  tierId: PurchaseTierId;
  billingCycle: BillingCycle;
  subtotalUsd: number;
  discountUsd: number;
  totalUsd: number;
  effectiveMonthlyUsd: number;
};
