
export function calculateMarketplaceOrder(input: {
  units: number;
  unitPriceEur: number;
  platformFeeBps?: number;
}) {
  if (!Number.isInteger(input.units) || input.units <= 0) throw new Error("Units must be positive");
  const subtotalEur = input.units * input.unitPriceEur;
  const platformFeeEur = subtotalEur * ((input.platformFeeBps ?? 200) / 10_000);
  return {
    subtotalEur,
    platformFeeEur,
    totalEur: subtotalEur + platformFeeEur
  };
}
