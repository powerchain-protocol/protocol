
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
export default function Page() {
  return <><Header/><main className="pc-shell min-h-[760px] px-5 py-16"><div className="mx-auto max-w-7xl">
    <p className="text-xs font-black uppercase tracking-[.16em] text-emerald-700">Powerchain infrastructure</p>
    <h1 className="mt-3 max-w-4xl text-5xl font-semibold tracking-tight">Connected Devices</h1>
    <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-500">Manage smart meters, inverters, storage systems, and sensors.</p>
    <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {["Overview","Live telemetry","Operations","Security","Analytics","Integrations"].map((label)=><section className="pc-panel rounded-3xl p-6" key={label}><h2 className="font-bold">{label}</h2><p className="mt-2 text-sm leading-6 text-slate-500">Production-ready controls and live operational data.</p></section>)}
    </div>
  </div></main><Footer/></>
}
