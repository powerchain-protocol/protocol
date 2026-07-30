export type TreasuryBucket = "ecosystem" | "development" | "rewards";

export interface TreasuryAllocation {
  readonly ecosystemBasisPoints: number;
  readonly developmentBasisPoints: number;
  readonly rewardsBasisPoints: number;
}

export const DEFAULT_TREASURY_ALLOCATION: TreasuryAllocation = {
  ecosystemBasisPoints: 4_000,
  developmentBasisPoints: 3_000,
  rewardsBasisPoints: 3_000,
};

export function validateTreasuryAllocation(allocation: TreasuryAllocation): void {
  const values = [
    allocation.ecosystemBasisPoints,
    allocation.developmentBasisPoints,
    allocation.rewardsBasisPoints,
  ];
  if (values.some((value) => !Number.isInteger(value) || value < 0)) {
    throw new RangeError("Treasury allocation must use non-negative integer basis points");
  }
  if (values.reduce((sum, value) => sum + value, 0) !== 10_000) {
    throw new RangeError("Treasury allocation must total 10,000 basis points");
  }
}

export function allocateTreasuryRevenue(
  amount: bigint,
  allocation: TreasuryAllocation = DEFAULT_TREASURY_ALLOCATION,
): Readonly<Record<TreasuryBucket, bigint>> {
  if (amount < 0n) throw new RangeError("Treasury revenue cannot be negative");
  validateTreasuryAllocation(allocation);
  const ecosystem = (amount * BigInt(allocation.ecosystemBasisPoints)) / 10_000n;
  const development = (amount * BigInt(allocation.developmentBasisPoints)) / 10_000n;
  return { ecosystem, development, rewards: amount - ecosystem - development };
}
