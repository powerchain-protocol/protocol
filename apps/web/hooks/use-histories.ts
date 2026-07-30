"use client";

import { useCallback, useEffect, useState } from "react";
import { clearFaucetHistory, readFaucetHistory } from "@/data/histories";
import { FAUCET_TRANSACTION_EVENT, FAUCET_TRANSACTION_STORAGE_KEY } from "@/data/transactions";
import type { FaucetTransaction } from "@/types/faucet";

export function useHistories() {
  const [histories, setHistories] = useState<FaucetTransaction[]>([]);

  const refresh = useCallback(() => setHistories(readFaucetHistory()), []);
  const clear = useCallback(() => {
    clearFaucetHistory();
    setHistories([]);
  }, []);

  useEffect(() => {
    refresh();
    const onStorage = (event: StorageEvent) => {
      if (event.key === FAUCET_TRANSACTION_STORAGE_KEY) refresh();
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener(FAUCET_TRANSACTION_EVENT, refresh);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(FAUCET_TRANSACTION_EVENT, refresh);
    };
  }, [refresh]);

  return { histories, refresh, clear, count: histories.length };
}
