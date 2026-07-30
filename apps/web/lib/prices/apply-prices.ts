
import type { TokenBalance } from "@/types/balances";
import type { AssetPrice } from "./asset-prices";

export function applyPricesToBalances(balances: TokenBalance[], prices: AssetPrice[]) {
  const map = new Map(prices.map((price) => [price.symbol.toUpperCase(), price.priceGbp]));

  return balances.map((balance) => {
    const numericAmount = Number(balance.amount);
    const priceGbp = map.get(balance.symbol.toUpperCase()) ?? 0;
    return {
      ...balance,
      priceGbp,
      valueGbp: Number.isFinite(numericAmount) ? numericAmount * priceGbp : 0
    };
  });
}
