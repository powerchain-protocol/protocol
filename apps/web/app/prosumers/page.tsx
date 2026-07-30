
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function Page() {
  return (
    <>
      <Header />
      <main className="pc-shell min-h-[760px] px-5 py-14">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[.15em] text-emerald-700">Powerchain platform</p>
          <h1 className="mt-3 text-5xl font-semibold">Prosumer workspace</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-500">Manage local generation, smart meters, wallet settlements, and energy sales.</p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {["Overview","Activity","Payments","Analytics"].map((item)=><section key={item} className="rounded-3xl border bg-white p-6"><h2 className="font-bold">{item}</h2><p className="mt-2 text-sm text-slate-500">Live data, validation, and role-based controls.</p></section>)}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
