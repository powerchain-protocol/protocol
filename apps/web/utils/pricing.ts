
import type {BillingCycle,PurchaseTier,PurchaseTierQuote} from "@/types/pricing";

export function quoteTier(tier:PurchaseTier,billingCycle:BillingCycle):PurchaseTierQuote{
  const monthly=tier.monthlyUsd??0;
  const yearly=tier.yearlyUsd??monthly*12;
  const listPrice=monthly*12;
  const discountUsd=billingCycle==="yearly"?Math.max(0,listPrice-yearly):0;
  const totalUsd=billingCycle==="yearly"?yearly:monthly;
  return {
    tierId:tier.id,
    billingCycle,
    subtotalUsd:billingCycle==="yearly"?listPrice:monthly,
    discountUsd,
    totalUsd,
    effectiveMonthlyUsd:billingCycle==="yearly"?yearly/12:monthly
  };
}

export function formatUsd(amount:number){
  return new Intl.NumberFormat("en-GB",{style:"currency",currency:"USD",maximumFractionDigits:2}).format(amount);
}
