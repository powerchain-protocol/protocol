export interface StakingPosition {
  readonly owner: string;
  readonly amount: bigint;
  readonly lockedAtUnix: number;
  readonly unlockAtUnix: number;
  readonly rewardDebt: bigint;
}

export function validateStakingPosition(position: StakingPosition): void {
  if (!position.owner) throw new TypeError("Staking owner is required");
  if (position.amount <= 0n) throw new RangeError("Staked amount must be positive");
  if (position.unlockAtUnix <= position.lockedAtUnix) {
    throw new RangeError("Unlock time must be later than lock time");
  }
  if (position.rewardDebt < 0n) throw new RangeError("Reward debt cannot be negative");
}

export function calculateProRataReward(
  positionAmount: bigint,
  totalStaked: bigint,
  rewardPool: bigint,
): bigint {
  if (positionAmount < 0n || totalStaked <= 0n || rewardPool < 0n) {
    throw new RangeError("Invalid staking reward inputs");
  }
  if (positionAmount > totalStaked) throw new RangeError("Position exceeds total stake");
  return (rewardPool * positionAmount) / totalStaked;
}
