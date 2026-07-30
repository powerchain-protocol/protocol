
import type { LucideIcon } from "lucide-react";

export function MetricCard({
  icon: Icon,
  label,
  value,
  change
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  change?: string;
}) {
  return (
    <article className="pc-hover-lift rounded-2xl border bg-white p-5">
      <span className="grid size-10 place-items-center rounded-xl bg-emerald-50 text-emerald-800">
        <Icon className="size-5" />
      </span>
      <p className="mt-5 text-xs text-slate-500">{label}</p>
      <strong className="mt-1 block text-2xl">{value}</strong>
      {change && <span className="mt-2 block text-xs font-semibold text-emerald-700">{change}</span>}
    </article>
  );
}
