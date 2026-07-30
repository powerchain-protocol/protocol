import {
  FAUCET_TRANSACTION_STORAGE_KEY,
  MAX_FAUCET_HISTORY_ITEMS,
  sortFaucetTransactions,
} from "@/data/transactions";
import type { FaucetTransaction } from "@/types/faucet";

function isFaucetTransaction(value: unknown): value is FaucetTransaction {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<FaucetTransaction>;
  return typeof item.id === "string" &&
    typeof item.signature === "string" &&
    typeof item.wallet === "string" &&
    item.network === "devnet" &&
    typeof item.createdAt === "string";
}

export function readFaucetHistory(): FaucetTransaction[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(FAUCET_TRANSACTION_STORAGE_KEY) ?? "[]");
    return Array.isArray(parsed)
      ? sortFaucetTransactions(parsed.filter(isFaucetTransaction)).slice(0, MAX_FAUCET_HISTORY_ITEMS)
      : [];
  } catch {
    return [];
  }
}

export function writeFaucetHistory(items: FaucetTransaction[]): FaucetTransaction[] {
  const next = sortFaucetTransactions(items).slice(0, MAX_FAUCET_HISTORY_ITEMS);
  if (typeof window !== "undefined") {
    window.localStorage.setItem(FAUCET_TRANSACTION_STORAGE_KEY, JSON.stringify(next));
  }
  return next;
}

export function appendFaucetHistory(transaction: FaucetTransaction): FaucetTransaction[] {
  const current = readFaucetHistory();
  return writeFaucetHistory([transaction, ...current.filter((item) => item.signature !== transaction.signature)]);
}

export function clearFaucetHistory(): void {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(FAUCET_TRANSACTION_STORAGE_KEY);
  }
}
