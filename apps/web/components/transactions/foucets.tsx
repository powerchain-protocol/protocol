"use client";

import { CheckCircle2, ExternalLink } from "lucide-react";
import type { FaucetTransaction } from "@/types/faucet";

export function FoucetTransaction({ transaction }: { transaction: FaucetTransaction }) {
  return (
    <article className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-start gap-3">
        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-600" />
        <div className="min-w-0">
          <p className="font-semibold text-slate-950 dark:text-white">{transaction.amountTokens} PWRC claimed</p>
          <p className="truncate font-mono text-xs text-slate-500">{transaction.wallet}</p>
          <p className="mt-1 text-xs text-slate-500">{new Date(transaction.createdAt).toLocaleString()} · Solana devnet</p>
        </div>
      </div>
      <a
        href={transaction.explorerUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:underline dark:text-emerald-400"
      >
        Explorer <ExternalLink className="size-3.5" />
      </a>
    </article>
  );
}
