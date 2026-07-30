
import { Activity, CheckCircle2, CircleDollarSign, Server, ShieldCheck, Zap } from "lucide-react";
import { SYSTEM_STATUS } from "@/constants/navigation";

const activity = [
  ["Settlement completed", "18 450,00 €", "2m"],
  ["Solar asset tokenized", "SOL-FARM-208", "12m"],
  ["Treasury fee collected", "369,00 €", "18m"],
  ["Proposal executed", "PCG-042", "1h"]
];

export function RightSidebar() {
  return (
    <aside className="hidden w-[306px] shrink-0 border-l border-slate-200/80 bg-white/68 p-4 xl:block">
      <section className="portal-card rounded-3xl p-5">
        <div className="flex items-center justify-between">
          <div><p className="text-[10px] font-bold uppercase tracking-[.14em] text-slate-400">Infrastructure</p><h2 className="mt-1 font-bold">System status</h2></div>
          <span className="grid size-9 place-items-center rounded-xl bg-emerald-50 text-emerald-700"><Server className="size-4" /></span>
        </div>
        <p className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-xs font-bold text-emerald-800"><CheckCircle2 className="size-4" />All systems operational</p>
        <div className="mt-4 space-y-3">
          {SYSTEM_STATUS.map((name) => (
            <div className="flex items-center justify-between text-xs" key={name}>
              <span className="text-slate-600">{name}</span>
              <span className="flex items-center gap-1.5 font-semibold text-emerald-700"><span className="size-1.5 rounded-full bg-emerald-500" />Operational</span>
            </div>
          ))}
        </div>
      </section>

      <section className="portal-card mt-4 rounded-3xl p-5">
        <div className="flex items-center justify-between"><h2 className="font-bold">Recent activity</h2><Activity className="size-4 text-slate-400" /></div>
        <div className="mt-4 space-y-1">
          {activity.map(([title, value, time], index) => (
            <div className="flex gap-3 rounded-xl p-3 hover:bg-slate-50" key={title}>
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-slate-100 text-emerald-700">
                {(() => { const Icon = [CircleDollarSign, Zap, ShieldCheck, Activity][index]; return <Icon className="size-4" />; })()}
              </span>
              <div className="min-w-0 flex-1"><b className="block truncate text-xs">{title}</b><span className="text-[11px] text-slate-500">{value}</span></div>
              <span className="text-[10px] text-slate-400">{time}</span>
            </div>
          ))}
        </div>
      </section>
    </aside>
  );
}
