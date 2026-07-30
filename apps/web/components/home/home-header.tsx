
"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const links = [
  ["Products","/marketplace"],
  ["Solutions","/energy"],
  ["Marketplace","/marketplace"],
  ["Resources","/developers"],
  ["Company","/about"]
] as const;

export function HomeHeader() {
  const [open,setOpen]=useState(false);
  return (
    <header className="absolute inset-x-0 top-0 z-50 border-b border-white/10 bg-black/20 text-white backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-[1500px] items-center px-5 lg:px-8">
        <Link href="/" className="flex items-center gap-3 font-black"><img src="/logo-white.png" className="size-9" alt="" />POWERCHAIN</Link>
        <nav className="mx-auto hidden gap-8 lg:flex">{links.map(([label,href])=><Link key={label} href={href} className="text-sm font-semibold text-slate-200">{label}</Link>)}</nav>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <Link href="/auth/signin" className="hidden rounded-xl border border-white/20 px-5 py-2.5 text-sm font-semibold sm:block">Log in</Link>
          <Link href="/dashboard" className="hidden rounded-xl bg-lime-400 px-5 py-2.5 text-sm font-bold text-emerald-950 sm:block">Launch App</Link>
          <button onClick={()=>setOpen(v=>!v)} className="grid size-10 place-items-center rounded-xl border border-white/20 lg:hidden">{open?<X className="size-5"/>:<Menu className="size-5"/>}</button>
        </div>
      </div>
      {open&&<nav className="grid gap-1 border-t border-white/10 bg-black/90 p-4 lg:hidden">{links.map(([label,href])=><Link href={href} key={label} className="rounded-xl px-4 py-3 text-sm font-semibold">{label}</Link>)}</nav>}
    </header>
  );
}
