
export type EnergyOrder = {
  id: string;
  side: "buy" | "sell";
  sellerWallet?: string;
  buyerWallet?: string;
  region: string;
  amountKwh: number;
  pricePerKwhGbp: number;
  renewableSource: "solar" | "wind" | "hydro" | "mixed";
  status: "open" | "matched" | "settled" | "cancelled";
  expiresAt: string;
};

export function calculateTradeValue(order: Pick<EnergyOrder, "amountKwh" | "pricePerKwhGbp">) {
  return order.amountKwh * order.pricePerKwhGbp;
}
