
export type ApiResponse<T> = { data: T; requestId: string };
export type PortfolioAsset = {
  symbol: string;
  name: string;
  valueGbp: number;
  change24h: number;
  allocation: number;
};
export type MarketQuote = {
  symbol: string;
  price: number;
  change24h: number;
  source: "pyth" | "jupiter" | "birdeye" | "raydium";
};
export type WalletNetwork = "solana" | "sui" | "evm";
