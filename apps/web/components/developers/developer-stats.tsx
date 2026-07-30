
import { developerStats } from "@/data/developer-portal";

export function DeveloperStats() {
  return (
    <section className="mx-auto max-w-[1480px] px-5 py-5 lg:px-8">
      <div className="grid overflow-hidden rounded-2xl bg-gradient-to-r from-[#07131b] to-[#111d26] text-white shadow-2xl sm:grid-cols-2 lg:grid-cols-5">
        {developerStats.map(([value, label]) => (
          <div className="relative px-5 py-7 text-center after:absolute after:right-0 after:top-1/4 after:hidden after:h-1/2 after:w-px after:bg-white/10 lg:after:block last:after:hidden" key={label}>
            <span className="mx-auto mb-3 block size-8 rounded-full border border-emerald-500/50 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,.25)]" />
            <strong className="block text-2xl">{value}</strong>
            <span className="mt-1 block text-sm text-slate-300">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
