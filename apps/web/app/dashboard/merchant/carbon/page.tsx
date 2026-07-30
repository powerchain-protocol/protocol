import Link from "next/link";
import { RwaMarket } from "@/components/assets/rwa";
import { rwaAssets } from "@/lib/merchant/catalog";
export default function Page(){return <section><p className="text-sm font-medium text-emerald-300">Merchant energy commerce</p><h1 className="mt-2 text-3xl font-semibold">Carbon real-world assets</h1><p className="mt-2 max-w-3xl text-slate-400">List, transfer and retire verified carbon-credit units with traceable metadata.</p><div className="mt-7"><RwaMarket assets={[...rwaAssets]} initialFilter="carbon"/></div><Link href="/dashboard/merchant/trade" className="mt-8 inline-block text-sm text-emerald-300">Open the full RWA exchange →</Link></section>}
