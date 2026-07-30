
import type { CompanyRole } from "./access";

export type BillingInterval = "monthly" | "annual";
export type SubscriptionTier = "starter" | "professional" | "enterprise";

export type SubscriptionPrice = {
  id: string;
  tier: SubscriptionTier;
  interval: BillingInterval;
  amountEur: number | null;
  currency: "USD";
};

export type Subscription = {
  id: string;
  organizationId: string;
  tier: SubscriptionTier;
  interval: BillingInterval;
  status: "trialing" | "active" | "past_due" | "cancelled";
  seats: number;
  currentPeriodEnd?: string;
  allowedRoles: CompanyRole[];
};
