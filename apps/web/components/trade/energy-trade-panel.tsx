
"use client";

import { useMemo, useState } from "react";
import { ArrowDownUp, Bolt, TrendingUp } from "lucide-react";
import { calculateEnergyOrder } from "@/lib/trade/energy";

export function EnergyTradePanel() {
  const [side, setSide] = useState<"buy"|"sell">("buy");
  const [amount, setAmount] = useState("250");
  const [price, setPrice] = useState("0.1228");
  const totals = useMemo(() => calculateEnergyOrder({ side, amountKwh:Number(amount), pricePerKwhEur:Number(price) }), [side,amount,price]);

  return (
    <section className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
      <div className="rounded-3xl border bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,.06)]">
        <div className="flex items-center justify-between"><div><p className="text-xs font-black uppercase tracking-[.15em] text-emerald-700">Local energy market</p><h2 className="mt-2 text-2xl font-semibold">Buy and sell energy</h2></div><ArrowDownUp className="size-5 text-emerald-700" /></div>
        <div className="mt-6 grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1">
          {(["buy","sell"] as const).map((value)=><button key={value} onClick={()=>setSide(value)} className={`rounded-lg py-2 text-sm font-bold capitalize ${side===value?"bg-white text-emerald-800 shadow-sm":"text-slate-500"}`}>{value}</button>)}
        </div>
        <div className="mt-5 grid gap-4">
          <label className="text-sm font-semibold">Energy amount (kWh)<input value={amount} onChange={(e)=>setAmount(e.target.value)} className="mt-2 h-11 w-full rounded-xl border px-3" /></label>
          <label className="text-sm font-semibold">Price per kWh (€)<input value={price} onChange={(e)=>setPrice(e.target.value)} className="mt-2 h-11 w-full rounded-xl border px-3" /></label>
          <label className="text-sm font-semibold">Region<select className="mt-2 h-11 w-full rounded-xl border bg-white px-3"><option>FI-North</option><option>FI-South</option><option>SE-South</option></select></label>
        </div>
        <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm">
          <div className="flex justify-between"><span>Gross value</span><b>{totals.grossEur.toLocaleString("fi-FI",{style:"currency",currency:"EUR"})}</b></div>
          <div className="mt-2 flex justify-between"><span>Platform fee</span><b>{totals.platformFeeEur.toLocaleString("fi-FI",{style:"currency",currency:"EUR"})}</b></div>
        </div>
        <button className="mt-6 w-full rounded-xl bg-emerald-800 py-3 font-semibold text-white">Create {side} order</button>
      </div>
      <div className="rounded-3xl border bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,.06)]">
        <div className="flex items-center justify-between"><h2 className="text-xl font-semibold">Live energy order book</h2><TrendingUp className="size-5 text-emerald-700" /></div>
        <div className="mt-5 space-y-3">
          {[["Sell","Solar","FI-North","1 200 kWh","0,119 €/kWh"],["Buy","Local mix","FI-South","850 kWh","0,124 €/kWh"],["Sell","Wind","SE-South","3 450 kWh","0,108 €/kWh"],["Buy","Battery discharge","FI-North","500 kWh","0,132 €/kWh"]].map((row)=><div className="grid grid-cols-[70px_1fr_1fr_1fr] items-center rounded-2xl border p-4 text-sm" key={row.join("-")}><span className={`rounded-full px-2 py-1 text-center text-[10px] font-bold ${row[0]==="Buy"?"bg-blue-50 text-blue-700":"bg-emerald-50 text-emerald-700"}`}>{row[0]}</span><span>{row[1]}</span><span className="text-slate-500">{row[2]} · {row[3]}</span><b className="text-right">{row[4]}</b></div>)}
        </div>
        <div className="mt-6 flex gap-3 rounded-2xl bg-emerald-50 p-4 text-sm"><Bolt className="size-5 shrink-0 text-emerald-700" /><p>Orders settle through Powerchain with metered delivery, wallet approval, and transparent fees.</p></div>
      </div>
    </section>
  );
}
