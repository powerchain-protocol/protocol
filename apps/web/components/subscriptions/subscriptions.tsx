
"use client";

import { Check } from "lucide-react";
import { SUBSCRIPTION_PRICES, PLAN_ACCESS } from "@/data/prices";
import { useSubscribe } from "@/hooks/use-subscribe";
import type { BillingInterval, SubscriptionTier } from "@/types/subscription";

const names:Record<SubscriptionTier,string>={starter:"Starter",professional:"Professional",enterprise:"Enterprise"};

export function Subscriptions({ interval="annual" }: { interval?:BillingInterval }) {
  const {subscribe,loading,error}=useSubscribe();
  const tiers:SubscriptionTier[]=["starter","professional","enterprise"];

  return <section className="grid gap-5 lg:grid-cols-3">{tiers.map((tier)=>{
    const price=SUBSCRIPTION_PRICES.find((item)=>item.tier===tier&&item.interval===interval)!;
    const access=PLAN_ACCESS[tier];
    return <article key={tier} className={`rounded-3xl border p-7 ${tier==="professional"?"bg-emerald-950 text-white":"bg-white"}`}>
      <h2 className="text-xl font-bold">{names[tier]}</h2>
      <strong className="mt-6 block text-4xl">{price.amountEur===null?"Custom":price.amountEur.toLocaleString("fi-FI",{style:"currency",currency:"EUR",maximumFractionDigits:0})}</strong>
      <p className="mt-2 text-sm opacity-70">{access.seats>=9999?"Unlimited":access.seats} seats</p>
      <ul className="mt-6 space-y-3 text-sm">
        <li className="flex gap-2"><Check className="size-4 text-lime-400"/>CRM access: {access.crm?"Included":"Not included"}</li>
        <li className="flex gap-2"><Check className="size-4 text-lime-400"/>ERP access: {access.erp?"Included":"Not included"}</li>
        <li className="flex gap-2"><Check className="size-4 text-lime-400"/>ZK role verification: {access.zkAccess?"Included":"Not included"}</li>
        <li className="flex gap-2"><Check className="size-4 text-lime-400"/>{access.roles.length} selectable company roles</li>
      </ul>
      <button disabled={loading} onClick={()=>void subscribe(tier,interval)} className={`mt-7 w-full rounded-xl py-3 text-sm font-bold ${tier==="professional"?"bg-lime-400 text-emerald-950":"bg-emerald-800 text-white"}`}>Choose {names[tier]}</button>
      {error&&<p className="mt-3 text-xs text-rose-500">{error}</p>}
    </article>
  })}</section>;
}
