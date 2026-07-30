
import type { SubscriptionPrice, SubscriptionTier } from "@/types/subscription";
import type { CompanyRole } from "@/types/access";

export const SUBSCRIPTION_PRICES: SubscriptionPrice[] = [
  { id:"price_starter_monthly", tier:"starter", interval:"monthly", amountEur:99, currency:"USD" },
  { id:"price_starter_annual", tier:"starter", interval:"annual", amountEur:990, currency:"USD" },
  { id:"price_pro_monthly", tier:"professional", interval:"monthly", amountEur:499, currency:"USD" },
  { id:"price_pro_annual", tier:"professional", interval:"annual", amountEur:4990, currency:"USD" },
  { id:"price_enterprise_monthly", tier:"enterprise", interval:"monthly", amountEur:null, currency:"USD" },
  { id:"price_enterprise_annual", tier:"enterprise", interval:"annual", amountEur:null, currency:"USD" }
];

export const PLAN_ACCESS: Record<SubscriptionTier,{
  seats:number;
  roles:CompanyRole[];
  crm:boolean;
  erp:boolean;
  zkAccess:boolean;
}> = {
  starter: { seats:3, roles:["OWNER","ENERGY_MANAGER","VIEWER"], crm:false, erp:false, zkAccess:false },
  professional: { seats:20, roles:["OWNER","EXECUTIVE","FINANCE_ADMIN","ENERGY_MANAGER","GRID_OPERATOR","ASSET_MANAGER","SUSTAINABILITY_MANAGER","DEVELOPER","ANALYST","AUDITOR","VIEWER"], crm:true, erp:true, zkAccess:true },
  enterprise: { seats:9999, roles:["OWNER","EXECUTIVE","FINANCE_ADMIN","ENERGY_MANAGER","GRID_OPERATOR","ASSET_MANAGER","SUSTAINABILITY_MANAGER","DEVELOPER","ANALYST","AUDITOR","VIEWER"], crm:true, erp:true, zkAccess:true }
};
