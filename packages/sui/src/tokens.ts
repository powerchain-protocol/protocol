import { Transaction } from "@mysten/sui/transactions";
export interface MintPwrcInput { packageId: string; treasuryCapId: string; amount: bigint; recipient: string }
export function buildMintPwrcTransaction(input: MintPwrcInput): Transaction {
  if (input.amount <= 0n) throw new Error("Mint amount must be positive");
  const tx = new Transaction();
  tx.moveCall({
    target: `${input.packageId}::pwrc::mint`,
    arguments: [tx.object(input.treasuryCapId), tx.pure.u64(input.amount), tx.pure.address(input.recipient)],
  });
  return tx;
}
