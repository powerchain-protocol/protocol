import { assertBaseUnitAmount } from "./amounts.js";
import { distributeTransferFee, type FeeDistribution } from "./fees.js";

export interface PwrcTransferRequest {
  readonly sender: string;
  readonly recipient: string;
  readonly amountBaseUnits: bigint;
  readonly idempotencyKey: string;
  readonly memo?: string;
  readonly maximumFeeBaseUnits?: bigint;
}

export interface PwrcTransferQuote extends FeeDistribution {
  readonly sender: string;
  readonly recipient: string;
  readonly idempotencyKey: string;
  readonly memo?: string;
}

function requireIdentifier(value: string, field: string): string {
  const normalized = value.trim();
  if (!normalized) throw new TypeError(`${field} is required`);
  return normalized;
}

export function quotePwrcTransfer(request: PwrcTransferRequest): PwrcTransferQuote {
  const sender = requireIdentifier(request.sender, "sender");
  const recipient = requireIdentifier(request.recipient, "recipient");
  if (sender === recipient) throw new RangeError("Sender and recipient must differ");
  assertBaseUnitAmount(request.amountBaseUnits);
  if (request.amountBaseUnits === 0n) throw new RangeError("Transfer amount must be greater than zero");
  const idempotencyKey = requireIdentifier(request.idempotencyKey, "idempotencyKey");
  const distribution = distributeTransferFee(request.amountBaseUnits, request.maximumFeeBaseUnits);
  return { ...distribution, sender, recipient, idempotencyKey, memo: request.memo?.slice(0, 256) };
}
