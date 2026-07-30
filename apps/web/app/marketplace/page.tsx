
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MarketplaceCard } from "@/components/marketplace/marketplace-card";
import { MARKETPLACE_ASSETS } from "@/data/marketplace";

export default function MarketplacePage() {
  return <><Header/><main className="pc-shell min-h-[850px] px-5 py-14"><div className="mx-auto max-w-[1500px]"><p className="text-xs font-black uppercase tracking-[.16em] text-emerald-700">Powerchain marketplace</p><h1 className="mt-3 text-5xl font-semibold tracking-tight">Invest in tokenized renewable infrastructure.</h1><p className="mt-4 max-w-3xl text-lg leading-8 text-slate-500">Buy verified carbon credits, renewable revenue shares, and tokenized energy assets with transparent pricing and settlement.</p><div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{MARKETPLACE_ASSETS.map(asset=><MarketplaceCard key={asset.id} asset={asset}/>)}</div></div></main><Footer/></>
}
