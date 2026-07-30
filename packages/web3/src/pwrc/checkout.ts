import { quotePayment, type PaymentLineItem, type PaymentQuote } from "./payments.js";

export type CheckoutStatus = "open" | "processing" | "paid" | "expired" | "cancelled";
export interface CheckoutSessionInput {
  readonly id: string;
  readonly merchant: string;
  readonly customer?: string;
  readonly items: readonly PaymentLineItem[];
  readonly expiresAt: Date;
  readonly now?: Date;
  readonly maximumFeeBaseUnits?: bigint;
}
export interface CheckoutSessionQuote extends PaymentQuote {
  readonly id: string;
  readonly merchant: string;
  readonly customer?: string;
  readonly status: CheckoutStatus;
  readonly expiresAt: string;
}

export function quoteCheckout(input: CheckoutSessionInput): CheckoutSessionQuote {
  if (!input.id.trim() || !input.merchant.trim()) throw new TypeError("Checkout id and merchant are required");
  if (Number.isNaN(input.expiresAt.getTime())) throw new RangeError("Checkout expiration is invalid");
  const now = input.now ?? new Date();
  const status: CheckoutStatus = input.expiresAt.getTime() <= now.getTime() ? "expired" : "open";
  return {
    id: input.id,
    merchant: input.merchant,
    customer: input.customer,
    status,
    expiresAt: input.expiresAt.toISOString(),
    ...quotePayment(input.items, input.maximumFeeBaseUnits),
  };
}
