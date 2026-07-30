
"use client";
import {useState} from "react";
import {useTokenPrices} from "@/hooks/use-token-prices";
import type {PriceEnvironment} from "@/types/market-price";

export function TokenPriceBoard(){
 const [environment,setEnvironment]=useState<PriceEnvironment>("mock");
 const {result,loading,error}=useTokenPrices(environment);
 return <section className="rounded-[28px] border border-slate-200/70 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,.07)]">
  <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[.16em] text-emerald-700">Token prices</p><h2 className="mt-2 text-2xl font-bold">PWRC and settlement assets</h2></div><select value={environment} onChange={e=>setEnvironment(e.target.value as PriceEnvironment)} className="h-10 rounded-xl border bg-white px-3 text-sm font-semibold"><option value="mock">Mock data</option><option value="devnet">Devnet</option><option value="mainnet">Mainnet live</option></select></div>
  <div className="mt-6 grid gap-4 sm:grid-cols-3">{loading?[1,2,3].map(i=><div className="h-28 animate-pulse rounded-2xl bg-slate-100" key={i}/>):result?.data.map(item=><article className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5" key={item.symbol}><div className="flex items-center justify-between"><b>{item.symbol}</b><span className={`rounded-full px-2 py-1 text-[10px] font-bold ${item.availability==="available"?"bg-emerald-50 text-emerald-700":"bg-amber-50 text-amber-700"}`}>{item.source}</span></div><strong className="mt-4 block text-2xl">{item.priceUsd===null?"No data":`$${item.priceUsd.toLocaleString("en-GB",{maximumFractionDigits:8})}`}</strong><p className="mt-2 text-xs text-slate-500">{item.disclaimer??item.availability}</p></article>)}</div>
  {error&&<p className="mt-4 text-sm text-rose-600">{error}</p>}
  <p className="mt-5 text-xs leading-5 text-slate-400">{result?.meta.disclaimer}</p>
 </section>
}
