import { AiWorkspace } from "@/components/ai/ai-workspace";

export default function DashboardAiPage() {
  return <div className="mx-auto max-w-7xl"><p className="text-xs font-bold uppercase tracking-[.18em] text-emerald-400">AI workspace</p><h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Operational intelligence</h1><p className="mt-3 max-w-3xl text-slate-400">Use specialized agents for finance, treasury, risk, energy and developer workflows.</p><div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/[.03] p-3 sm:p-6"><AiWorkspace /></div></div>;
}
