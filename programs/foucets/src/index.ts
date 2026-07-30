import {
  getAssociatedTokenAddress,
  getOrCreateAssociatedTokenAccount,
  TOKEN_2022_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  transferChecked,
  type Account,
} from "@solana/spl-token";
import {
  Connection,
  Keypair,
  PublicKey,
  clusterApiUrl,
  type Commitment,
  type ConfirmOptions,
} from "@solana/web3.js";
import { z } from "zod";

export const PWRC_DECIMALS = 9;
export const DEFAULT_CLAIM_TOKENS = 10_000n;
export const SOLANA_DEVNET_GENESIS_HASH = "EtWTRABZaYq6iMfeYKouRu166VU2xqa1";

export type FaucetCluster = "devnet" | "mainnet-beta";
export type FaucetTokenProgram = "spl-token" | "token-2022";

export interface FaucetTransferInput {
  connection: Connection;
  payer: Keypair;
  mint: PublicKey;
  recipient: PublicKey;
  amountTokens?: bigint;
  decimals?: number;
  tokenProgram?: FaucetTokenProgram;
  commitment?: Commitment;
}

export interface FaucetTransferResult {
  signature: string;
  source: string;
  destination: string;
  mint: string;
  recipient: string;
  amountTokens: string;
  amountBaseUnits: string;
  decimals: number;
  cluster: FaucetCluster;
  explorerUrl: string;
}

export const faucetEnvironmentSchema = z.object({
  SOLANA_FAUCET_SECRET_KEY: z.string().min(1),
  PWRC_DEVNET_MINT: z.string().min(32),
  SOLANA_DEVNET_RPC_URL: z.string().url().optional(),
});

export function parseFaucetSecretKey(value: string): Uint8Array {
  const parsed: unknown = JSON.parse(value);
  if (
    !Array.isArray(parsed) ||
    parsed.length !== 64 ||
    parsed.some((entry) => !Number.isInteger(entry) || entry < 0 || entry > 255)
  ) {
    throw new Error("SOLANA_FAUCET_SECRET_KEY must be a JSON array containing 64 bytes.");
  }
  return Uint8Array.from(parsed as number[]);
}

export function tokensToBaseUnits(amountTokens: bigint, decimals = PWRC_DECIMALS): bigint {
  if (amountTokens <= 0n) throw new Error("Faucet amount must be greater than zero.");
  if (!Number.isInteger(decimals) || decimals < 0 || decimals > 18) {
    throw new Error("Token decimals must be an integer between 0 and 18.");
  }
  return amountTokens * 10n ** BigInt(decimals);
}

export function explorerTransactionUrl(signature: string, cluster: FaucetCluster): string {
  const query = cluster === "devnet" ? "?cluster=devnet" : "";
  return `https://explorer.solana.com/tx/${encodeURIComponent(signature)}${query}`;
}

export async function assertDevnetConnection(connection: Connection): Promise<void> {
  const genesisHash = await connection.getGenesisHash();
  if (genesisHash !== SOLANA_DEVNET_GENESIS_HASH) {
    throw new Error("Faucet RPC must point to Solana devnet.");
  }
}

export async function resolveFaucetTokenAccounts(input: FaucetTransferInput): Promise<{
  source: PublicKey;
  destination: Account;
}> {
  const tokenProgramId = input.tokenProgram === "spl-token" ? TOKEN_PROGRAM_ID : TOKEN_2022_PROGRAM_ID;
  const commitment = input.commitment ?? "confirmed";
  const source = await getAssociatedTokenAddress(
    input.mint,
    input.payer.publicKey,
    false,
    tokenProgramId,
  );
  const destination = await getOrCreateAssociatedTokenAccount(
    input.connection,
    input.payer,
    input.mint,
    input.recipient,
    false,
    commitment,
    undefined,
    tokenProgramId,
  );
  return { source, destination };
}

export async function sendDevnetFaucetClaim(input: FaucetTransferInput): Promise<FaucetTransferResult> {
  await assertDevnetConnection(input.connection);
  const decimals = input.decimals ?? PWRC_DECIMALS;
  const amountTokens = input.amountTokens ?? DEFAULT_CLAIM_TOKENS;
  const amountBaseUnits = tokensToBaseUnits(amountTokens, decimals);
  const tokenProgramId = input.tokenProgram === "spl-token" ? TOKEN_PROGRAM_ID : TOKEN_2022_PROGRAM_ID;
  const commitment = input.commitment ?? "confirmed";
  const { source, destination } = await resolveFaucetTokenAccounts(input);
  const confirmOptions: ConfirmOptions = { commitment };
  const signature = await transferChecked(
    input.connection,
    input.payer,
    source,
    input.mint,
    destination.address,
    input.payer,
    amountBaseUnits,
    decimals,
    [],
    confirmOptions,
    tokenProgramId,
  );

  return {
    signature,
    source: source.toBase58(),
    destination: destination.address.toBase58(),
    mint: input.mint.toBase58(),
    recipient: input.recipient.toBase58(),
    amountTokens: amountTokens.toString(),
    amountBaseUnits: amountBaseUnits.toString(),
    decimals,
    cluster: "devnet",
    explorerUrl: explorerTransactionUrl(signature, "devnet"),
  };
}

export function createConfiguredDevnetFaucet(env: NodeJS.ProcessEnv = process.env) {
  const config = faucetEnvironmentSchema.parse(env);
  return {
    connection: new Connection(config.SOLANA_DEVNET_RPC_URL ?? clusterApiUrl("devnet"), "confirmed"),
    payer: Keypair.fromSecretKey(parseFaucetSecretKey(config.SOLANA_FAUCET_SECRET_KEY)),
    mint: new PublicKey(config.PWRC_DEVNET_MINT),
  };
}
