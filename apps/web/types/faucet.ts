export type FaucetNetwork = "devnet";

export interface FaucetConfig {
  network: FaucetNetwork;
  mint: string | null;
  amountTokens: string;
  decimals: number;
  cooldownSeconds: number;
  explorerBaseUrl: string;
}

export interface FaucetClaimRequest { wallet: string }
export interface FaucetClaimResult {
  ok: true;
  signature: string;
  amountTokens: string;
  amountBaseUnits: string;
  decimals: number;
  mint: string;
  source: string;
  destination: string;
  recipient: string;
  cluster: FaucetNetwork;
  explorerUrl: string;
}
export interface FaucetErrorResult { ok: false; error: string; retryAfterSeconds?: number }

export interface FaucetTransaction {
  id: string;
  signature: string;
  wallet: string;
  mint: string;
  amountTokens: string;
  network: FaucetNetwork;
  explorerUrl: string;
  createdAt: string;
}
