
"use client";

import { useMemo, useState } from "react";
import { ArrowDownUp, Route } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { SwapSettings, type SwapSettingsValue } from "./swap-settings";
import { MevProtectionNotice } from "./mev-protection";
import { TransactionReviewModal } from "@/components/modals/transaction-review-modal";

const TOKENS = ["PWRC", "wPWRC", "SOL", "USDC", "CCT"] as const;

export function SwapInterface() {
  const [fromToken, setFromToken] = useState<(typeof TOKENS)[number]>("PWRC");
  const [toToken, setToToken] = useState<(typeof TOKENS)[number]>("wPWRC");
  const [amount, setAmount] = useState("18500");
  const [reviewOpen, setReviewOpen] = useState(false);
  const [settings, setSettings] = useState<SwapSettingsValue>({
    slippageBps: 50,
    mevProtection: true,
    priority: "fast"
  });

  const output = useMemo(() => {
    const numeric = Number(amount);
    return Number.isFinite(numeric) ? numeric.toLocaleString("fi-FI", { maximumFractionDigits: 4 }) : "0";
  }, [amount]);

  function flip() {
    setFromToken(toToken);
    setToToken(fromToken);
  }

  function confirm() {
    setReviewOpen(false);
    toast.success("Swap submitted", { description: "The protected transaction is awaiting confirmation." });
  }

  return (
    <>
      <section className="mx-auto w-full max-w-lg rounded-3xl border bg-[#07130f] p-5 text-white shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-300">PowerSwap</p>
            <h1 className="mt-1 text-xl font-semibold">Swap assets</h1>
          </div>
          <SwapSettings value={settings} onChange={setSettings} />
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex justify-between text-xs text-slate-400"><span>From</span><span>Balance 42,360.25</span></div>
          <div className="mt-3 flex items-center gap-3">
            <input
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              inputMode="decimal"
              className="min-w-0 flex-1 bg-transparent text-3xl font-semibold outline-none"
            />
            <select value={fromToken} onChange={(event) => setFromToken(event.target.value as typeof fromToken)} className="rounded-xl bg-white/10 px-3 py-2">
              {TOKENS.map((token) => <option className="text-black" key={token}>{token}</option>)}
            </select>
          </div>
        </div>

        <button onClick={flip} className="mx-auto -my-2 grid size-11 place-items-center rounded-full border border-white/10 bg-emerald-800 shadow-lg">
          <ArrowDownUp className="size-4" />
        </button>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex justify-between text-xs text-slate-400"><span>To</span><span>Estimated</span></div>
          <div className="mt-3 flex items-center gap-3">
            <strong className="min-w-0 flex-1 text-3xl">{output}</strong>
            <select value={toToken} onChange={(event) => setToToken(event.target.value as typeof toToken)} className="rounded-xl bg-white/10 px-3 py-2">
              {TOKENS.map((token) => <option className="text-black" key={token}>{token}</option>)}
            </select>
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-white/10 p-4 text-xs text-slate-300">
          <div className="flex justify-between"><span>Best route</span><span className="text-emerald-300">PowerBridge → Jupiter</span></div>
          <div className="mt-2 flex justify-between"><span>Estimated fee</span><span>0.001 PWRC</span></div>
          <div className="mt-2 flex justify-between"><span>Price impact</span><span>&lt; 0.05%</span></div>
        </div>

        <div className="mt-4"><MevProtectionNotice enabled={settings.mevProtection} /></div>

        <Button className="mt-5 w-full" onClick={() => setReviewOpen(true)}>
          <Route className="size-4" /> Review protected swap
        </Button>
      </section>

      <TransactionReviewModal
        open={reviewOpen}
        onOpenChange={setReviewOpen}
        from={`${amount} ${fromToken}`}
        to={`${output} ${toToken}`}
        rate={`1 ${fromToken} = 1 ${toToken}`}
        fee="0.001 PWRC"
        onConfirm={confirm}
      />
    </>
  );
}
