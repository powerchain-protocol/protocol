
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ANALYTICS_METRICS, ANALYTICS_SERIES } from "@/data/analytics";
import { AnalyticsChart } from "@/components/analytics/analytics-chart";
import { MetricRing } from "@/components/analytics/metric-ring";

export default function AnalyticsPage() {
  return (
    <>
      <Header />
      <main className="pc-shell min-h-[820px] px-5 py-14">
        <div className="mx-auto max-w-[1450px]">
          <p className="text-xs font-black uppercase tracking-[.15em] text-emerald-700">Operational analytics</p>
          <h1 className="mt-3 text-5xl font-semibold">Energy, settlement, and device intelligence.</h1>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {ANALYTICS_METRICS.map((metric) => (
              <article key={metric.id} className="rounded-2xl border bg-white p-5">
                <small className="text-slate-500">{metric.label}</small>
                <strong className="mt-2 block text-2xl">{metric.value.toLocaleString("fi-FI")} {metric.unit}</strong>
                <span className="mt-2 block text-xs font-bold text-emerald-700">+{metric.changePercent.toLocaleString("fi-FI")}%</span>
              </article>
            ))}
          </div>
          <div className="mt-6 grid gap-5 xl:grid-cols-[1.25fr_.75fr]">
            <AnalyticsChart series={ANALYTICS_SERIES[0]} />
            <div className="space-y-4">
              <MetricRing value={94} label="Renewable share" detail="Across all active settlements" />
              <MetricRing value={99} label="Telemetry integrity" detail="Signed and validated readings" />
              <MetricRing value={87} label="Grid efficiency" detail="Average operational efficiency" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
