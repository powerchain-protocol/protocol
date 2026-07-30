
"use client";

import { useMemo, useState } from "react";
import { BadgeCheck, MapPin } from "lucide-react";
import type { MarketplaceAsset } from "@/types/marketplace";
import { calculateMarketplaceOrder } from "@/lib/marketplace/calculations";

export function MarketplaceCard({ asset }: { asset: MarketplaceAsset }) {
  const [units, setUnits] = useState(asset.minimumUnits);
  const totals = useMemo(() => calculateMarketplaceOrder({ units, unitPriceEur: asset.unitPriceEur }), [units, asset.unitPriceEur]);

  return (
    <article className="overflow-hidden rounded-3xl border bg-white shadow-[0_18px_60px_rgba(15,23,42,.06)]">
      <div className="relative h-48 bg-cover bg-center" style={{ backgroundImage: `linear-gradient(to top, rgba(6,24,17,.55), transparent), url(${asset.image})` }}>
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-black uppercase text-emerald-800">{asset.category}</span>
        {asset.verified && <BadgeCheck className="absolute right-4 top-4 size-6 text-white" />}
      </div>
      <div className="p-5">
        <h2 className="text-xl font-bold">{asset.title}</h2>
        <p className="mt-2 flex items-center gap-2 text-xs text-slate-500"><MapPin className="size-3.5" />{asset.location} · {asset.issuer}</p>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-slate-50 p-3"><small className="text-slate-500">Unit price</small><b className="mt-1 block">{asset.unitPriceEur.toLocaleString("fi-FI",{style:"currency",currency:"EUR"})}</b></div>
          <div className="rounded-xl bg-slate-50 p-3"><small className="text-slate-500">Available</small><b className="mt-1 block">{asset.availableUnits.toLocaleString("fi-FI")} {asset.unitLabel}s</b></div>
        </div>
        <label className="mt-5 block text-sm font-semibold">Units<input type="number" min={asset.minimumUnits} value={units} onChange={(event)=>setUnits(Math.max(asset.minimumUnits, Number(event.target.value)||asset.minimumUnits))} className="mt-2 h-11 w-full rounded-xl border px-3" /></label>
        <dl className="mt-4 space-y-2 rounded-xl bg-slate-50 p-4 text-sm">
          <div className="flex justify-between"><dt>Subtotal</dt><dd>{totals.subtotalEur.toLocaleString("fi-FI",{style:"currency",currency:"EUR"})}</dd></div>
          <div className="flex justify-between"><dt>Platform fee</dt><dd>{totals.platformFeeEur.toLocaleString("fi-FI",{style:"currency",currency:"EUR"})}</dd></div>
          <div className="flex justify-between border-t pt-2 font-bold"><dt>Total</dt><dd>{totals.totalEur.toLocaleString("fi-FI",{style:"currency",currency:"EUR"})}</dd></div>
        </dl>
        <button className="mt-5 w-full rounded-xl bg-emerald-800 py-3 text-sm font-semibold text-white">Review investment</button>
      </div>
    </article>
  );
}
