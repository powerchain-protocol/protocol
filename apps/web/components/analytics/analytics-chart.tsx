
import type { AnalyticsSeries } from "@/types/analytics";

export function AnalyticsChart({ series }: { series: AnalyticsSeries }) {
  const max = Math.max(...series.points.map((point) => point.value), 1);
  return (
    <section className="rounded-3xl border bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,.06)]">
      <h2 className="text-xl font-bold">{series.name}</h2>
      <div className="mt-6 flex h-64 items-end gap-2">
        {series.points.map((point) => (
          <div key={point.id} className="flex h-full flex-1 flex-col justify-end">
            <div className="rounded-t-lg bg-gradient-to-t from-emerald-800 to-emerald-400" style={{ height: `${(point.value / max) * 100}%` }} />
            <p className="mt-2 text-center text-[10px] text-slate-400">{point.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
