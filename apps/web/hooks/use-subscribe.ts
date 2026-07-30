
"use client";

import { useState } from "react";
import type { BillingInterval, SubscriptionTier } from "@/types/subscription";

export function useSubscribe() {
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState<string>();

  async function subscribe(tier: SubscriptionTier, interval: BillingInterval) {
    setLoading(true);
    setError(undefined);
    try {
      const response=await fetch("/api/subscriptions",{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify({tier,interval})
      });
      if(!response.ok) throw new Error("Subscription checkout could not be created.");
      const body=await response.json() as {data:{checkoutUrl:string}};
      window.location.assign(body.data.checkoutUrl);
    } catch(cause) {
      setError(cause instanceof Error?cause.message:"Subscription checkout failed.");
    } finally {
      setLoading(false);
    }
  }

  return {subscribe,loading,error};
}
