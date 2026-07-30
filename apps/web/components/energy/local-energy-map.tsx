"use client";
import { MapPin, Radio, Zap } from "lucide-react";
import { ENERGY_SOURCE_LABELS } from "@/constants/energy-market";
import type { LocalEnergyMarket } from "@/types/energy-market";
export function LocalEnergyMap({markets}:{markets:readonly LocalEnergyMarket[]}){
 return <div className="relative min-h-[430px] overflow-hidden rounded-3xl border border-white/10 bg-slate-900 p-5">
  <div className="absolute inset-0 opacity-20" style={{backgroundImage:"linear-gradient(rgba(255,255,255,.15) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.15) 1px,transparent 1px)",backgroundSize:"38px 38px"}} />
  <div className="relative flex items-center justify-between"><div><p className="text-sm text-emerald-300">Local grid map</p><h2 className="text-xl font-semibold">Verified energy nearby</h2></div><span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300"><Radio className="mr-1 inline" size={13}/>Live demo data</span></div>
  <div className="relative mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{markets.map((m)=><article key={m.id} className="rounded-2xl border border-white/10 bg-slate-950/85 p-4 backdrop-blur"><div className="flex items-start justify-between"><MapPin className="text-emerald-300"/><span className="text-xs text-slate-400">{m.distanceKm} km</span></div><h3 className="mt-4 font-semibold">{m.name}</h3><p className="mt-1 text-sm text-slate-400">{ENERGY_SOURCE_LABELS[m.source]} · {m.region}</p><div className="mt-4 flex justify-between text-sm"><span><Zap className="mr-1 inline" size={14}/>{m.availableKwh.toLocaleString()} kWh</span><strong>€{m.pricePerKwh.toFixed(2)}/kWh</strong></div></article>)}</div>
 </div>
}
