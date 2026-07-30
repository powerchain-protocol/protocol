
export const PAYMENT_METHODS = [
  { id: "pwrc", name: "PWRC", description: "Powerchain Token", network: "Solana" },
  { id: "usdc", name: "USDC", description: "USD Coin", network: "Solana" },
  { id: "usdt", name: "USDT", description: "Tether", network: "Solana" },
  { id: "sol", name: "SOL", description: "Solana", network: "Solana" },
  { id: "card", name: "Credit or debit card", description: "Visa and Mastercard", network: "Traditional" },
  { id: "solana-pay", name: "Solana Pay", description: "QR or wallet request", network: "Solana" }
] as const;

export type PaymentMethodId = (typeof PAYMENT_METHODS)[number]["id"];
