import { MiniHero } from "@/components/overview/mini-hero";

import { ArrowDownRight, ArrowUpRight, BatteryCharging, CircleDollarSign, CloudSun, Leaf, MoreHorizontal, Network, Zap } from "lucide-react";

const metrics = [
  { label: "Portfolio value", value: "48 700 000,00 €", change: "+12,4%", positive: true, Icon: CircleDollarSign },
  { label: "Energy produced", value: "18,64 GWh", change: "+8,2%", positive: true, Icon: Zap },
  { label: "Carbon avoided", value: "12 456 tCO₂e", change: "+5,7%", positive: true, Icon: Leaf },
  { label: "Storage capacity", value: "6,10 MWh", change: "-1,3%", positive: false, Icon: BatteryCharging }
];

const assets = [
  ["Nordic Solar I", "Solar", "8,9 MW", "96,4%", "Online"],
  ["Baltic Wind Cluster", "Wind", "12,4 MW", "92,8%", "Online"],
  ["Helsinki Storage", "Battery", "6,1 MWh", "88,5%", "Charging"],
  ["Carbon Vault 03", "Carbon", "325,7 t", "100%", "Verified"]
];

export default function Overview() {
  return (
    <div className="mx-auto max-w-[1500px]"><MiniHero/><div className="mt-7">
      <section className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[.17em] text-emerald-700">Enterprise operations</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Good morning.</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-500">Your renewable infrastructure, treasury, settlement, and network activity in one operational view.</p>
        </div>
        <div className="flex gap-2">
          <button className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold shadow-sm">Export report</button>
          <button className="rounded-xl bg-gradient-to-b from-emerald-700 to-emerald-900 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-900/20">Create transaction</button>
        </div>
      </section>

      <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map(({ label, value, change, positive, Icon }) => (
          <article className="portal-card rounded-3xl p-5 transition hover:-translate-y-0.5 hover:shadow-xl" key={label}>
            <div className="flex items-start justify-between">
              <span className="grid size-11 place-items-center rounded-2xl bg-emerald-50 text-emerald-800"><Icon className="size-5" /></span>
              <span className={`flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold ${positive ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
                {positive ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}{change}
              </span>
            </div>
            <p className="mt-5 text-xs font-medium text-slate-500">{label}</p>
            <strong className="mt-1 block text-2xl tracking-tight">{value}</strong>
            <p className="mt-2 text-[11px] text-slate-400">Compared with previous 30 days</p>
          </article>
        ))}
      </section>

      <section className="mt-5 grid gap-5 2xl:grid-cols-[1.35fr_.65fr]">
        <article className="portal-card overflow-hidden rounded-3xl">
          <header className="flex items-start justify-between p-6">
            <div><p className="text-[10px] font-bold uppercase tracking-[.14em] text-slate-400">Network performance</p><h2 className="mt-1 text-lg font-bold">Settlement and energy volume</h2></div>
            <button className="rounded-xl border p-2"><MoreHorizontal className="size-4" /></button>
          </header>
          <div className="px-6">
            <div className="flex h-[310px] items-end gap-2 rounded-3xl border border-slate-100 bg-gradient-to-b from-emerald-50/50 to-white p-5">
              {[28,44,38,61,52,73,67,81,59,88,71,96,78,84,68,91,75,98,82,93,76,100,86,94].map((height, index) => (
                <div className="group relative flex h-full flex-1 items-end" key={index}>
                  <span className="w-full rounded-t-lg bg-gradient-to-t from-emerald-800 to-emerald-400 opacity-85 transition group-hover:opacity-100" style={{ height: `${height}%` }} />
                </div>
              ))}
            </div>
          </div>
          <footer className="grid grid-cols-3 gap-3 p-6">
            {[["Settlement","48,7 M€"],["Transactions","124 806"],["Network uptime","99,99%"]].map(([label,value]) => <div className="rounded-2xl bg-slate-50 p-4" key={label}><small className="text-slate-500">{label}</small><strong className="mt-1 block">{value}</strong></div>)}
          </footer>
        </article>

        <article className="portal-card portal-grid rounded-3xl p-6">
          <div className="flex items-start justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[.14em] text-slate-400">Live infrastructure</p><h2 className="mt-1 text-lg font-bold">Network overview</h2></div><Network className="size-5 text-emerald-700" /></div>
          <div className="mt-8 grid place-items-center">
            <div className="relative grid size-64 place-items-center rounded-full border border-emerald-200 bg-white/80 shadow-xl">
              <div className="absolute inset-5 rounded-full border border-dashed border-emerald-300" />
              <div className="absolute inset-12 rounded-full border border-emerald-100" />
              <span className="grid size-24 place-items-center rounded-full bg-gradient-to-br from-emerald-600 to-emerald-950 text-white shadow-2xl shadow-emerald-900/30">
                <CloudSun className="size-9" />
              </span>
              {[["SOL","top-4 left-1/2 -translate-x-1/2"],["SUI","bottom-5 left-1/2 -translate-x-1/2"],["PWRC","left-3 top-1/2 -translate-y-1/2"],["CCT","right-3 top-1/2 -translate-y-1/2"]].map(([label,position]) => <span className={`absolute ${position} rounded-full border bg-white px-3 py-1 text-[10px] font-black shadow-sm`} key={label}>{label}</span>)}
            </div>
          </div>
          <div className="mt-7 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white/80 p-4"><small className="text-slate-500">Active nodes</small><strong className="mt-1 block text-xl">284</strong></div>
            <div className="rounded-2xl bg-white/80 p-4"><small className="text-slate-500">Assets online</small><strong className="mt-1 block text-xl">98,7%</strong></div>
          </div>
        </article>
      </section>

      <section className="portal-card mt-5 overflow-hidden rounded-3xl">
        <header className="flex items-center justify-between border-b border-slate-100 p-6">
          <div><p className="text-[10px] font-bold uppercase tracking-[.14em] text-slate-400">Portfolio assets</p><h2 className="mt-1 text-lg font-bold">Operational performance</h2></div>
          <button className="text-sm font-semibold text-emerald-700">View all assets</button>
        </header>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-50/80 text-[10px] uppercase tracking-wider text-slate-500"><tr>{["Asset","Category","Capacity","Efficiency","Status"].map((heading) => <th className="px-6 py-3 font-bold" key={heading}>{heading}</th>)}</tr></thead>
            <tbody>{assets.map(([name,type,capacity,efficiency,status]) => <tr className="border-t border-slate-100 hover:bg-emerald-50/30" key={name}><td className="px-6 py-4 font-semibold">{name}</td><td className="px-6 py-4 text-slate-500">{type}</td><td className="px-6 py-4">{capacity}</td><td className="px-6 py-4">{efficiency}</td><td className="px-6 py-4"><span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">{status}</span></td></tr>)}</tbody>
          </table>
        </div>
      </section>
    </div></div>
  );
}
