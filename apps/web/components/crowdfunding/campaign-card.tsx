
"use client";

import { useMemo, useState } from "react";
import type { CrowdfundingCampaign } from "@/types/crowdfunding";
import { calculateInvestment } from "@/lib/investments/payments";

export function CampaignCard({ campaign }: { campaign: CrowdfundingCampaign }) {
  const [amount, setAmount] = useState(campaign.minimumInvestmentEur);
  const [method, setMethod] = useState(campaign.paymentMethods[0]);
  const totals = useMemo(() => calculateInvestment({ amountEur: amount }), [amount]);
  const progress = Math.min(100, (campaign.raisedEur / campaign.goalEur) * 100);

  return (
    <article className="rounded-3xl border bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,.06)]">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">{campaign.category}</span>
        <span className="text-xs text-slate-500">{campaign.investors.toLocaleString("fi-FI")} investors</span>
      </div>
      <h2 className="mt-5 text-2xl font-bold">{campaign.title}</h2>
      <p className="mt-1 text-sm text-slate-500">{campaign.location}</p>
      <div className="mt-5 h-2 rounded-full bg-slate-100"><div className="h-full rounded-full bg-emerald-700" style={{ width: `${progress}%` }} /></div>
      <div className="mt-3 flex justify-between text-sm">
        <span>{campaign.raisedEur.toLocaleString("fi-FI",{style:"currency",currency:"EUR"})} raised</span>
        <b>{progress.toLocaleString("fi-FI",{maximumFractionDigits:1})}%</b>
      </div>

      <label className="mt-6 block text-sm font-semibold">
        Investment amount (€)
        <input type="number" min={campaign.minimumInvestmentEur} value={amount} onChange={(event)=>setAmount(Math.max(campaign.minimumInvestmentEur,Number(event.target.value)||campaign.minimumInvestmentEur))} className="mt-2 h-11 w-full rounded-xl border px-3" />
      </label>

      <label className="mt-4 block text-sm font-semibold">
        Payment method
        <select value={method} onChange={(event)=>setMethod(event.target.value as typeof method)} className="mt-2 h-11 w-full rounded-xl border bg-white px-3">
          {campaign.paymentMethods.map((item)=><option key={item} value={item}>{item}</option>)}
        </select>
      </label>

      <dl className="mt-5 space-y-2 rounded-xl bg-slate-50 p-4 text-sm">
        <div className="flex justify-between"><dt>Principal</dt><dd>{totals.principalEur.toLocaleString("fi-FI",{style:"currency",currency:"EUR"})}</dd></div>
        <div className="flex justify-between"><dt>Platform fee</dt><dd>{totals.platformFeeEur.toLocaleString("fi-FI",{style:"currency",currency:"EUR"})}</dd></div>
        <div className="flex justify-between border-t pt-2 font-bold"><dt>Total</dt><dd>{totals.totalEur.toLocaleString("fi-FI",{style:"currency",currency:"EUR"})}</dd></div>
      </dl>

      <button className="mt-5 w-full rounded-xl bg-emerald-800 py-3 font-semibold text-white">
        Continue with {method}
      </button>
    </article>
  );
}
