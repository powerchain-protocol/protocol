
import Link from "next/link";
import { ShieldCheck, Sparkles } from "lucide-react";

export function AuthShell({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <main className="grid min-h-screen bg-[#f7faf8] lg:grid-cols-[1.05fr_.95fr]">
      <section className="relative hidden overflow-hidden bg-[#061714] p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(16,185,129,.2),transparent_30rem)]" />
        <Link href="/" className="relative flex items-center gap-3 font-black tracking-[.12em]"><img src="/logo.png" className="size-10" alt="" />POWERCHAIN</Link>
        <div className="relative max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold text-emerald-300"><Sparkles className="size-4" />Enterprise energy infrastructure</span>
          <h1 className="mt-6 text-5xl font-semibold leading-[1.06] tracking-tight">Operate renewable infrastructure with confidence.</h1>
          <p className="mt-5 max-w-lg text-lg leading-8 text-slate-300">Secure wallet access, institutional settlement, asset intelligence, and role-based operations in a single portal.</p>
        </div>
        <div className="relative flex items-center gap-2 text-xs text-slate-400"><ShieldCheck className="size-4 text-emerald-400" />Protected by enterprise-grade session controls</div>
      </section>
      <section className="flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          <Link href="/" className="mb-10 flex items-center gap-3 font-black tracking-[.12em] lg:hidden"><img src="/logo.png" className="size-10" alt="" />POWERCHAIN</Link>
          <p className="text-xs font-black uppercase tracking-[.16em] text-emerald-700">Powerchain account</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight">{title}</h2>
          <p className="mt-3 text-sm leading-6 text-slate-500">{description}</p>
          <div className="mt-8">{children}</div>
        </div>
      </section>
    </main>
  );
}
