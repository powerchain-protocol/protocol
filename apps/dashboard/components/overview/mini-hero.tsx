
import { ArrowUpRight, Sparkles } from "lucide-react";

export function MiniHero() {
  return (
    <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-[#061714] via-[#0a3123] to-[#0c4d2e] p-7 text-white shadow-2xl">
      <div className="absolute -right-12 -top-16 size-72 rounded-full border border-emerald-400/20" />
      <div className="absolute right-16 top-8 size-32 rounded-full border border-dashed border-lime-300/20" />
      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold text-lime-300"><Sparkles className="size-4"/>Intelligent operations</span>
      <h1 className="mt-5 max-w-2xl text-4xl font-semibold tracking-tight">Operate energy, assets, payments, and intelligence from one command center.</h1>
      <p className="mt-4 max-w-2xl text-sm leading-6 text-emerald-100">Live telemetry, portfolio analytics, settlement status, and AI-assisted workflows.</p>
      <button className="mt-6 inline-flex items-center gap-2 rounded-xl bg-lime-400 px-4 py-2.5 text-sm font-bold text-emerald-950">Open operations <ArrowUpRight className="size-4"/></button>
    </section>
  );
}
