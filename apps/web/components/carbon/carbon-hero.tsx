
import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, Globe2, Leaf, LockKeyhole } from "lucide-react";
import { CARBON_METRICS } from "@/data/carbon-projects";

export function CarbonHero() {
  return (
    <section className="relative overflow-hidden border-b border-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_38%,rgba(22,101,52,.12),transparent_26rem)]" />
      <div className="mx-auto grid max-w-[1480px] gap-12 px-5 py-16 lg:grid-cols-[.86fr_1.14fr] lg:items-center lg:px-8 lg:py-20">
        <div className="relative z-10">
          <p className="text-xs font-black uppercase tracking-[.16em] text-emerald-800">Carbon credits</p>
          <h1 className="mt-4 text-[clamp(3rem,6vw,5.8rem)] font-semibold leading-[.98] tracking-[-.055em] text-emerald-950">Verifiable Carbon Intelligence</h1>
          <h2 className="mt-5 text-xl font-bold">Verifiable Carbon Credits Backed by Blockchain</h2>
          <p className="mt-4 max-w-xl text-lg leading-8 text-slate-600">Issue, track, trade, and retire carbon credits backed by cryptographically verifiable renewable energy production.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/checkout" className="inline-flex h-12 items-center gap-2 rounded-xl bg-emerald-800 px-6 text-sm font-semibold text-white shadow-lg">Request Demo <ArrowRight className="size-4" /></Link>
            <Link href="/developers" className="inline-flex h-12 items-center gap-2 rounded-xl border border-emerald-800 bg-white px-6 text-sm font-semibold text-emerald-950">View Docs <BookOpen className="size-4" /></Link>
          </div>
        </div>
        <div className="relative min-h-[450px]">
          <div className="absolute left-1/2 top-1/2 grid size-[330px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-emerald-300 bg-gradient-to-br from-white to-emerald-50 shadow-[0_35px_100px_rgba(6,78,43,.18)]">
            <div className="absolute inset-6 rounded-full border border-dashed border-emerald-300" />
            <Globe2 className="size-48 text-emerald-800" strokeWidth={.8} />
          </div>
          {[
            ["left-0 top-14","Carbon retired",`${(CARBON_METRICS.retiredTonnes/1_000_000).toLocaleString("fi-FI")}M`,"tons CO₂e",Leaf],
            ["right-0 top-14","Credits issued",`${(CARBON_METRICS.creditsIssued/1_000_000).toLocaleString("fi-FI")}M`,"PCC",CheckCircle2],
            ["left-4 bottom-14","Verified projects",CARBON_METRICS.verifiedProjects.toLocaleString("fi-FI"),"worldwide",CheckCircle2],
            ["right-0 bottom-14","On-chain records","100%","immutable",LockKeyhole]
          ].map(([position,label,value,sub,Icon]) => {
            const I = Icon as typeof Leaf;
            return <article key={String(label)} className={`absolute ${position} w-48 rounded-2xl border border-emerald-200 bg-white/92 p-4 shadow-xl backdrop-blur`}><div className="flex items-start justify-between"><div><small className="text-[9px] font-black uppercase tracking-wider text-emerald-700">{label}</small><strong className="mt-1 block text-2xl">{value}</strong><span className="text-xs text-slate-500">{sub}</span></div><span className="grid size-9 place-items-center rounded-full bg-emerald-50 text-emerald-700"><I className="size-4" /></span></div></article>
          })}
        </div>
      </div>
    </section>
  );
}
