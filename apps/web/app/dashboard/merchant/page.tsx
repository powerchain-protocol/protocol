import Link from "next/link";import { routes } from "@/lib/routes";import { ArrowRight, Compass, HandHeart, Map, ShoppingBag, Users, Zap } from "lucide-react";
const modules=[
 {href:routes.dashboardMerchantMarketplace,title:"Renewable marketplace",copy:"Trade verified local solar, wind, hydro, biogas and flexibility.",icon:ShoppingBag},
 {href:routes.dashboardMerchantMap,title:"Local energy maps",copy:"Explore smart-metered generation and demand near your community.",icon:Map},
 {href:routes.dashboardMerchantWayfinder,title:"Wayfinder",copy:"Optimize supply routes by price, distance, availability and carbon.",icon:Compass},
 {href:routes.dashboardMerchantEnergy,title:"P2P energy trading",copy:"Create metered energy offers and settlement intents.",icon:Zap},
 {href:routes.dashboardMerchantCrowdfunding,title:"Crowdfunding",copy:"Co-finance verified renewable infrastructure projects.",icon:Users},
 {href:routes.dashboardMerchantDonate,title:"Donate",copy:"Support community energy access and resilience.",icon:HandHeart},
];
export default function Page(){return <section><p className="text-sm font-medium text-emerald-300">Merchant energy</p><h1 className="mt-2 text-3xl font-semibold">Renewable commerce and community finance</h1><p className="mt-2 max-w-3xl text-slate-400">Operate devices, trade local energy, navigate nearby supply and fund verified projects from one dashboard.</p><div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{modules.map(({href,title,copy,icon:Icon})=><Link href={href} key={href} className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-emerald-400/30 hover:bg-white/10"><Icon className="text-emerald-300"/><h2 className="mt-5 text-lg font-semibold">{title}</h2><p className="mt-2 text-sm text-slate-400">{copy}</p><span className="mt-5 inline-flex items-center gap-2 text-sm text-emerald-300">Open <ArrowRight size={15} className="transition group-hover:translate-x-1"/></span></Link>)}</div></section>}
