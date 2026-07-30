
"use client";

import { useMemo, useState } from "react";
import { Connection, PublicKey } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { TOKENS } from "@/tokens";
import { calculatePlatformFee } from "@/lib/fees/fees";
import { buildNativeSolPayment, buildSplTokenPayment } from "@/lib/wallets/solana-payments";

const treasury = process.env.NEXT_PUBLIC_TREASURY_WALLET ?? "";

export function SendPayment({ balances }: { balances: Array<{ symbol: string; amount: string }> }) {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [recipient, setRecipient] = useState("");
  const [symbol, setSymbol] = useState<"SOL" | "PWRC" | "USDC" | "USDT">("SOL");
  const [amount, setAmount] = useState("");

  const selectedBalance = balances.find((balance) => balance.symbol === symbol);
  const available = Number(selectedBalance?.amount ?? 0);
  const fee = useMemo(() => Number(amount || 0) * 0.02, [amount]);
  const canSubmit = Boolean(wallet.publicKey && treasury && recipient && Number(amount) > 0 && Number(amount) + fee <= available);

  async function send() {
    if (!wallet.publicKey || !wallet.sendTransaction) return;
    if (!treasury) {
      toast.error("Treasury wallet is not configured");
      return;
    }

    try {
      const decimals = TOKENS[symbol].decimals;
      const baseUnits = BigInt(Math.round(Number(amount) * 10 ** decimals));
      const built = symbol === "SOL"
        ? await buildNativeSolPayment({
            connection,
            sender: wallet.publicKey,
            recipient,
            amountLamports: baseUnits,
            treasury
          })
        : await buildSplTokenPayment({
            connection,
            owner: wallet.publicKey,
            recipient,
            treasury,
            mint: TOKENS[symbol].mint,
            amountBaseUnits: baseUnits
          });

      const signature = await wallet.sendTransaction(built.transaction, connection, {
        skipPreflight: false,
        maxRetries: 3
      });

      await fetch("/api/transactions/send", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          sender: wallet.publicKey.toBase58(),
          recipient,
          symbol,
          amountBaseUnits: baseUnits.toString(),
          signature
        })
      });

      toast.success("Payment submitted", { description: signature });
      setAmount("");
      setRecipient("");
    } catch (error) {
      toast.error("Payment failed", {
        description: error instanceof Error ? error.message : "The wallet rejected the payment."
      });
    }
  }

  return (
    <section className="rounded-3xl border bg-white p-6">
      <h2 className="text-xl font-semibold">Send payment</h2>
      <p className="mt-2 text-sm text-slate-500">A 2% platform fee is sent to the configured treasury wallet.</p>

      <div className="mt-6 grid gap-4">
        <label><span className="text-sm font-semibold">Asset</span>
          <select value={symbol} onChange={(event) => setSymbol(event.target.value as typeof symbol)} className="mt-2 h-11 w-full rounded-xl border bg-white px-3">
            <option>SOL</option><option>PWRC</option><option>USDC</option><option>USDT</option>
          </select>
        </label>
        <label><span className="text-sm font-semibold">Recipient</span>
          <input value={recipient} onChange={(event) => setRecipient(event.target.value)} className="mt-2 h-11 w-full rounded-xl border px-3" placeholder="Solana wallet address" />
        </label>
        <label><span className="text-sm font-semibold">Amount</span>
          <input value={amount} onChange={(event) => setAmount(event.target.value)} className="mt-2 h-11 w-full rounded-xl border px-3" inputMode="decimal" placeholder="0.00" />
        </label>
      </div>

      <dl className="mt-5 space-y-2 rounded-xl bg-slate-50 p-4 text-sm">
        <div className="flex justify-between"><dt>Available</dt><dd>{available.toLocaleString("fi-FI")} {symbol}</dd></div>
        <div className="flex justify-between"><dt>Platform fee</dt><dd>{fee.toLocaleString("fi-FI")} {symbol}</dd></div>
        <div className="flex justify-between font-semibold"><dt>Total debited</dt><dd>{(Number(amount || 0) + fee).toLocaleString("fi-FI")} {symbol}</dd></div>
      </dl>

      {!selectedBalance || available <= 0 ? (
        <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          This wallet has no spendable {symbol} balance. Add funds before creating a payment.
        </div>
      ) : null}

      <Button className="mt-6 w-full" disabled={!canSubmit} onClick={send}>
        {wallet.publicKey ? "Review and send" : "Connect wallet to send"}
      </Button>
    </section>
  );
}
