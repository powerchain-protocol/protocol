"use client";
import { useMemo, useState } from "react";
import type { RwaAsset, RwaAssetClass } from "@powerchain/energy-iot";
import { RwaCard } from "./rwa-card";
const filters:["all"|RwaAssetClass,string][]=[["all","All assets"],["renewable","Renewables"],["energy","P2P energy"],["carbon","Carbon"],["hardware","Hardware"]];
export function RwaMarket({assets,initialFilter="all"}:{assets:RwaAsset[];initialFilter?:"all"|RwaAssetClass}){const[filter,setFilter]=useState(initialFilter);const visible=useMemo(()=>filter==="all"?assets:assets.filter(x=>x.assetClass===filter),[assets,filter]);return <div><div className="mb-6 flex flex-wrap gap-2">{filters.map(([value,label])=><button key={value} onClick={()=>setFilter(value)} className={`rounded-full px-3 py-1.5 text-sm ${filter===value?"bg-emerald-400 text-slate-950":"border border-white/10 bg-white/5 text-slate-300"}`}>{label}</button>)}</div><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{visible.map(asset=><RwaCard key={asset.id} asset={asset}/>)}</div></div>}
