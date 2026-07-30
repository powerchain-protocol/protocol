"use client";
import { useMemo, useState } from "react";
import { quoteRwaTrade, type RwaAsset } from "@powerchain/energy-iot";
import { RwaBadge } from "./rwa-badge";

export function RwaCard({asset}:{asset:RwaAsset}){
 const [units,setUnits]=useState(1);
 const quote=useMemo(()=>{try{return quoteRwaTrade(asset,units)}catch{return null}},[asset,units]);
 return <article className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-sm">
  <div className="flex items-start justify-between gap-3"><div><p className="text-xs text-slate-400">{asset.symbol} · {asset.region}</p><h2 className="mt-1 font-semibold">{asset.name}</h2></div><RwaBadge assetClass={asset.assetClass}/></div>
  <dl className="mt-5 grid grid-cols-2 gap-3 text-sm"><div><dt className="text-slate-500">Price</dt><dd>{asset.price.toFixed(3)} {asset.currency}/{asset.unit}</dd></div><div><dt className="text-slate-500">Available</dt><dd>{asset.availableUnits.toLocaleString()} {asset.unit}</dd></div><div><dt className="text-slate-500">Issuer</dt><dd>{asset.issuer}</dd></div><div><dt className="text-slate-500">Status</dt><dd className="capitalize">{asset.status}</dd></div></dl>
  <label className="mt-5 block text-xs text-slate-400">Trade units<input className="mt-2 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm" min={1} max={asset.availableUnits} step={asset.unit==="unit"?1:.1} type="number" value={units} onChange={e=>setUnits(Number(e.target.value))}/></label>
  <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 text-sm"><span className="text-slate-400">Settlement</span><strong>{quote?`${quote.settlementTotal.toFixed(3)} ${quote.currency}`:"Unavailable"}</strong></div>
  <button disabled={!quote} className="mt-4 w-full rounded-lg bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 disabled:opacity-40">Create trade order</button>
 </article>
}
