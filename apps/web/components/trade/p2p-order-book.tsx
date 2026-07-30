
"use client";
import { useMemo, useState } from "react";
import { calculateEnergyTrade } from "@/lib/energy/calculations";

export function P2POrderBook() {
  const [amount, setAmount] = useState("250");
  const [price, setPrice] = useState("0.1228");
  const totals = useMemo(() => calculateEnergyTrade({ amountKwh: Number(amount), pricePerKwh: Number(price) }), [amount, price]);

  return (
    <section className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
      <div className="pc-panel rounded-3xl p-6">
        <p className="text-xs font-black uppercase tracking-[.16em] text-emerald-700">Create order</p>
        <h2 className="mt-2 text-2xl font-semibold">Trade renewable energy</h2>
        <div className="mt-6 grid gap-4">
          <label className="text-sm font-semibold">Energy amount (kWh)<input value={amount} onChange={(e)=>setAmount(e.target.value)} className="mt-2 h-11 w-full rounded-xl border px-3" /></label>
          <label className="text-sm font-semibold">Price per kWh (€)<input value={price} onChange={(e)=>setPrice(e.target.value)} className="mt-2 h-11 w-full rounded-xl border px-3" /></label>
        </div>
        <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm">
          <div className="flex justify-between"><span>Gross value</span><b>{totals.gross.toLocaleString("fi-FI",{style:"currency",currency:"EUR"})}</b></div>
          <div className="mt-2 flex justify-between"><span>Platform fee (2%)</span><b>{totals.fee.toLocaleString("fi-FI",{style:"currency",currency:"EUR"})}</b></div>
          <div className="mt-3 flex justify-between border-t pt-3"><span>Seller receives</span><b>{totals.sellerReceives.toLocaleString("fi-FI",{style:"currency",currency:"EUR"})}</b></div>
        </div>
        <button className="mt-6 w-full rounded-xl bg-emerald-800 py-3 font-semibold text-white">Publish sell order</button>
      </div>
      <div className="pc-panel rounded-3xl p-6">
        <h2 className="text-xl font-semibold">Live order book</h2>
        <div className="mt-5 space-y-3">
          {[["Solar","FI-North","1 200 kWh","0,119 €/kWh"],["Wind","SE-South","3 450 kWh","0,108 €/kWh"],["Hydro","NO-East","5 000 kWh","0,101 €/kWh"]].map((row)=><div className="grid grid-cols-4 items-center rounded-2xl border p-4 text-sm" key={row[1]}>{row.map((value,i)=><span className={i===3?"text-right font-bold":""} key={value}>{value}</span>)}</div>)}
        </div>
      </div>
    </section>
  );
}
