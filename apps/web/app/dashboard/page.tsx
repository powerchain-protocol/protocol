import Link from "next/link";
import { Activity, Bot, Boxes, CircleDollarSign, Gift, Network, WalletCards, Zap } from "lucide-react";
import { routes } from "@/lib/routes";

const cards = [
  { title: "Wallet", value: "Connect wallet", detail: "Balances, accounts and signing", href: routes.wallet, icon: WalletCards },
  { title: "Network health", value: "Operational", detail: "RPC and protocol services", href: "/system", icon: Activity },
  { title: "Payments", value: "Open payments", detail: "Checkout, billing and settlement", href: routes.payments, icon: CircleDollarSign },
  { title: "Rewards", value: "Claim rewards", detail: "View eligibility and claims", href: routes.dashboardRewards, icon: Gift },
];

const quickActions = [
  { title: "Ask PowerChain AI", href: routes.dashboardAi, icon: Bot },
  { title: "Browse skills", href: routes.dashboardSkills, icon: Boxes },
  { title: "Explore network", href: routes.explorer, icon: Network },
  { title: "Manage energy", href: routes.energy, icon: Zap },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <p className="text-xs font-bold uppercase tracking-[.18em] text-emerald-400">Operations center</p>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
        <div><h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Dashboard</h1><p className="mt-3 max-w-2xl text-slate-400">Manage blockchain, financial, energy and AI workflows from one workspace.</p></div>
        <Link href={routes.dashboardAi} className="rounded-xl bg-emerald-400 px-4 py-2.5 text-sm font-semibold text-slate-950">Open AI chat</Link>
      </div>
      <section className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ title, value, detail, href, icon: Icon }) => <Link key={title} href={href} className="rounded-2xl border border-white/10 bg-white/[.04] p-5 transition hover:border-emerald-400/50 hover:bg-white/[.07]"><Icon className="text-emerald-400"/><p className="mt-5 text-sm text-slate-400">{title}</p><p className="mt-1 text-xl font-semibold">{value}</p><p className="mt-2 text-sm text-slate-500">{detail}</p></Link>)}
      </section>
      <section className="mt-10"><h2 className="text-xl font-semibold">Quick actions</h2><div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{quickActions.map(({title,href,icon:Icon})=><Link key={title} href={href} className="flex items-center gap-3 rounded-xl border border-white/10 px-4 py-4 text-sm font-medium hover:bg-white/[.06]"><Icon size={18} className="text-emerald-400"/>{title}</Link>)}</div></section>
    </div>
  );
}
