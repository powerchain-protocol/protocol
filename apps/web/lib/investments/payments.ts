
export type InvestmentPaymentMethod = "card" | "solana-pay" | "usdc" | "pwrc" | "onramp";

export function calculateInvestment(input: {
  amountEur: number;
  feeBps?: number;
}) {
  if (input.amountEur <= 0) throw new Error("Investment amount must be positive");
  const platformFeeEur = input.amountEur * ((input.feeBps ?? 200) / 10_000);
  return {
    principalEur: input.amountEur,
    platformFeeEur,
    totalEur: input.amountEur + platformFeeEur
  };
}

export function createInvestmentReference(campaignId: string) {
  return `INV-${campaignId}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
}
