
import {Header} from "@/components/layout/header";
import {Footer} from "@/components/layout/footer";
import {GLOBAL_ELECTRICITY_RATES,DEMO_ASSET_RATES} from "@/data/rates";
import {ElectricityCalculator} from "@/components/rates/electricity-calculator";
import {HowItWorks} from "@/components/rates/how-it-works";
import {TokenPriceBoard} from "@/components/rates/token-price-board";

export default function Page(){
  return <><Header/><main className="pc-shell min-h-[900px] px-5 py-14"><div className="mx-auto max-w-[1400px]">
    <p className="text-xs font-black uppercase tracking-[.16em] text-emerald-700">Global rates</p>
    <h1 className="mt-3 text-5xl font-semibold">Electricity and settlement rates.</h1>
    <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">{GLOBAL_ELECTRICITY_RATES.map(rate=><article className="rounded-2xl border bg-white p-5" key={rate.id}><small className="text-slate-500">{rate.region}</small><strong className="mt-2 block text-2xl">${rate.pricePerKwh.toFixed(3)}/kWh</strong></article>)}</div>
    <div className="mt-8"><TokenPriceBoard/></div>
    <div className="mt-8"><ElectricityCalculator/></div>
    <div className="mt-20"><HowItWorks/></div>
  </div></main><Footer/></>;
}
