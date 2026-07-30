import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountIdempotentInstruction,
  createTransferCheckedInstruction,
  getAssociatedTokenAddressSync,
} from "@solana/spl-token";
import { PublicKey, Transaction } from "@solana/web3.js";

export const SPL_TOKEN_PROGRAM = TOKEN_PROGRAM_ID;
export const SPL_ASSOCIATED_TOKEN_PROGRAM = ASSOCIATED_TOKEN_PROGRAM_ID;

export type SplTransferInput = {
  payer: PublicKey;
  owner: PublicKey;
  recipient: PublicKey;
  mint: PublicKey;
  amount: bigint;
  decimals: number;
};

export function assertTokenDecimals(decimals: number): void {
  if (!Number.isInteger(decimals) || decimals < 0 || decimals > 18) {
    throw new RangeError("Token decimals must be an integer between 0 and 18.");
  }
}

export function assertPositiveTokenAmount(amount: bigint): void {
  if (amount <= 0n) throw new RangeError("Token amount must be greater than zero.");
}

export function buildSplTransferTransaction(input: SplTransferInput): Transaction {
  assertPositiveTokenAmount(input.amount);
  assertTokenDecimals(input.decimals);

  const source = getAssociatedTokenAddressSync(input.mint, input.owner, false, TOKEN_PROGRAM_ID);
  const destination = getAssociatedTokenAddressSync(input.mint, input.recipient, false, TOKEN_PROGRAM_ID);

  return new Transaction().add(
    createAssociatedTokenAccountIdempotentInstruction(
      input.payer,
      destination,
      input.recipient,
      input.mint,
      TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID,
    ),
    createTransferCheckedInstruction(
      source,
      input.mint,
      destination,
      input.owner,
      input.amount,
      input.decimals,
      [],
      TOKEN_PROGRAM_ID,
    ),
  );
}
