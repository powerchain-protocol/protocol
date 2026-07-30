
import type { TokenBalance } from "@/types/balances";

export function WalletBalanceCard({ balance }: { balance: TokenBalance }) {
  return (
    <article className="rounded-2xl border bg-white p-5">
      <div className="flex items-center justify-between">
        <div><b>{balance.symbol}</b><p className="text-xs text-slate-500">{balance.chain}</p></div>
        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">Live</span>
      </div>
      <strong className="mt-5 block text-2xl">{Number(balance.amount).toLocaleString("fi-FI", { maximumFractionDigits: 6 })}</strong>
      <p className="mt-1 text-sm text-slate-500">£{balance.valueGbp.toLocaleString("fi-FI", { maximumFractionDigits: 2 })}</p>
    </article>
  );
}
