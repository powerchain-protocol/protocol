
export function calculateEnergyTrade(input: {
  amountKwh: number;
  pricePerKwh: number;
  platformFeeBps?: number;
}) {
  const gross = input.amountKwh * input.pricePerKwh;
  const fee = gross * ((input.platformFeeBps ?? 200) / 10_000);
  return {
    gross,
    fee,
    sellerReceives: gross - fee,
    buyerPays: gross
  };
}

export function calculateCarbonAvoided(input: {
  renewableKwh: number;
  gridIntensityKgPerKwh: number;
}) {
  return input.renewableKwh * input.gridIntensityKgPerKwh;
}
