
import {
  Connection,
  Transaction,
  VersionedTransaction,
  type Commitment,
  type SendOptions
} from "@solana/web3.js";

export type SignerAdapter = {
  publicKey: { toBase58(): string };
  signTransaction<T extends Transaction | VersionedTransaction>(transaction: T): Promise<T>;
};

export async function sendSignedTransaction(
  connection: Connection,
  wallet: SignerAdapter,
  transaction: Transaction | VersionedTransaction,
  options: SendOptions & { commitment?: Commitment } = {}
) {
  const signed = await wallet.signTransaction(transaction);
  const raw = signed.serialize();
  const signature = await connection.sendRawTransaction(raw, {
    skipPreflight: options.skipPreflight ?? false,
    maxRetries: options.maxRetries ?? 3,
    preflightCommitment: options.preflightCommitment ?? "confirmed"
  });

  const latest = await connection.getLatestBlockhash(options.commitment ?? "confirmed");
  await connection.confirmTransaction({ signature, ...latest }, options.commitment ?? "confirmed");
  return signature;
}
