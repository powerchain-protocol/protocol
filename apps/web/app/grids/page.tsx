
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { GridExplorer } from "@/components/grids/grid-explorer";

export default function GridsPage() {
  return (
    <>
      <Header />
      <main className="pc-shell min-h-[850px] px-5 py-14">
        <div className="mx-auto max-w-[1500px]">
          <p className="text-xs font-black uppercase tracking-[.16em] text-emerald-700">Grid intelligence and wayfinding</p>
          <h1 className="mt-3 max-w-4xl text-5xl font-semibold tracking-tight">Discover renewable infrastructure near you.</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-500">
            Search power stations, EV charging hubs, solar farms, wind farms, storage sites, and local energy markets.
          </p>
          <div className="mt-10"><GridExplorer /></div>
        </div>
      </main>
      <Footer />
    </>
  );
}
