
import type {BillingCycle,PurchaseTierId} from "@/types/pricing";

export async function createTierPurchase(input:{
  tierId:PurchaseTierId;
  billingCycle:BillingCycle;
  companyId?:string;
  returnUrl?:string;
}){
  const response=await fetch("/api/subscriptions/purchase",{
    method:"POST",
    headers:{"content-type":"application/json"},
    body:JSON.stringify(input)
  });
  if(!response.ok)throw new Error("Subscription checkout could not be created.");
  return response.json() as Promise<{data:{checkoutUrl:string;reference:string}}>;
}
