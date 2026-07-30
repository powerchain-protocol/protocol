import Link from "next/link";
import { RwaMarket } from "@/components/assets/rwa";
import { rwaAssets } from "@/lib/merchant/catalog";
export default function Page(){return <section><p className="text-sm font-medium text-emerald-300">Tokenized real-world assets</p><h1 className="mt-2 text-3xl font-semibold">RWA exchange</h1><p className="mt-2 max-w-3xl text-slate-400">Trade verified renewable generation, P2P energy, carbon credits and connected energy hardware using auditable settlement quotes.</p><div className="mt-7"><RwaMarket assets={[...rwaAssets]}/></div><Link href="/dashboard/merchant" className="mt-8 inline-block text-sm text-emerald-300">← Merchant dashboard</Link></section>}
