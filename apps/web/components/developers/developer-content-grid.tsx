
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { developerResources, documentationLinks, featuredGuides } from "@/data/developer-portal";

export function DeveloperContentGrid() {
  return (
    <section className="mx-auto grid max-w-[1480px] gap-4 px-5 py-4 lg:grid-cols-[.75fr_1.15fr_1.1fr] lg:px-8">
      <article id="documentation" className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="font-bold">Documentation</h2>
        <div className="mt-5 grid gap-1">
          {documentationLinks.map((label) => (
            <Link href="#" key={label} className="flex items-center justify-between rounded-lg py-2 text-sm text-slate-700 hover:text-emerald-800">
              {label}<ChevronRight className="size-3.5" />
            </Link>
          ))}
        </div>
        <Link href="#" className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-emerald-800">View all docs <ArrowRight className="size-3.5" /></Link>
      </article>

      <article id="guides" className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-bold">Featured Guides</h2>
          <Link href="#" className="text-xs font-semibold">View all →</Link>
        </div>
        <div className="mt-4 space-y-1">
          {featuredGuides.map(({ title, description, icon: Icon }) => (
            <Link href="#" key={title} className="group flex items-center gap-3 rounded-xl p-2.5 hover:bg-slate-50">
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-slate-100 text-emerald-800 group-hover:bg-emerald-50">
                <Icon className="size-4" />
              </span>
              <span className="min-w-0 flex-1">
                <b className="block text-sm">{title}</b>
                <small className="block truncate text-slate-500">{description}</small>
              </span>
              <ChevronRight className="size-4 text-slate-400" />
            </Link>
          ))}
        </div>
      </article>

      <article id="resources" className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="font-bold">Developer Resources</h2>
        <div className="mt-5 grid grid-cols-2 gap-3">
          {developerResources.map(({ title, description, icon: Icon }) => (
            <Link href="#" key={title} className="rounded-xl bg-slate-50 p-4 transition hover:bg-emerald-50">
              <span className="grid size-8 place-items-center rounded-lg bg-white text-emerald-800 shadow-sm"><Icon className="size-4" /></span>
              <b className="mt-3 block text-xs">{title}</b>
              <small className="mt-1 block text-[11px] text-slate-500">{description}</small>
            </Link>
          ))}
        </div>
      </article>
    </section>
  );
}
