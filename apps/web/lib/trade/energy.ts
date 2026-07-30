
export function calculateEnergyOrder(input: {
  side: "buy" | "sell";
  amountKwh: number;
  pricePerKwhEur: number;
  platformFeeBps?: number;
}) {
  if (input.amountKwh <= 0 || input.pricePerKwhEur <= 0) throw new Error("Amount and price must be positive");
  const grossEur = input.amountKwh * input.pricePerKwhEur;
  const platformFeeEur = grossEur * ((input.platformFeeBps ?? 200) / 10_000);
  return {
    grossEur,
    platformFeeEur,
    buyerPaysEur: input.side === "buy" ? grossEur + platformFeeEur : grossEur,
    sellerReceivesEur: input.side === "sell" ? grossEur - platformFeeEur : grossEur
  };
}
