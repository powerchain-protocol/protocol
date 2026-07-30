"use client";

import { useCallback, useEffect, useState } from "react";
import { appendFaucetHistory } from "@/data/histories";
import { createFaucetTransaction, FAUCET_TRANSACTION_EVENT } from "@/data/transactions";
import type { FaucetClaimResult, FaucetErrorResult } from "@/types/faucet";

export interface UseFaucetOptions { endpoint?: string; cooldownMs?: number }

export function useFaucet({ endpoint = "/api/faucets/claim", cooldownMs = 86_400_000 }: UseFaucetOptions = {}) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FaucetClaimResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [nextClaimAt, setNextClaimAt] = useState<number | null>(null);
  const [remainingMs, setRemainingMs] = useState(0);

  useEffect(() => {
    if (!nextClaimAt) return;
    const update = () => setRemainingMs(Math.max(0, nextClaimAt - Date.now()));
    update();
    const timer = window.setInterval(update, 1_000);
    return () => window.clearInterval(timer);
  }, [nextClaimAt]);

  const claim = useCallback(async (wallet: string) => {
    if (!wallet.trim()) throw new Error("Wallet address is required");
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ wallet }),
      });
      const body = await response.json() as FaucetClaimResult | FaucetErrorResult;
      if (!response.ok || !body.ok) throw new Error(body.ok ? "Faucet claim failed" : body.error);
      setResult(body);
      setNextClaimAt(Date.now() + cooldownMs);
      appendFaucetHistory(createFaucetTransaction({
        signature: body.signature,
        wallet,
        mint: body.mint,
        amountTokens: body.amountTokens,
        network: body.cluster,
        explorerUrl: body.explorerUrl,
      }));
      window.dispatchEvent(new Event(FAUCET_TRANSACTION_EVENT));
      return body;
    } catch (cause) {
      const message = cause instanceof Error ? cause.message : "Unable to claim faucet tokens";
      setError(message);
      throw cause;
    } finally {
      setLoading(false);
    }
  }, [cooldownMs, endpoint]);

  return {
    claim,
    loading,
    result,
    error,
    remainingMs,
    canClaim: !loading && remainingMs === 0,
    reset: () => { setError(null); setResult(null); },
  };
}
