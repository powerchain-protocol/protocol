
"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {
  Activity,BarChart3,BookOpen,Brain,BriefcaseBusiness,Building2,Code2,CreditCard,
  Cuboid,Home,Landmark,Plug,Settings,ShieldCheck,UserCog,Users,Zap,ShoppingCart,Leaf,HeartHandshake,Blocks,WalletCards,RadioTower,Network,Cpu
} from "lucide-react";
import {DASHBOARD_NAVIGATION,featureEnabled} from "@/config/dashboard";
import {useAuth} from "@/context/auth-context";
import {useDashboardStore} from "@/hooks/use-dashboard-store";

const icons={home:Home,shield:ShieldCheck,building:Building2,users:Users,userCog:UserCog,zap:Zap,
activity:Activity,cube:Cuboid,card:CreditCard,briefcase:BriefcaseBusiness,bank:Landmark,chart:BarChart3,
brain:Brain,plug:Plug,code:Code2,settings:Settings,book:BookOpen,shopping:ShoppingCart,leaf:Leaf,heart:HeartHandshake,blocks:Blocks,wallet:WalletCards,radio:RadioTower,network:Network,cpu:Cpu};

const sections=[
  ["workspace","Workspace"],["administration","Administration"],["company","Company"],
  ["operations","Operations"],["platform","Platform"]
] as const;

export function LeftSidebar(){
  const {can,user}=useAuth();
  const pathname=usePathname();
  const open=useDashboardStore((state)=>state.leftSidebarOpen);
  const visible=DASHBOARD_NAVIGATION.filter((item)=>featureEnabled(item.featureFlag)&&(!item.permission||can(item.permission)));

  return <aside className={`${open?"flex":"hidden"} fixed inset-y-0 left-0 z-40 w-[278px] flex-col overflow-hidden bg-[#070b12] text-white lg:sticky lg:top-0 lg:flex lg:h-screen`}>
    <div className="flex h-[76px] items-center gap-3 border-b border-white/10 px-5">
      <img src="/logo.png" className="size-9" alt=""/><div><b className="block tracking-[.12em]">POWERCHAIN</b><small className="text-[9px] uppercase tracking-[.16em] text-emerald-300">Enterprise Control</small></div>
    </div>
    <nav className="flex-1 overflow-y-auto p-4">
      {sections.map(([id,label])=>{
        const items=visible.filter((item)=>item.section===id);
        if(!items.length)return null;
        return <section className="mb-5" key={id}><p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[.16em] text-slate-500">{label}</p>
          <div className="space-y-1">{items.map((item)=>{const Icon=icons[item.icon as keyof typeof icons]??Home;const active=item.href==="/"?pathname==="/":pathname.startsWith(item.href);return <Link href={item.href} key={item.id} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm ${active?"bg-white/10 text-white":"text-slate-400 hover:bg-white/5 hover:text-white"}`}><Icon className="size-4"/><span>{item.label}</span>{item.badge&&<span className="ml-auto rounded-full bg-emerald-500/15 px-2 py-0.5 text-[9px] text-emerald-300">{item.badge}</span>}</Link>})}</div>
        </section>
      })}
    </nav>
    <div className="m-4 rounded-2xl border border-white/10 bg-white/5 p-4"><small className="text-slate-400">Active role</small><b className="mt-1 block text-sm">{user.role.replaceAll("_"," ")}</b><p className="mt-1 text-xs text-slate-500">{user.organization}</p></div>
  </aside>
}
