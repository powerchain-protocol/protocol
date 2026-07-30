"use client";

import { History, Trash2 } from "lucide-react";
import { FoucetTransaction } from "@/components/transactions/foucets";
import { useHistories } from "@/hooks/use-histories";

export function FoucetHistories() {
  const { histories, clear } = useHistories();

  return (
    <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/50 md:p-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[.16em] text-emerald-700 dark:text-emerald-400">Local activity</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950 dark:text-white">Claim history</h2>
        </div>
        {histories.length > 0 && (
          <button onClick={clear} className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold dark:border-slate-700">
            <Trash2 className="size-4" /> Clear
          </button>
        )}
      </div>

      <div className="mt-5 space-y-3">
        {histories.length > 0 ? histories.map((transaction) => (
          <FoucetTransaction key={transaction.id} transaction={transaction} />
        )) : (
          <div className="grid min-h-36 place-items-center rounded-2xl border border-dashed border-slate-300 text-center dark:border-slate-700">
            <div><History className="mx-auto size-6 text-slate-400" /><p className="mt-2 text-sm text-slate-500">Successful claims from this browser appear here.</p></div>
          </div>
        )}
      </div>
    </section>
  );
}
