export type TokenNetwork = "powerchain" | "solana" | "sui" | "multi-chain";

export interface TokenMetadata {
  readonly standard?: "Token-2022" | "SPL" | "Move";
  readonly maximumSupply?: bigint;
  readonly supplyModel?: "fixed" | "variable";
  readonly initialReferencePriceUsd?: string;
  readonly symbol: string;
  readonly displaySymbol: string;
  readonly name: string;
  readonly decimals: number;
  readonly network: TokenNetwork;
  readonly icon: string;
  readonly verified: boolean;
  readonly mint?: string;
  readonly contractAddress?: string;
}

/**
 * Canonical Powerchain token metadata.
 *
 * Mainnet addresses are intentionally omitted until they are published and
 * verified. Consumers must not infer an address from the symbol alone.
 */
export const TOKENS = {
  PWRC: {
    symbol: "PWRC",
    displaySymbol: "PWRC",
    name: "Powerchain",
    decimals: 9,
    network: "solana",
    standard: "Token-2022",
    maximumSupply: 18_446_000_000n,
    supplyModel: "fixed",
    initialReferencePriceUsd: "0.000001",
    icon: "./public/tokens/pwrc.svg",
    verified: true,
  },
  WPWRC: {
    symbol: "WPWRC",
    displaySymbol: "wPWRC",
    name: "Wrapped Powerchain",
    decimals: 9,
    network: "multi-chain",
    icon: "./public/tokens/wpwrc.svg",
    verified: true,
  },
  CCT: {
    symbol: "CCT",
    displaySymbol: "CCT",
    name: "Carbon Credit Token",
    decimals: 6,
    network: "powerchain",
    icon: "./public/tokens/cct.png",
    verified: true,
  },
  USDC: {
    symbol: "USDC",
    displaySymbol: "USDC",
    name: "USD Coin",
    decimals: 6,
    network: "solana",
    icon: "",
    verified: false,
  },
  USDT: {
    symbol: "USDT",
    displaySymbol: "USDT",
    name: "Tether",
    decimals: 6,
    network: "solana",
    icon: "",
    verified: false,
  },
  SOL: {
    symbol: "SOL",
    displaySymbol: "SOL",
    name: "Solana",
    decimals: 9,
    network: "solana",
    icon: "",
    verified: false,
  },
} as const satisfies Record<string, TokenMetadata>;

export type TokenSymbol = keyof typeof TOKENS;

export function getToken(symbol: string): TokenMetadata | undefined {
  const normalized = symbol.toUpperCase() === "WPWRC" ? "WPWRC" : symbol.toUpperCase();
  return TOKENS[normalized as TokenSymbol];
}

export function requireToken(symbol: string): TokenMetadata {
  const token = getToken(symbol);
  if (!token) throw new RangeError(`Unsupported token symbol: ${symbol}`);
  return token;
}
