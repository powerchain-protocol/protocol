import { mulDiv } from "./amounts.js";
import { PWRC_TRANSFER_FEE_BASIS_POINTS } from "./specification.js";

export const BASIS_POINTS_DENOMINATOR = 10_000n;
export const TREASURY_FEE_SHARE_BASIS_POINTS = 7_000 as const;
export const STAKING_FEE_SHARE_BASIS_POINTS = 3_000 as const;

export interface FeeDistribution {
  readonly grossAmount: bigint;
  readonly protocolFee: bigint;
  readonly treasuryAmount: bigint;
  readonly stakingAmount: bigint;
  readonly netAmount: bigint;
}

/** Token-2022 transfer fees round fractional base units upward and are then capped. */
export function calculateTransferFee(amount: bigint, maximumFee?: bigint): bigint {
  if (amount < 0n) throw new RangeError("Transfer amount cannot be negative");
  if (maximumFee !== undefined && maximumFee < 0n) throw new RangeError("Maximum fee cannot be negative");
  if (amount === 0n) return 0n;
  const calculated = mulDiv(
    amount,
    BigInt(PWRC_TRANSFER_FEE_BASIS_POINTS),
    BASIS_POINTS_DENOMINATOR,
    "up",
  );
  return maximumFee === undefined || calculated <= maximumFee ? calculated : maximumFee;
}

export function distributeTransferFee(amount: bigint, maximumFee?: bigint): FeeDistribution {
  const protocolFee = calculateTransferFee(amount, maximumFee);
  const treasuryAmount = mulDiv(
    protocolFee,
    BigInt(TREASURY_FEE_SHARE_BASIS_POINTS),
    BASIS_POINTS_DENOMINATOR,
    "down",
  );
  const stakingAmount = protocolFee - treasuryAmount;
  return { grossAmount: amount, protocolFee, treasuryAmount, stakingAmount, netAmount: amount - protocolFee };
}
