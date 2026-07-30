import { assertBaseUnitAmount, mulDiv } from "./amounts.js";
import { BASIS_POINTS_DENOMINATOR } from "./fees.js";

export function calculateBasisPoints(amount: bigint, basisPoints: number, rounding: "down" | "up" = "down"): bigint {
  assertBaseUnitAmount(amount);
  if (!Number.isInteger(basisPoints) || basisPoints < 0 || basisPoints > 10_000) {
    throw new RangeError("Basis points must be an integer between 0 and 10,000");
  }
  return mulDiv(amount, BigInt(basisPoints), BASIS_POINTS_DENOMINATOR, rounding);
}

export function checkedAdd(...values: bigint[]): bigint {
  for (const value of values) assertBaseUnitAmount(value);
  return values.reduce((sum, value) => sum + value, 0n);
}

export function checkedSubtract(minuend: bigint, subtrahend: bigint): bigint {
  assertBaseUnitAmount(minuend, "minuend");
  assertBaseUnitAmount(subtrahend, "subtrahend");
  if (subtrahend > minuend) throw new RangeError("Subtraction would produce a negative amount");
  return minuend - subtrahend;
}
