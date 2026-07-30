
import { encodeURL, findReference, validateTransfer } from "@solana/pay";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import BigNumber from "bignumber.js";

export function createSolanaPayRequest(input: {
  recipient: string;
  amount: number;
  label: string;
  message: string;
  memo?: string;
}) {
  const reference = Keypair.generate().publicKey;
  const url = encodeURL({
    recipient: new PublicKey(input.recipient),
    amount: new BigNumber(input.amount),
    reference,
    label: input.label,
    message: input.message,
    memo: input.memo
  });
  return { url: url.toString(), reference: reference.toBase58() };
}

export async function verifySolanaPayTransfer(
  connection: Connection,
  signatureReference: string,
  recipient: string,
  amount: number
) {
  const signature = await findReference(connection, new PublicKey(signatureReference), {
    finality: "confirmed"
  });
  await validateTransfer(connection, signature.signature, {
    recipient: new PublicKey(recipient),
    amount: new BigNumber(amount)
  });
  return signature.signature;
}
