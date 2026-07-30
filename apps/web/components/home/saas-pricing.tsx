
"use client";
import Link from "next/link";
import { Check } from "lucide-react";
import { useState } from "react";
import { SAAS_PLANS } from "@/data/saas-plans";

export function SaaSPricing() {
  const [annual,setAnnual]=useState(true);
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-black uppercase tracking-[.15em] text-emerald-700">SaaS pricing</p>
        <h2 className="mt-4 text-4xl font-semibold tracking-tight">Infrastructure software that scales with your operation.</h2>
        <div className="mx-auto mt-6 inline-flex rounded-xl bg-slate-100 p-1">
          <button onClick={()=>setAnnual(false)} className={`rounded-lg px-4 py-2 text-sm font-semibold ${!annual?"bg-white shadow-sm":""}`}>Monthly</button>
          <button onClick={()=>setAnnual(true)} className={`rounded-lg px-4 py-2 text-sm font-semibold ${annual?"bg-white shadow-sm":""}`}>Annual</button>
        </div>
      </div>
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {SAAS_PLANS.map(plan=>(
          <article key={plan.id} className={`rounded-3xl border p-7 ${plan.popular?"bg-emerald-950 text-white":"bg-white"}`}>
            <h3 className="text-xl font-bold">{plan.name}</h3>
            <strong className="mt-6 block text-4xl">{plan.monthly===null?"Custom":(annual?plan.annual!:plan.monthly).toLocaleString("fi-FI",{style:"currency",currency:"EUR",maximumFractionDigits:0})}</strong>
            <ul className="mt-7 space-y-3">{plan.features.map(feature=><li className="flex gap-2 text-sm" key={feature}><Check className="size-4 text-lime-400"/>{feature}</li>)}</ul>
            <Link href={`/saas/checkout?plan=${plan.id}&billing=${annual?"annual":"monthly"}`} className={`mt-8 block rounded-xl py-3 text-center text-sm font-bold ${plan.popular?"bg-lime-400 text-emerald-950":"bg-emerald-800 text-white"}`}>Choose plan</Link>
          </article>
        ))}
      </div>
    </section>
  );
}
