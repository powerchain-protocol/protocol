
export const solanaInfrastructureConfig={
  defaultNetwork:process.env.SOLANA_NETWORK??"mainnet-beta",
  publicRpcUrl:process.env.SOLANA_RPC_URL??"https://api.mainnet-beta.solana.com",
  heliusApiKey:process.env.HELIUS_API_KEY,
  jupiterApiKey:process.env.JUPITER_API_KEY,
  allowCustomRpc:process.env.ALLOW_CUSTOM_RPC!=="false",
  allowedCustomRpcHosts:(process.env.ALLOWED_CUSTOM_RPC_HOSTS??"localhost,127.0.0.1").split(",").map(v=>v.trim()).filter(Boolean)
} as const;
