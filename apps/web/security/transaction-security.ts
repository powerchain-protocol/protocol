
import { PublicKey, type Transaction, type VersionedTransaction } from "@solana/web3.js";

export const TRANSACTION_LIMITS = {
  minimumPaymentBaseUnits: 1n,
  maximumPaymentBaseUnits: 10_000_000_000_000_000n,
  maximumInstructions: 20
} as const;

export function assertPositiveBalance(balance: bigint, requested: bigint, fee: bigint) {
  if (requested <= 0n) throw new Error("The transaction amount must be greater than zero.");
  if (balance <= 0n) throw new Error("The selected wallet has no available balance.");
  if (requested + fee > balance) {
    throw new Error("Insufficient balance after the platform and network fees.");
  }
}

export function assertSafeRecipient(recipient: string, sender?: string) {
  const recipientKey = new PublicKey(recipient);
  if (sender && recipientKey.equals(new PublicKey(sender))) {
    throw new Error("The sender and recipient addresses must be different.");
  }
  return recipientKey;
}

export function assertTransactionShape(transaction: Transaction | VersionedTransaction) {
  const instructions =
    "instructions" in transaction
      ? transaction.instructions.length
      : transaction.message.compiledInstructions.length;

  if (instructions > TRANSACTION_LIMITS.maximumInstructions) {
    throw new Error("The transaction contains too many instructions.");
  }
}

export function redactWalletAddress(address: string) {
  return address.length > 12 ? `${address.slice(0, 6)}…${address.slice(-6)}` : address;
}
