
export type SolanaCluster = "mainnet-beta" | "devnet" | "testnet" | "localnet";

export function solanaExplorerUrl(
  value: string,
  type: "tx" | "address" | "block" = "tx",
  cluster: SolanaCluster = "mainnet-beta"
) {
  const clusterQuery = cluster === "mainnet-beta" ? "" : `?cluster=${cluster}`;
  return `https://explorer.solana.com/${type}/${value}${clusterQuery}`;
}

export function solscanUrl(value: string, type: "tx" | "account" = "tx") {
  return `https://solscan.io/${type}/${value}`;
}

export function heliusExplorerUrl(signature: string) {
  return `https://orb.helius.dev/tx/${signature}`;
}
