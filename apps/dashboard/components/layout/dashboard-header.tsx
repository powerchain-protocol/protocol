import { LocalizationSelectors } from "./localization-selectors";
import { RoleSwitcher } from "./role-switcher";
import { DemoBadge } from "@/components/demo/demo-badge";
import { DashboardNetworkSelector } from "./network-selector";

"use client";

import { Bell, Command, Menu, Search, Sparkles } from "lucide-react";
import { dashboardStore } from "@/store/dashboard-store";
import { useAuth } from "@/context/auth-context";

export function DashboardHeader() {
  const { user, isDemo } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex h-[76px] items-center gap-4 border-b border-slate-200/80 bg-white/88 px-4 backdrop-blur-2xl md:px-6">
      <button className="rounded-xl border border-slate-200 bg-white p-2 lg:hidden" onClick={() => dashboardStore.setState((state) => ({ leftSidebarOpen: !state.leftSidebarOpen }))}>
        <Menu className="size-5" />
      </button>

      <div className="relative max-w-2xl flex-1">
        <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
        <input className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50/80 pl-10 pr-20 text-sm outline-none transition focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-700/10" placeholder="Search assets, transactions, organizations..." />
        <span className="absolute right-3 top-1/2 hidden -translate-y-1/2 items-center gap-1 rounded-lg border bg-white px-2 py-1 text-[10px] font-semibold text-slate-400 sm:flex">
          <Command className="size-3" /> K
        </span>
      </div>

      <button className="hidden items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-800 md:flex">
        <Sparkles className="size-4" /> Ask Powerchain AI
      </button>

      <button className="relative rounded-xl border border-slate-200 bg-white p-2.5 hover:bg-slate-50">
        <Bell className="size-4" />
        <span className="absolute -right-1 -top-1 grid size-4 place-items-center rounded-full bg-emerald-700 text-[9px] text-white">3</span>
      </button>

      <div className="hidden text-right sm:block">
        <b className="block text-sm">{user.name}</b>
        <span className="text-[11px] capitalize text-slate-500">{user.role} · {user.organization}</span>
      </div>
      <div className="grid size-10 place-items-center rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-950 font-bold text-white shadow-lg shadow-emerald-900/15">JD</div>
    {isDemo&&<DemoBadge/>}<DashboardNetworkSelector/><RoleSwitcher /><LocalizationSelectors /></header>
  );
}
