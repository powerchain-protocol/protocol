
import { Connection, PublicKey, SystemProgram, Transaction, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { z } from "zod";

export const supportedBlockchainSchema = z.enum(["solana", "sui", "base", "bnb"]);
export type SupportedBlockchain = z.infer<typeof supportedBlockchainSchema>;

export type WalletIdentity = {
  network: SupportedBlockchain;
  address: string;
  label?: string;
  connectedAt?: string;
};

export type BlockchainTransaction = {
  id: string;
  network: SupportedBlockchain;
  signature?: string;
  from: string;
  to: string;
  asset: string;
  amount: string;
  status: "created" | "signed" | "submitted" | "confirmed" | "failed";
  explorerUrl?: string;
  createdAt: string;
};

export function solanaExplorerUrl(signature: string, cluster: "mainnet-beta" | "devnet" = "mainnet-beta") {
  return `https://explorer.solana.com/tx/${encodeURIComponent(signature)}?cluster=${cluster}`;
}

export function buildSolTransfer(input: { from:string; to:string; amountSol:number }) {
  if (input.amountSol <= 0) throw new Error("Transfer amount must be positive.");
  const transaction = new Transaction().add(SystemProgram.transfer({
    fromPubkey: new PublicKey(input.from),
    toPubkey: new PublicKey(input.to),
    lamports: Math.round(input.amountSol * LAMPORTS_PER_SOL)
  }));
  return transaction;
}

export async function confirmSolanaTransaction(input: {
  rpcUrl:string; signature:string; commitment?:"confirmed"|"finalized"
}) {
  const connection = new Connection(input.rpcUrl, input.commitment ?? "confirmed");
  const result = await connection.getSignatureStatus(input.signature, { searchTransactionHistory:true });
  return {
    signature: input.signature,
    confirmed: Boolean(result.value?.confirmationStatus),
    confirmationStatus: result.value?.confirmationStatus,
    error: result.value?.err
  };
}

export interface BridgeProvider {
  name: string;
  supports(from:SupportedBlockchain,to:SupportedBlockchain,asset:string):boolean;
  quote(input:{from:SupportedBlockchain;to:SupportedBlockchain;asset:string;amount:string;walletAddress:string}):Promise<{
    routeId:string;amountIn:string;amountOut:string;feeUsd:number;expiresAt:string
  }>;
}
