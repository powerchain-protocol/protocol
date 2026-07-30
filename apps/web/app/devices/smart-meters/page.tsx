
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SMART_METERS } from "@/data/smart-meters";

export default function SmartMetersPage() {
  return (
    <>
      <Header />
      <main className="pc-shell min-h-[760px] px-5 py-14">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[.15em] text-emerald-700">IoT and DePIN</p>
          <h1 className="mt-3 text-5xl font-semibold">Smart meters and signed telemetry.</h1>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {SMART_METERS.map((meter) => (
              <article key={meter.id} className="rounded-3xl border bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,.06)]">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">{meter.status}</span>
                  <span className="text-xs text-slate-500">{meter.protocol}</span>
                </div>
                <h2 className="mt-5 text-xl font-bold">{meter.manufacturer} {meter.model}</h2>
                <p className="mt-1 text-sm text-slate-500">{meter.serialNumber}</p>
                <dl className="mt-5 space-y-3 text-sm">
                  <div className="flex justify-between"><dt>Reading</dt><dd className="font-semibold">{meter.lastReadingKwh.toLocaleString("fi-FI")} kWh</dd></div>
                  <div className="flex justify-between"><dt>Firmware</dt><dd>{meter.firmwareVersion}</dd></div>
                  <div className="flex justify-between"><dt>Signed telemetry</dt><dd className="text-emerald-700">{meter.signedTelemetry ? "Verified" : "Disabled"}</dd></div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
