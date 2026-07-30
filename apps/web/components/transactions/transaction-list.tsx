
export type TransactionListItem = {
  id: string;
  signature: string;
  type: "send" | "receive" | "swap" | "bridge";
  asset: string;
  amount: string;
  status: "confirmed" | "pending" | "failed";
  createdAt: string;
};

export function TransactionList({ transactions }: { transactions: TransactionListItem[] }) {
  if (!transactions.length) {
    return <div className="rounded-3xl border bg-white p-8 text-center text-slate-500">No transactions were found for this wallet.</div>;
  }

  return (
    <div className="overflow-hidden rounded-3xl border bg-white">
      {transactions.map((transaction) => (
        <article key={transaction.id} className="grid gap-2 border-b p-5 last:border-0 sm:grid-cols-[1fr_140px_140px]">
          <div><b className="capitalize">{transaction.type}</b><p className="truncate text-xs text-slate-500">{transaction.signature}</p></div>
          <strong>{transaction.amount} {transaction.asset}</strong>
          <span className="text-sm capitalize">{transaction.status}</span>
        </article>
      ))}
    </div>
  );
}
