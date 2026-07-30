
"use client";

import {Check, Sparkles} from "lucide-react";
import {useState} from "react";
import {PURCHASE_TIERS} from "@/data/purchase-tiers";
import {formatUsd,quoteTier} from "@/utils/pricing";
import {useTierPurchase} from "@/hooks/use-tier-purchase";
import type {BillingCycle} from "@/types/pricing";

export function Pricing(){
  const [cycle,setCycle]=useState<BillingCycle>("yearly");
  const {purchase,loadingTier,error}=useTierPurchase();

  return <section className="mx-auto max-w-[1500px] px-5 py-24">
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-xs font-black uppercase tracking-[.16em] text-emerald-700">Pricing</p>
      <h2 className="mt-4 text-5xl font-semibold tracking-tight">Simple, transparent, and scalable.</h2>
      <p className="mt-4 text-lg text-slate-500">Start free, scale monthly, or save with yearly billing.</p>
      <div className="mx-auto mt-7 inline-flex rounded-xl bg-slate-100 p-1">
        <button onClick={()=>setCycle("monthly")} className={`rounded-lg px-5 py-2.5 text-sm font-bold ${cycle==="monthly"?"bg-white shadow-sm":""}`}>Monthly</button>
        <button onClick={()=>setCycle("yearly")} className={`rounded-lg px-5 py-2.5 text-sm font-bold ${cycle==="yearly"?"bg-white shadow-sm":""}`}>Yearly · Save up to 17%</button>
      </div>
    </div>
    <div className="mt-12 grid gap-5 lg:grid-cols-4">
      {PURCHASE_TIERS.map((tier)=>{
        const quote=quoteTier(tier,cycle);
        return <article key={tier.id} className={`relative rounded-3xl border p-7 ${tier.popular?"border-emerald-500 bg-emerald-950 text-white shadow-2xl":"bg-white"}`}>
          {tier.popular&&<span className="absolute right-5 top-5 rounded-full bg-lime-300 px-3 py-1 text-[10px] font-black uppercase text-emerald-950">Popular</span>}
          <h3 className="text-xl font-bold">{tier.name}</h3>
          <p className="mt-2 min-h-12 text-sm opacity-70">{tier.description}</p>
          <div className="mt-7">
            {tier.monthlyUsd===null?<strong className="text-4xl">Custom</strong>:<><strong className="text-4xl">{formatUsd(quote.effectiveMonthlyUsd)}</strong><span className="text-sm opacity-60"> /month</span></>}
            {cycle==="yearly"&&quote.discountUsd>0&&<p className="mt-2 text-xs text-lime-400">Save {formatUsd(quote.discountUsd)} yearly</p>}
          </div>
          <ul className="mt-7 space-y-3">{tier.features.map(feature=><li className="flex gap-2 text-sm" key={feature}><Check className="mt-0.5 size-4 shrink-0 text-emerald-500"/>{feature}</li>)}</ul>
          <button onClick={()=>void purchase(tier.id,cycle)} disabled={loadingTier===tier.id} className={`mt-8 w-full rounded-xl py-3 text-sm font-bold ${tier.popular?"bg-lime-300 text-emerald-950":"bg-emerald-800 text-white"}`}>{loadingTier===tier.id?"Opening checkout…":tier.monthlyUsd===null?"Contact sales":"Choose plan"}</button>
        </article>
      })}
    </div>
    {error&&<p className="mt-5 text-center text-sm text-rose-600">{error}</p>}
  </section>
}
