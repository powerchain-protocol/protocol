
"use client";

import Link from "next/link";
import { useState } from "react";
import { BookOpen, Command, Menu, Search, Sun, X } from "lucide-react";
import { developerNavigation } from "@/data/developer-portal";

export function DeveloperHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/92 backdrop-blur-2xl">
      <div className="mx-auto flex h-[76px] max-w-[1480px] items-center gap-7 px-5 lg:px-8">
        <Link href="/developers" className="flex shrink-0 items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl border border-emerald-200 bg-emerald-50">
            <img src="/logo.png" alt="" className="size-8 object-contain" />
          </span>
          <span>
            <b className="block text-lg leading-none tracking-tight">POWERCHAIN</b>
            <small className="mt-1 block text-[10px] font-black uppercase tracking-[.15em] text-emerald-700">
              Developer Portal
            </small>
          </span>
        </Link>

        <nav className="ml-2 hidden items-center gap-7 xl:flex">
          {developerNavigation.map((item) => (
            <Link key={item.label} href={item.href} className="text-sm font-semibold text-slate-700 hover:text-emerald-800">
              {item.label}
            </Link>
          ))}
          <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            Status <span className="size-2 rounded-full bg-emerald-500" />
          </span>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <label className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input
              className="h-10 w-52 rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-12 text-sm outline-none transition focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-700/10"
              placeholder="Search"
            />
            <span className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1 text-[10px] font-bold text-slate-400">
              <Command className="size-3" />K
            </span>
          </label>
          <button className="grid size-10 place-items-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50" aria-label="Toggle theme">
            <Sun className="size-4" />
          </button>
          <Link href="/auth/signin" className="hidden rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-slate-800 sm:block">
            Log In
          </Link>
          <button onClick={() => setOpen((value) => !value)} className="grid size-10 place-items-center rounded-xl border xl:hidden" aria-label="Toggle menu">
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="grid gap-1 border-t bg-white p-4 xl:hidden">
          {developerNavigation.map((item) => (
            <Link key={item.label} href={item.href} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-sm font-semibold hover:bg-emerald-50">
              {item.label}
            </Link>
          ))}
          <Link href="/auth/signin" className="mt-2 rounded-xl bg-slate-950 px-4 py-3 text-center text-sm font-semibold text-white">
            Log In
          </Link>
        </nav>
      )}
    </header>
  );
}
