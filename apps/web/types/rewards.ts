
export type RewardTier = "seed" | "builder" | "operator" | "validator" | "pioneer";

export type RewardEntry = {
  id: string;
  userId: string;
  walletAddress: string;
  displayName: string;
  points: number;
  rank: number;
  tier: RewardTier;
  energyTradedKwh: number;
  carbonRetiredTonnes: number;
  referrals: number;
  streakDays: number;
  updatedAt: string;
};

export type RewardSummary = {
  id: string;
  userId: string;
  points: number;
  availablePwrc: number;
  lifetimePwrc: number;
  tier: RewardTier;
  nextTierPoints: number;
  streakDays: number;
  missionsCompleted: number;
};
