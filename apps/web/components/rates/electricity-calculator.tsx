
"use client";
import {useMemo,useState} from "react";
import {GLOBAL_ELECTRICITY_RATES} from "@/data/rates";
import {calculateElectricityCost} from "@/utils/electricity-calculator";

export function ElectricityCalculator(){
  const [rateId,setRateId]=useState(GLOBAL_ELECTRICITY_RATES[0].id);
  const [consumption,setConsumption]=useState(1000);
  const [renewableShare,setRenewableShare]=useState(70);
  const rate=GLOBAL_ELECTRICITY_RATES.find((item)=>item.id===rateId)!;
  const result=useMemo(()=>calculateElectricityCost({consumptionKwh:consumption,pricePerKwh:rate.pricePerKwh,renewableSharePercent:renewableShare}),[rate,consumption,renewableShare]);

  return <section className="rounded-3xl border bg-white p-7 shadow-[0_18px_60px_rgba(15,23,42,.06)]">
    <h2 className="text-2xl font-bold">Electricity cost calculator</h2>
    <div className="mt-6 grid gap-4 md:grid-cols-3">
      <label className="text-sm font-semibold">Market<select value={rateId} onChange={e=>setRateId(e.target.value)} className="mt-2 h-11 w-full rounded-xl border bg-white px-3">{GLOBAL_ELECTRICITY_RATES.map(item=><option key={item.id} value={item.id}>{item.region}</option>)}</select></label>
      <label className="text-sm font-semibold">Consumption (kWh)<input value={consumption} onChange={e=>setConsumption(Math.max(0,Number(e.target.value)||0))} type="number" className="mt-2 h-11 w-full rounded-xl border px-3"/></label>
      <label className="text-sm font-semibold">Renewable share (%)<input value={renewableShare} onChange={e=>setRenewableShare(Math.min(100,Math.max(0,Number(e.target.value)||0)))} type="number" className="mt-2 h-11 w-full rounded-xl border px-3"/></label>
    </div>
    <div className="mt-6 grid gap-4 sm:grid-cols-3">
      <article className="rounded-2xl bg-slate-50 p-5"><small className="text-slate-500">Estimated cost</small><strong className="mt-2 block text-2xl">${result.totalCostUsd.toFixed(2)}</strong></article>
      <article className="rounded-2xl bg-slate-50 p-5"><small className="text-slate-500">Renewable energy</small><strong className="mt-2 block text-2xl">{result.renewableKwh.toFixed(0)} kWh</strong></article>
      <article className="rounded-2xl bg-slate-50 p-5"><small className="text-slate-500">Grid energy</small><strong className="mt-2 block text-2xl">{result.gridKwh.toFixed(0)} kWh</strong></article>
    </div>
    <p className="mt-4 text-xs text-slate-400">Demo rates only. Connect a production electricity market provider before billing or trading.</p>
  </section>
}
