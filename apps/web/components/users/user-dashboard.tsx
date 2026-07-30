
import { ShieldCheck, UserRound, WalletCards, Zap } from "lucide-react";
import type { UserDashboardData } from "@/types/users";

export function UserDashboard({ data }: { data: UserDashboardData }) {
  const metrics = [
    ["Portfolio value", data.portfolioValueEur.toLocaleString("fi-FI",{style:"currency",currency:"EUR"}), WalletCards],
    ["Energy traded", `${data.energyTradedKwh.toLocaleString("fi-FI")} kWh`, Zap],
    ["Carbon retired", `${data.carbonRetiredTonnes.toLocaleString("fi-FI")} tCO₂e`, ShieldCheck],
    ["Rewards points", data.rewardsPoints.toLocaleString("fi-FI"), UserRound]
  ] as const;

  return (
    <div>
      <section className="flex flex-col justify-between gap-5 rounded-3xl bg-gradient-to-r from-slate-950 to-emerald-950 p-7 text-white md:flex-row md:items-center">
        <div><p className="text-xs uppercase tracking-widest text-emerald-300">User workspace</p><h1 className="mt-2 text-3xl font-semibold">{data.user.name}</h1><p className="mt-2 text-sm text-slate-300">{data.user.email} · {data.user.role}</p></div>
        <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm capitalize">{data.user.status}</span>
      </section>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{metrics.map(([label,value,Icon])=><article className="rounded-2xl border bg-white p-5" key={label}><Icon className="size-5 text-emerald-700"/><small className="mt-4 block text-slate-500">{label}</small><strong className="mt-1 block text-xl">{value}</strong></article>)}</div>
      <section className="mt-6 grid gap-5 lg:grid-cols-[1fr_360px]">
        <div className="rounded-3xl border bg-white p-6"><h2 className="font-bold">Recent activity</h2><div className="mt-4 space-y-3">{data.recentTransactions.map(tx=><div className="flex items-center justify-between rounded-xl bg-slate-50 p-4" key={tx.id}><div><b className="capitalize">{tx.type}</b><p className="text-xs text-slate-500">{tx.createdAt}</p></div><div className="text-right"><b>{tx.amount}</b><p className="text-xs capitalize text-emerald-700">{tx.status}</p></div></div>)}</div></div>
        <aside className="rounded-3xl border bg-white p-6"><h2 className="font-bold">Access and permissions</h2><p className="mt-2 text-sm text-slate-500">Role: <b className="capitalize">{data.user.role}</b></p><div className="mt-4 flex flex-wrap gap-2">{data.user.permissions.map(permission=><span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700" key={permission}>{permission}</span>)}</div></aside>
      </section>
    </div>
  );
}
