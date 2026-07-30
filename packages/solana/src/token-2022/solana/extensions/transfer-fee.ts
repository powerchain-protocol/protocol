import type { TransferFeePolicy } from "./types";

export const BASIS_POINTS_DENOMINATOR = 10_000n;

export function validateTransferFeePolicy(policy: TransferFeePolicy): void {
  if (!Number.isInteger(policy.basisPoints) || policy.basisPoints < 0 || policy.basisPoints > 10_000) {
    throw new RangeError("Transfer fee basis points must be an integer from 0 to 10,000.");
  }
  if (policy.maximumFeeBaseUnits < 0n) {
    throw new RangeError("Maximum transfer fee cannot be negative.");
  }
}

/** Token-2022 compatible ceiling division, capped by maximumFeeBaseUnits. */
export function calculateTransferFee(amountBaseUnits: bigint, policy: TransferFeePolicy): bigint {
  if (amountBaseUnits < 0n) throw new RangeError("Transfer amount cannot be negative.");
  validateTransferFeePolicy(policy);
  if (amountBaseUnits === 0n || policy.basisPoints === 0) return 0n;

  const numerator = amountBaseUnits * BigInt(policy.basisPoints);
  const fee = (numerator + BASIS_POINTS_DENOMINATOR - 1n) / BASIS_POINTS_DENOMINATOR;
  return fee > policy.maximumFeeBaseUnits ? policy.maximumFeeBaseUnits : fee;
}

export function calculateNetTransferAmount(amountBaseUnits: bigint, policy: TransferFeePolicy): bigint {
  const fee = calculateTransferFee(amountBaseUnits, policy);
  return amountBaseUnits - fee;
}
