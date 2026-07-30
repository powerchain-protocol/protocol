import Link from "next/link";
import { Bot, Boxes, Building2, CircleDollarSign, Code2, Droplets, Factory, Gauge, Gift, Home, Landmark, Network, Store, WalletCards, Zap } from "lucide-react";
import { routes } from "@/lib/routes";
import { AuthMenu } from "@/components/auth/auth-menu";

const navigation = [
  { href: routes.dashboard, label: "Overview", icon: Home },
  { href: routes.dashboardAi, label: "AI workspace", icon: Bot },
  { href: routes.dashboardCrm, label: "CRM", icon: Building2 },
  { href: routes.dashboardErp, label: "ERP", icon: Factory },
  { href: routes.dashboardArchitectures, label: "Architecture", icon: Network },
  { href: routes.dashboardSkills, label: "Skills", icon: Boxes },
  { href: routes.wallet, label: "Wallet", icon: WalletCards },
  { href: routes.payments, label: "Payments", icon: CircleDollarSign },
  { href: routes.swap, label: "Exchange", icon: Landmark },
  { href: routes.energy, label: "Energy", icon: Zap },
  { href: routes.dashboardMerchant, label: "Merchant energy", icon: Store },
  { href: routes.marketplace, label: "Marketplace", icon: Store },
  { href: routes.dashboardFaucet, label: "Faucet", icon: Droplets },
  { href: routes.dashboardRewards, label: "Rewards", icon: Gift },
  { href: routes.dashboardGenerator, label: "Developer", icon: Code2 },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto grid min-h-screen max-w-[1800px] lg:grid-cols-[270px_1fr]">
        <aside className="border-b border-white/10 bg-slate-950/95 p-5 lg:border-b-0 lg:border-r lg:p-7">
          <Link href={routes.dashboard} className="flex items-center gap-3 text-lg font-semibold">
            <span className="grid size-10 place-items-center rounded-xl bg-emerald-400 text-slate-950"><Gauge size={21} /></span>
            PowerChain
          </Link>
          <p className="mt-3 text-sm text-slate-400">Enterprise operations dashboard</p>
          <nav className="mt-7 grid gap-1.5 sm:grid-cols-2 lg:grid-cols-1">
            {navigation.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white">
                <Icon size={18} />{label}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="min-w-0"><header className="flex min-h-20 items-center justify-end border-b border-white/10 px-5 sm:px-8 lg:px-10"><AuthMenu /></header><div className="p-5 sm:p-8 lg:p-10">{children}</div></main>
      </div>
    </div>
  );
}
