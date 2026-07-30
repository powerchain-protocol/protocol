
export type ChainId="solana-mainnet"|"solana-devnet"|"solana-testnet"|"solana-localnet"|"solana-custom"|"sui-mainnet"|"sui-devnet"|"sui-custom";
export type NetworkProviderId="solana-public"|"helius"|"sui-public"|"custom"|"local";
export type NetworkSettings={chain:ChainId;provider:NetworkProviderId;rpcUrl:string;customRpcUrl?:string};
