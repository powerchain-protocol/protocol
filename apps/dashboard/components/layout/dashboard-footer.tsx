
import { ShieldCheck } from "lucide-react";

export function DashboardFooter() {
  return (
    <footer className="mt-auto flex flex-col justify-between gap-3 border-t border-slate-200/80 bg-white/80 px-6 py-4 text-[11px] text-slate-500 sm:flex-row sm:items-center">
      <span>Powerchain Enterprise Portal · v1.0.0-beta.4</span>
      <span className="flex items-center gap-4"><span className="flex items-center gap-1.5 text-emerald-700"><ShieldCheck className="size-3.5" />Protected session</span><span>Privacy · Terms · Security · Support</span></span>
    </footer>
  );
}
