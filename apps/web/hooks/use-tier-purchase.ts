
"use client";
import {useState} from "react";
import type {BillingCycle,PurchaseTierId} from "@/types/pricing";
import {createTierPurchase} from "@/services/subscriptions";

export function useTierPurchase(){
  const [loadingTier,setLoadingTier]=useState<PurchaseTierId>();
  const [error,setError]=useState<string>();

  async function purchase(tierId:PurchaseTierId,billingCycle:BillingCycle){
    setLoadingTier(tierId);setError(undefined);
    try{
      const result=await createTierPurchase({tierId,billingCycle,returnUrl:window.location.href});
      window.location.assign(result.data.checkoutUrl);
    }catch(cause){
      setError(cause instanceof Error?cause.message:"Unable to open checkout.");
    }finally{
      setLoadingTier(undefined);
    }
  }

  return {purchase,loadingTier,error};
}
