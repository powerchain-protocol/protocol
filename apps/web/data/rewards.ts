
import type { RewardEntry } from "@/types/rewards";

export const REWARD_LEADERBOARD: RewardEntry[] = [
  {
    id: "reward_user_001",
    userId: "usr_001",
    walletAddress: "7hW4...mB3Q",
    displayName: "Nordic Grid Labs",
    points: 98250,
    rank: 1,
    tier: "pioneer",
    energyTradedKwh: 482500,
    carbonRetiredTonnes: 2840,
    referrals: 44,
    streakDays: 126,
    updatedAt: new Date().toISOString()
  },
  {
    id: "reward_user_002",
    userId: "usr_002",
    walletAddress: "2Qr9...L8Fv",
    displayName: "Baltic Wind Coop",
    points: 87410,
    rank: 2,
    tier: "validator",
    energyTradedKwh: 395200,
    carbonRetiredTonnes: 2180,
    referrals: 31,
    streakDays: 93,
    updatedAt: new Date().toISOString()
  },
  {
    id: "reward_user_003",
    userId: "usr_003",
    walletAddress: "9Pq1...dW2K",
    displayName: "Oulu Solar DAO",
    points: 76880,
    rank: 3,
    tier: "validator",
    energyTradedKwh: 324400,
    carbonRetiredTonnes: 1940,
    referrals: 27,
    streakDays: 78,
    updatedAt: new Date().toISOString()
  }
];

export const REWARD_MISSIONS = [
  { id: "mission_trade_100", title: "Trade 100 kWh", rewardPwrc: 25, progress: 72, target: 100 },
  { id: "mission_retire_10", title: "Retire 10 carbon credits", rewardPwrc: 40, progress: 6, target: 10 },
  { id: "mission_streak_7", title: "Maintain a 7-day activity streak", rewardPwrc: 15, progress: 5, target: 7 }
] as const;
