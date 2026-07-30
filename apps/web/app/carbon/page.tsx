
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CarbonHero } from "@/components/carbon/carbon-hero";
import { MarketplaceCard } from "@/components/marketplace/marketplace-card";
import { MARKETPLACE_ASSETS } from "@/data/marketplace";

export default function CarbonPage() {
  return <><Header/><main className="bg-white"><CarbonHero/><section className="mx-auto max-w-[1480px] px-5 py-14 lg:px-8"><div className="text-center"><p className="text-xs font-black uppercase tracking-[.15em] text-emerald-700">Tokenized renewables</p><h2 className="mt-2 text-3xl font-semibold">Verified carbon and renewable assets</h2></div><div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{MARKETPLACE_ASSETS.map(asset=><MarketplaceCard key={asset.id} asset={asset}/>)}</div></section></main><Footer/></>
}
