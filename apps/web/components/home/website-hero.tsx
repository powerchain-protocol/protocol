
import Link from "next/link";
import { ArrowRight, ExternalLink, Globe2, Zap } from "lucide-react";
import { HomeHeader } from "./home-header";
import { NetworkGlobe } from "./network-globe";

const metrics=[["Total Value Locked","$3.24B","+12.45%"],["Energy Traded","8.72 TWh","+18.23%"],["Carbon Retired","1.24M","+22.11%"]];

export function WebsiteHero() {
  return (
    <section className="relative min-h-[760px] overflow-hidden bg-[#020807] text-white">
      <HomeHeader />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_45%,rgba(34,197,94,.14),transparent_35rem),linear-gradient(to_bottom,#020706,#030c09)]" />
      <div className="relative mx-auto grid min-h-[760px] max-w-[1500px] items-center gap-6 px-5 pb-10 pt-28 lg:grid-cols-[.85fr_1.15fr] lg:px-8">
        <div className="relative z-20 max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-lime-400/20 bg-lime-400/5 px-4 py-2 text-[11px] font-black uppercase tracking-[.13em] text-lime-300"><Zap className="size-4"/>Powering the intelligent energy economy</span>
          <h1 className="mt-7 text-[clamp(3.2rem,6.2vw,6.7rem)] font-semibold leading-[.97] tracking-[-.055em]">The Infrastructure of <span className="text-lime-400">Energy, Assets</span> and <span className="text-lime-400">Intelligence</span></h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300">Powerchain is the cross-chain platform for real-world energy, asset tokenization, AI automation, and global settlement.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/dashboard" className="inline-flex h-12 items-center gap-2 rounded-xl bg-lime-400 px-6 text-sm font-bold text-emerald-950">Launch App <ExternalLink className="size-4"/></Link>
            <Link href="/marketplace" className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 text-sm font-semibold">View Marketplace <ArrowRight className="size-4"/></Link>
          </div>
          <p className="mt-9 text-[11px] font-bold uppercase tracking-wider text-slate-500">Supported chains</p>
          <div className="mt-3 flex flex-wrap gap-2">{["Solana","Sui","Base","BNB Chain"].map(chain=><span className="rounded-xl border border-white/15 bg-white/[.035] px-4 py-2 text-sm font-semibold" key={chain}>{chain}</span>)}</div>
        </div>
        <div className="relative min-h-[600px]">
          <NetworkGlobe />
          <div className="absolute left-0 top-10 rounded-2xl border border-white/10 bg-black/45 p-4 text-xs">● Live Network Status<br/><span className="mt-2 block">● All Systems Operational</span></div>
          <div className="absolute right-0 top-10 grid gap-4">{metrics.map(([label,value,change])=><article key={label} className="w-52 rounded-2xl border border-white/10 bg-black/45 p-5"><small className="text-slate-400">{label}</small><strong className="mt-2 block text-2xl">{value}</strong><span className="mt-2 block text-xs font-bold text-lime-400">{change}</span></article>)}</div>
          <div className="absolute bottom-12 right-28 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/55 px-5 py-4"><Globe2 className="size-7"/><div><small className="text-slate-400">Active Across</small><b className="block">32 Countries</b></div></div>
        </div>
      </div>
    </section>
  );
}
