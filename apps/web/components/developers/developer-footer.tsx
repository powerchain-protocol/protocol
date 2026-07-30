
import Link from "next/link";
import { Github, Linkedin, MessageCircle, Youtube } from "lucide-react";
import { footerColumns } from "@/data/developer-portal";

export function DeveloperFooter() {
  return (
    <footer className="mt-6 bg-gradient-to-br from-[#07131b] via-[#0a1720] to-[#101e27] text-white">
      <div className="mx-auto grid max-w-[1480px] gap-10 px-5 py-12 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(5,1fr)] lg:px-8">
        <div>
          <Link href="/developers" className="flex items-center gap-3 text-xl font-black tracking-wide">
            <img src="/logo-white.png" alt="" className="size-10 object-contain" /> POWERCHAIN
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-7 text-slate-300">
            The infrastructure layer for the renewable energy economy.
          </p>
          <div className="mt-6 flex gap-2">
            {[Github, MessageCircle, Linkedin, Youtube].map((Icon, index) => (
              <Link href="#" key={index} className="grid size-9 place-items-center rounded-lg bg-white/8 text-slate-300 hover:bg-white/15 hover:text-white">
                <Icon className="size-4" />
              </Link>
            ))}
          </div>
        </div>

        {Object.entries(footerColumns).map(([title, links]) => (
          <div key={title}>
            <h3 className="text-xs font-bold">{title}</h3>
            <div className="mt-5 grid gap-3">
              {links.map((label) => <Link href="#" key={label} className="text-xs text-slate-300 hover:text-white">{label}</Link>)}
            </div>
          </div>
        ))}
      </div>
      <div className="mx-auto flex max-w-[1480px] flex-col justify-between gap-3 border-t border-white/10 px-5 py-5 text-xs text-slate-400 sm:flex-row lg:px-8">
        <span>© 2026 Powerchain Platform. All rights reserved.</span>
        <span className="flex items-center gap-2"><span className="size-2 rounded-full bg-emerald-400" />All Systems Operational</span>
      </div>
    </footer>
  );
}
