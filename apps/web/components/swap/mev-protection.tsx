
import { ShieldCheck } from "lucide-react";

export function MevProtectionNotice({ enabled }: { enabled: boolean }) {
  return (
    <div className={`flex gap-3 rounded-xl border p-4 ${enabled ? "border-emerald-200 bg-emerald-50" : "bg-slate-50"}`}>
      <ShieldCheck className={`size-5 shrink-0 ${enabled ? "text-emerald-700" : "text-slate-400"}`} />
      <div>
        <b className="text-sm">{enabled ? "MEV protection enabled" : "Standard transaction routing"}</b>
        <p className="mt-1 text-xs leading-5 text-slate-500">
          {enabled
            ? "The swap will prefer protected liquidity and transaction delivery routes."
            : "Enable protection in settings for sensitive or larger swaps."}
        </p>
      </div>
    </div>
  );
}
