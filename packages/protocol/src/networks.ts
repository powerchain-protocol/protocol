export type SolanaCluster = "localnet" | "devnet" | "testnet" | "mainnet-beta";
export type SuiNetwork = "localnet" | "devnet" | "testnet" | "mainnet";

export interface NetworkConfig {
  id: string;
  chain: "solana" | "sui";
  label: string;
  rpcUrl: string;
  explorerUrl: string;
  production: boolean;
}

const env = (name: string, fallback: string) =>
  typeof process !== "undefined" && process.env?.[name] ? process.env[name]! : fallback;

export const NETWORKS = {
  solanaDevnet: {id:"solana-devnet",chain:"solana",label:"Solana Devnet",rpcUrl:env("NEXT_PUBLIC_SOLANA_DEVNET_RPC","https://api.devnet.solana.com"),explorerUrl:"https://explorer.solana.com",production:false},
  solanaMainnet: {id:"solana-mainnet",chain:"solana",label:"Solana Mainnet",rpcUrl:env("NEXT_PUBLIC_SOLANA_MAINNET_RPC","https://api.mainnet-beta.solana.com"),explorerUrl:"https://explorer.solana.com",production:true},
  suiDevnet: {id:"sui-devnet",chain:"sui",label:"Sui Devnet",rpcUrl:env("NEXT_PUBLIC_SUI_DEVNET_RPC","https://fullnode.devnet.sui.io:443"),explorerUrl:"https://suiscan.xyz",production:false},
  suiMainnet: {id:"sui-mainnet",chain:"sui",label:"Sui Mainnet",rpcUrl:env("NEXT_PUBLIC_SUI_MAINNET_RPC","https://fullnode.mainnet.sui.io:443"),explorerUrl:"https://suiscan.xyz",production:true}
} as const satisfies Record<string, NetworkConfig>;
