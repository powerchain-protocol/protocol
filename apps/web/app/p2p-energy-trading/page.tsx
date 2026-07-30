
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { P2POrderBook } from "@/components/trade/p2p-order-book";

export default function Page() {
  return (
    <>
      <Header />
      <main className="pc-shell min-h-[820px] px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[.16em] text-emerald-700">Peer-to-peer energy market</p>
          <h1 className="mt-3 max-w-4xl text-5xl font-semibold tracking-tight">Trade locally generated energy with transparent settlement.</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-500">Create buy and sell orders, calculate fees, and settle renewable energy trades through Powerchain.</p>
          <div className="mt-10"><P2POrderBook /></div>
        </div>
      </main>
      <Footer />
    </>
  );
}
