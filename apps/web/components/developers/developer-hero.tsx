
import Link from "next/link";
import { ArrowRight, FileText, Layers3 } from "lucide-react";
import { QuickStartCard } from "./quick-start-card";
import { Coin } from "./coin";

export function DeveloperHero() {
  return (
    <section className="developer-hero relative overflow-hidden border-b border-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(16,185,129,.11),transparent_32rem)]" />
      <div className="absolute -right-20 top-4 hidden size-[390px] opacity-[.07] xl:block"><Coin className="size-full" priority /></div>

      <div className="relative mx-auto grid max-w-[1480px] gap-12 px-5 py-16 lg:grid-cols-[.88fr_1.12fr] lg:items-center lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-[11px] font-black uppercase tracking-[.13em] text-emerald-800">
            Build the future of energy
          </span>
          <h1 className="mt-6 text-[clamp(3rem,6vw,6rem)] font-semibold leading-[.96] tracking-[-.055em] text-slate-950">
            Build. Integrate.
            <span className="mt-2 block text-emerald-800">Power the Future.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">
            Powerchain is the high-performance blockchain platform for renewable infrastructure, energy assets, and real-world impact.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="#documentation" className="inline-flex h-12 items-center gap-3 rounded-xl bg-slate-950 px-6 text-sm font-semibold text-white shadow-xl shadow-slate-950/20 hover:-translate-y-0.5">
              Get Started <ArrowRight className="size-4" />
            </Link>
            <Link href="#guides" className="inline-flex h-12 items-center gap-3 rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50">
              Explore Docs <FileText className="size-4" />
            </Link>
          </div>
          <div className="mt-9 flex items-center gap-3 text-xs font-semibold text-slate-500">
            <Layers3 className="size-4 text-emerald-700" />
            Powered by Solana <span>•</span> Built for the Future
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-10 -z-10 rounded-full bg-emerald-100/50 blur-3xl" />
          <QuickStartCard />
        </div>
      </div>
    </section>
  );
}
