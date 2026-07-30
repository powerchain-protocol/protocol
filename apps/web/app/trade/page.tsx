
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { EnergyTradePanel } from "@/components/trade/energy-trade-panel";

export default function TradePage() {
  return <><Header/><main className="pc-shell min-h-[850px] px-5 py-14"><div className="mx-auto max-w-7xl"><p className="text-xs font-black uppercase tracking-[.16em] text-emerald-700">P2P energy market</p><h1 className="mt-3 text-5xl font-semibold tracking-tight">Buy and sell verified local energy.</h1><p className="mt-4 max-w-3xl text-lg leading-8 text-slate-500">Trade metered renewable energy with wallet approval, transparent fees, and delivery settlement.</p><div className="mt-10"><EnergyTradePanel/></div></div></main><Footer/></>
}
