
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { developerFeatures } from "@/data/developer-portal";

export function DeveloperFeatureGrid() {
  return (
    <section id="sdks" className="mx-auto max-w-[1480px] px-5 py-8 lg:px-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">
        {developerFeatures.map(({ title, description, href, icon: Icon }) => (
          <Link href={href} key={title} className="group flex min-h-[220px] flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_35px_rgba(15,23,42,.035)] transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl">
            <span className="grid size-11 place-items-center rounded-xl bg-emerald-50 text-emerald-800 group-hover:bg-emerald-700 group-hover:text-white">
              <Icon className="size-5" />
            </span>
            <h2 className="mt-6 font-bold">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
            <ArrowRight className="mt-auto size-4 self-end text-slate-500 transition group-hover:translate-x-1 group-hover:text-emerald-700" />
          </Link>
        ))}
      </div>
    </section>
  );
}
