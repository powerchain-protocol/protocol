
"use client";

import { useMemo } from "react";
import { Copy, QrCode } from "lucide-react";
import { toast } from "sonner";

export function ReceivePayment({ address }: { address: string }) {
  const paymentUri = useMemo(() => `solana:${address}`, [address]);

  async function copy(value: string) {
    await navigator.clipboard.writeText(value);
    toast.success("Wallet address copied");
  }

  return (
    <section className="rounded-3xl border bg-white p-6">
      <div className="flex items-center gap-3"><QrCode className="text-emerald-700" /><h2 className="text-xl font-semibold">Receive payment</h2></div>
      <p className="mt-3 text-sm text-slate-500">Share this address only for supported Solana assets.</p>
      <div className="mt-5 break-all rounded-2xl bg-slate-50 p-4 font-mono text-sm">{address}</div>
      <button onClick={() => copy(address)} className="mt-4 flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold"><Copy className="size-4" />Copy address</button>
      <p className="mt-4 break-all text-xs text-slate-400">{paymentUri}</p>
    </section>
  );
}
