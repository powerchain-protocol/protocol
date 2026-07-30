"use client";

import { useMemo } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { CheckCircle2, Droplets, ExternalLink, Loader2, ShieldAlert } from "lucide-react";
import { useFaucet } from "@/hooks/use-faucet";

const DEVNET_GENESIS_HASH = "EtWTRABZaYq6iMfeYKouRu166VU2xqa1";

export function FaucetCard() {
  const { connection } = useConnection();
  const { publicKey, connected } = useWallet();
  const { claim: submitClaim, loading, result, error, remainingMs, canClaim } = useFaucet();

  const walletLabel = useMemo(() => publicKey ? `${publicKey.toBase58().slice(0, 5)}…${publicKey.toBase58().slice(-5)}` : "Not connected", [publicKey]);

  async function claim() {
    if (!publicKey) return;
    const genesis = await connection.getGenesisHash();
    if (genesis !== DEVNET_GENESIS_HASH) throw new Error("Switch your wallet and RPC connection to Solana devnet.");
    await submitClaim(publicKey.toBase58());
  }

  return <section className="rounded-3xl border border-emerald-200 bg-white p-6 shadow-sm md:p-8">
    <div className="flex items-start justify-between gap-5">
      <div><p className="text-xs font-black uppercase tracking-[.16em] text-emerald-700">Solana devnet</p><h2 className="mt-2 text-2xl font-bold">PWRC developer faucet</h2><p className="mt-2 max-w-xl text-sm text-slate-600">Connect a Solana wallet, verify devnet, and receive test tokens. Devnet PWRC has no monetary value.</p></div>
      <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-emerald-100 text-emerald-800"><Droplets /></span>
    </div>
    <div className="mt-6 grid gap-3 rounded-2xl bg-slate-50 p-4 text-sm md:grid-cols-3">
      <div><span className="text-slate-500">Wallet</span><p className="mt-1 font-mono font-semibold">{walletLabel}</p></div>
      <div><span className="text-slate-500">Claim</span><p className="mt-1 font-semibold">10,000 PWRC</p></div>
      <div><span className="text-slate-500">Network</span><p className="mt-1 font-semibold">Devnet only</p></div>
    </div>
    <div className="mt-6 flex flex-wrap gap-3"><WalletMultiButton />
      <button disabled={!connected || loading || !canClaim} onClick={claim} className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-emerald-800 px-5 py-3 font-bold text-white disabled:cursor-not-allowed disabled:opacity-50">{loading?<Loader2 className="size-4 animate-spin"/>:<Droplets className="size-4"/>}{loading ? "Checking and claiming…" : remainingMs > 0 ? `Retry in ${Math.ceil(remainingMs / 1000)}s` : "Claim devnet PWRC"}</button>
    </div>
    {error && <div role="alert" className="mt-5 flex gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800"><ShieldAlert className="size-5 shrink-0"/><span>{error}</span></div>}
    {result && <div className="mt-5 flex gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900"><CheckCircle2 className="size-5 shrink-0"/><div><p className="font-bold">Claim sent: {result.amountTokens} PWRC</p><a className="mt-1 inline-flex items-center gap-1 underline" href={result.explorerUrl} target="_blank" rel="noreferrer">View transaction <ExternalLink className="size-3"/></a></div></div>}
  </section>;
}
