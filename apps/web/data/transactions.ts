import type { FaucetTransaction } from "@/types/faucet";

export const FAUCET_TRANSACTION_STORAGE_KEY = "powerchain:faucets:transactions:v1";
export const FAUCET_TRANSACTION_EVENT = "powerchain:faucets:transaction";
export const MAX_FAUCET_HISTORY_ITEMS = 25;

export function createFaucetTransaction(input: Omit<FaucetTransaction, "id" | "createdAt">): FaucetTransaction {
  return {
    ...input,
    id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${input.signature.slice(0, 8)}`,
    createdAt: new Date().toISOString(),
  };
}

export function sortFaucetTransactions(items: FaucetTransaction[]): FaucetTransaction[] {
  return [...items].sort((left, right) => Date.parse(right.createdAt) - Date.parse(left.createdAt));
}
