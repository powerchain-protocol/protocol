
"use client";

import { Gift, Medal, Trophy, Zap } from "lucide-react";
import { REWARD_LEADERBOARD, REWARD_MISSIONS } from "@/data/rewards";

export function RewardsPanel() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
      <section className="rounded-3xl border bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,.06)]">
        <div className="flex items-center justify-between"><div><p className="text-xs font-black uppercase tracking-[.15em] text-emerald-700">Community rankings</p><h2 className="mt-2 text-2xl font-semibold">Leaderboard</h2></div><Trophy className="size-6 text-amber-500" /></div>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-50 text-[10px] uppercase tracking-wider text-slate-500"><tr>{["Rank","Member","Points","Energy traded","Carbon retired","Tier"].map(h=><th className="px-4 py-3" key={h}>{h}</th>)}</tr></thead>
            <tbody>{REWARD_LEADERBOARD.map(entry=><tr className="border-t" key={entry.id}><td className="px-4 py-4 font-bold">#{entry.rank}</td><td className="px-4 py-4"><b>{entry.displayName}</b><span className="block text-xs text-slate-500">{entry.walletAddress}</span></td><td className="px-4 py-4 font-bold text-emerald-700">{entry.points.toLocaleString("fi-FI")}</td><td className="px-4 py-4">{entry.energyTradedKwh.toLocaleString("fi-FI")} kWh</td><td className="px-4 py-4">{entry.carbonRetiredTonnes.toLocaleString("fi-FI")} t</td><td className="px-4 py-4 capitalize">{entry.tier}</td></tr>)}</tbody>
          </table>
        </div>
      </section>
      <aside className="space-y-5">
        <section className="rounded-3xl bg-gradient-to-br from-emerald-950 to-emerald-700 p-6 text-white shadow-xl">
          <Medal className="size-8 text-emerald-300" /><p className="mt-5 text-xs uppercase tracking-widest text-emerald-200">Your rewards</p><strong className="mt-2 block text-4xl">4 820,55 PWRC</strong><p className="mt-2 text-sm text-emerald-100">98 250 points · Pioneer tier</p>
        </section>
        <section className="rounded-3xl border bg-white p-5">
          <div className="flex items-center gap-2"><Gift className="size-5 text-emerald-700" /><h2 className="font-bold">Active missions</h2></div>
          <div className="mt-4 space-y-4">{REWARD_MISSIONS.map(mission=><div key={mission.id}><div className="flex justify-between text-sm"><span>{mission.title}</span><b>{mission.rewardPwrc} PWRC</b></div><div className="mt-2 h-2 rounded-full bg-slate-100"><div className="h-full rounded-full bg-emerald-700" style={{width:`${Math.min(100, mission.progress/mission.target*100)}%`}}/></div><p className="mt-1 text-xs text-slate-500">{mission.progress}/{mission.target}</p></div>)}</div>
        </section>
      </aside>
    </div>
  );
}
