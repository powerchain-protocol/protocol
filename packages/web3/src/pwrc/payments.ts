import { assertBaseUnitAmount } from "./amounts.js";
import { checkedAdd } from "./calculations.js";
import { distributeTransferFee } from "./fees.js";

export interface PaymentLineItem {
  readonly id: string;
  readonly unitAmountBaseUnits: bigint;
  readonly quantity: bigint;
}
export interface PaymentQuote {
  readonly subtotalBaseUnits: bigint;
  readonly transferFeeBaseUnits: bigint;
  readonly treasuryFeeBaseUnits: bigint;
  readonly stakingFeeBaseUnits: bigint;
  readonly totalBaseUnits: bigint;
}

export function calculatePaymentSubtotal(items: readonly PaymentLineItem[]): bigint {
  if (items.length === 0) throw new RangeError("A payment requires at least one line item");
  return checkedAdd(...items.map((item) => {
    if (!item.id.trim()) throw new TypeError("Line item id is required");
    assertBaseUnitAmount(item.unitAmountBaseUnits, "unitAmountBaseUnits");
    if (item.quantity <= 0n) throw new RangeError("Line item quantity must be positive");
    return item.unitAmountBaseUnits * item.quantity;
  }));
}

export function quotePayment(items: readonly PaymentLineItem[], maximumFeeBaseUnits?: bigint): PaymentQuote {
  const subtotalBaseUnits = calculatePaymentSubtotal(items);
  const fee = distributeTransferFee(subtotalBaseUnits, maximumFeeBaseUnits);
  return {
    subtotalBaseUnits,
    transferFeeBaseUnits: fee.protocolFee,
    treasuryFeeBaseUnits: fee.treasuryAmount,
    stakingFeeBaseUnits: fee.stakingAmount,
    totalBaseUnits: subtotalBaseUnits,
  };
}
