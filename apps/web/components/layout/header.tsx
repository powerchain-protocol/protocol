
"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, X, ArrowUpRight } from "lucide-react";
import * as Dropdown from "@radix-ui/react-dropdown-menu";
import { productMenu } from "@/data/products";
import { services } from "@/data/services";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { CurrencySelector } from "@/components/layout/currency-selector";
import { WalletConnectModal } from "@/components/wallet/wallet-connect-modal";
import { NetworkSelector } from "@/components/network/network-selector";
import { useWallet } from "@/context/wallet-context";

function MenuDrop({
  label,
  items
}: {
  label: string;
  items: {
    label?: string;
    name?: string;
    href?: string;
    slug?: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
  }[];
}) {
  return (
    <Dropdown.Root>
      <Dropdown.Trigger className="inline-flex items-center gap-1 text-sm font-semibold text-slate-700 outline-none hover:text-emerald-800">
        {label}<ChevronDown className="size-3.5" />
      </Dropdown.Trigger>
      <Dropdown.Portal>
        <Dropdown.Content align="center" sideOffset={18} className="z-50 grid w-[660px] grid-cols-2 gap-2 rounded-3xl border bg-white/95 p-3 shadow-[0_30px_100px_rgba(15,23,42,.18)] backdrop-blur-xl">
          {items.map((item) => {
            const Icon = item.icon;
            const name = item.label ?? item.name!;
            const href = item.href ?? `/services/${item.slug}`;
            return (
              <Dropdown.Item key={name} asChild>
                <Link href={href} className="group flex gap-3 rounded-2xl p-4 outline-none hover:bg-emerald-50">
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-emerald-50 text-emerald-800 group-hover:bg-emerald-700 group-hover:text-white">
                    <Icon className="size-5" />
                  </span>
                  <span>
                    <b className="block text-sm text-slate-900">{name}</b>
                    <small className="mt-1 block leading-5 text-slate-500">{item.description}</small>
                  </span>
                </Link>
              </Dropdown.Item>
            );
          })}
        </Dropdown.Content>
      </Dropdown.Portal>
    </Dropdown.Root>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);
  const { connected, address, disconnect } = useWallet();

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur-2xl">
        <div className="container flex h-[74px] items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-950 shadow-lg shadow-emerald-900/20">
              <img src="/logo.png" className="size-7 object-contain" alt="Powerchain" />
            </span>
            <span>
              <b className="block text-[15px] tracking-[.12em] text-slate-950">POWERCHAIN</b>
              <small className="block text-[9px] font-bold uppercase tracking-[.18em] text-emerald-700">Infrastructure Network</small>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            <Link href="/" className="text-sm font-semibold text-slate-700 hover:text-emerald-800">Overview</Link><Link href="/explore" className="text-sm font-semibold text-slate-700 hover:text-emerald-800">Explore</Link><Link href="/case-studies" className="text-sm font-semibold text-slate-700 hover:text-emerald-800">Case studies</Link>
            <MenuDrop label="Products" items={productMenu} />
            <MenuDrop label="Services" items={services.map((service) => ({ ...service, label: service.name, href: `/services/${service.slug}` }))} />
            <Link href="/swap" className="text-sm font-semibold text-slate-700 hover:text-emerald-800">Swap</Link>
            <Link href="/bridge" className="text-sm font-semibold text-slate-700 hover:text-emerald-800">Bridge</Link>
            <Link href="/carbon" className="text-sm font-semibold text-slate-700 hover:text-emerald-800">Carbon</Link><Link href="/marketplace" className="text-sm font-semibold text-slate-700 hover:text-emerald-800">Marketplace</Link><Link href="/grids" className="text-sm font-semibold text-slate-700 hover:text-emerald-800">Grids</Link><Link href="/ai" className="text-sm font-semibold text-slate-700 hover:text-emerald-800">AI</Link><Link href="/wallet" className="text-sm font-semibold text-slate-700 hover:text-emerald-800">Wallet</Link><a href="https://developers.powerchain.energy" className="text-sm font-semibold text-slate-700 hover:text-emerald-800">Developers</a>
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden xl:block"><NetworkSelector compact /></div>
            <CurrencySelector /><ThemeToggle />
            {connected ? (
              <Button variant="outline" className="hidden sm:inline-flex" onClick={disconnect}>{address}</Button>
            ) : (
              <Button className="hidden sm:inline-flex" onClick={() => setWalletOpen(true)}>Connect wallet</Button>
            )}
            <Button asChild variant="dark" className="hidden xl:inline-flex">
              <Link href="https://dashboard.powerchain.energy">Open portal <ArrowUpRight className="size-4" /></Link>
            </Button>
            <button className="rounded-xl border p-2 lg:hidden" onClick={() => setMobileOpen((value) => !value)} aria-label="Toggle navigation">
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t bg-white p-5 lg:hidden">
            <nav className="grid gap-2">
              {[
                ["Overview", "/"],
                ["Swap", "/swap"],
                ["Bridge", "/bridge"],
                ["Carbon", "/carbon"],["Marketplace", "/marketplace"],["Leaderboard", "/leaderboard"],["Grids", "/grids"],["AI", "/ai"],["Wallet", "/wallet"],
                ["Transactions", "/transactions"],
                ["Checkout", "/checkout"],
                ["About", "/about"]
              ].map(([label, href]) => (
                <Link key={href} href={href} className="rounded-xl px-4 py-3 font-semibold hover:bg-emerald-50" onClick={() => setMobileOpen(false)}>
                  {label}
                </Link>
              ))}
              <Button className="mt-2" onClick={() => setWalletOpen(true)}>Connect wallet</Button>
            </nav>
          </div>
        )}
      </header>
      <WalletConnectModal open={walletOpen} onOpenChange={setWalletOpen} />
    </>
  );
}
