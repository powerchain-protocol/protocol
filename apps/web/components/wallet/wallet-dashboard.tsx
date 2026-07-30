
"use client";

import { useMemo } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { usePortfolio } from "@/hooks/use-portfolio";
import { WalletBalanceCard } from "./wallet-balance-card";
import { SendPayment } from "./send-payment";
import { ReceivePayment } from "./receive-payment";

export function WalletDashboard() {
  const wallet = useWallet();
  const address = wallet.publicKey?.toBase58();
  const { portfolio, status, error, refresh } = usePortfolio({ solanaAddress: address });

  const balances = useMemo(
    () => portfolio?.positions.map((position) => ({ symbol: position.symbol, amount: position.amount })) ?? [],
    [portfolio]
  );

  if (!address) {
    return <div className="rounded-3xl border bg-white p-8 text-center"><h2 className="text-2xl font-semibold">Connect a compatible Solana wallet</h2><p className="mt-3 text-slate-500">Wallet Standard and Wallet Adapter compatible wallets can sign payments and transactions.</p></div>;
  }

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div><p className="text-xs font-black uppercase tracking-widest text-emerald-700">Live wallet</p><h1 className="mt-2 text-4xl font-semibold">Portfolio and payments</h1><p className="mt-2 break-all text-sm text-slate-500">{address}</p></div>
        <button onClick={refresh} className="rounded-xl border px-4 py-2 text-sm font-semibold">Refresh balances</button>
      </div>

      {status === "loading" && !portfolio ? <div className="mt-8 h-40 animate-pulse rounded-3xl bg-slate-100" /> : null}
      {error ? <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-800">{error}</div> : null}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {portfolio?.positions.map((position) => <WalletBalanceCard key={position.id} balance={position} />)}
      </div>

      {portfolio && portfolio.positions.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-900">
          No positive token balances were returned for this wallet. Payment controls remain disabled until funds are available.
        </div>
      ) : null}

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <SendPayment balances={balances} />
        <ReceivePayment address={address} />
      </div>
    </div>
  );
}
