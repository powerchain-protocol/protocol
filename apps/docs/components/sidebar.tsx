
import Link from "next/link";
const groups=[
  ["Getting started",[["Overview","/"],["Quick start","/guides"],["Authentication","/auth"]]],
  ["Platform",[["Services","/services"],["Ecosystem","/ecosystem"],["Checkout","/checkout"],["Marketplace","/marketplace"],["Electricity rates","/rates"],["Wallets","/wallets"]]],
  ["Reference",[["API","/api"],["SDKs","/sdk"],["Architecture","/architecture"],["Disclaimer","/disclaimer"],["GitHub migration","/github-migration"],["Errors","/errors"],["Renewable programs","/renewable-programs"],["PWRC token","/token"],["Swap and bridge","/swap-bridge"]]]
] as const;
export function DocsSidebar(){return <aside className="hidden min-h-[calc(100vh-4rem)] border-r bg-white p-5 lg:block">{groups.map(([label,items])=><section className="mb-7" key={label}><p className="mb-2 text-[10px] font-black uppercase tracking-[.16em] text-slate-400">{label}</p><div className="grid gap-1">{items.map(([name,href])=><Link className="rounded-xl px-3 py-2 text-sm text-slate-600 hover:bg-emerald-50 hover:text-emerald-800" href={href} key={href}>{name}</Link>)}</div></section>)}</aside>}
