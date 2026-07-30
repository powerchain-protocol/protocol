
export const NETWORK_OPTIONS=[
{id:"solana-mainnet",label:"Solana Mainnet",provider:"solana-public",rpcUrl:"https://api.mainnet-beta.solana.com"},
{id:"solana-devnet",label:"Solana Devnet",provider:"solana-public",rpcUrl:"https://api.devnet.solana.com"},
{id:"solana-testnet",label:"Solana Testnet",provider:"solana-public",rpcUrl:"https://api.testnet.solana.com"},
{id:"solana-localnet",label:"Solana Local",provider:"local",rpcUrl:"http://127.0.0.1:8899"},
{id:"sui-mainnet",label:"Sui Mainnet",provider:"sui-public",rpcUrl:"https://fullnode.mainnet.sui.io:443"},
{id:"sui-devnet",label:"Sui Devnet",provider:"sui-public",rpcUrl:"https://fullnode.devnet.sui.io:443"},
{id:"solana-custom",label:"Custom Solana RPC",provider:"custom",rpcUrl:""},
{id:"sui-custom",label:"Custom Sui RPC",provider:"custom",rpcUrl:""}
] as const;
