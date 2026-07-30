export type RoundingMode = "down" | "up" | "half-up";

export function pow10(decimals: number): bigint {
  if (!Number.isInteger(decimals) || decimals < 0 || decimals > 30) {
    throw new RangeError("Decimals must be an integer between 0 and 30");
  }
  return 10n ** BigInt(decimals);
}

export function mulDiv(
  multiplicand: bigint,
  multiplier: bigint,
  divisor: bigint,
  rounding: RoundingMode = "down",
): bigint {
  if (divisor <= 0n) throw new RangeError("Divisor must be positive");
  if (multiplicand < 0n || multiplier < 0n) {
    throw new RangeError("mulDiv only accepts non-negative values");
  }
  const product = multiplicand * multiplier;
  const quotient = product / divisor;
  const remainder = product % divisor;
  if (remainder === 0n || rounding === "down") return quotient;
  if (rounding === "up") return quotient + 1n;
  return remainder * 2n >= divisor ? quotient + 1n : quotient;
}

export function parseDecimalAmount(value: string, decimals: number): bigint {
  const normalized = value.trim();
  if (!/^(?:0|[1-9]\d*)(?:\.\d+)?$/.test(normalized)) {
    throw new TypeError("Amount must be a non-negative plain decimal string");
  }
  const [whole, fraction = ""] = normalized.split(".");
  if (fraction.length > decimals) {
    throw new RangeError(`Amount has more than ${decimals} decimal places`);
  }
  return BigInt(whole) * pow10(decimals) + BigInt((fraction + "0".repeat(decimals)).slice(0, decimals) || "0");
}

export function formatDecimalAmount(
  baseUnits: bigint,
  decimals: number,
  options: { trimTrailingZeros?: boolean; minimumFractionDigits?: number } = {},
): string {
  if (baseUnits < 0n) throw new RangeError("Amount cannot be negative");
  const scale = pow10(decimals);
  const whole = baseUnits / scale;
  let fraction = (baseUnits % scale).toString().padStart(decimals, "0");
  const minimum = options.minimumFractionDigits ?? 0;
  if (!Number.isInteger(minimum) || minimum < 0 || minimum > decimals) {
    throw new RangeError("minimumFractionDigits is outside the supported decimal range");
  }
  if (options.trimTrailingZeros !== false) {
    while (fraction.length > minimum && fraction.endsWith("0")) fraction = fraction.slice(0, -1);
  }
  return fraction.length ? `${whole}.${fraction}` : whole.toString();
}

export function assertBaseUnitAmount(value: bigint, field = "amount"): void {
  if (value < 0n) throw new RangeError(`${field} cannot be negative`);
}
