
export const TRUSTED_TOKEN_LIST = [
  {
    id: "token_sol",
    symbol: "SOL",
    name: "Solana",
    chain: "solana",
    address: "So11111111111111111111111111111111111111112",
    decimals: 9,
    verified: true,
    tags: ["native", "gas"]
  },
  {
    id: "token_pwrc",
    symbol: "PWRC",
    name: "Powerchain",
    chain: "solana",
    address: "PWRCRXXZxbg6FdQZfK3PMD7KP8xfxs9acvifJiG46wc",
    decimals: 9,
    verified: true,
    tags: ["powerchain", "utility", "energy"]
  },
  {
    id: "token_usdc_sol",
    symbol: "USDC",
    name: "USD Coin",
    chain: "solana",
    address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    decimals: 6,
    verified: true,
    tags: ["stablecoin", "circle"]
  },
  {
    id: "token_usdt_sol",
    symbol: "USDT",
    name: "Tether USD",
    chain: "solana",
    address: "Es9vMFrzaCERmJfrF4H2FYD6VLDnT4bkrT8bWmCywqY",
    decimals: 6,
    verified: true,
    tags: ["stablecoin"]
  },
  {
    id: "token_sui",
    symbol: "SUI",
    name: "Sui",
    chain: "sui",
    address: "0x2::sui::SUI",
    decimals: 9,
    verified: true,
    tags: ["native", "gas"]
  }
] as const;

export type TrustedToken = typeof TRUSTED_TOKEN_LIST[number];

export function getTrustedToken(chain: string, addressOrSymbol: string) {
  const value = addressOrSymbol.toLowerCase();
  return TRUSTED_TOKEN_LIST.find(
    (token) =>
      token.chain === chain &&
      (token.address.toLowerCase() === value || token.symbol.toLowerCase() === value)
  );
}
