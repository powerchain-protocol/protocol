
import { REWARD_LEADERBOARD } from "@/data/rewards";

export async function GET(request: Request) {
  const userId = new URL(request.url).searchParams.get("userId");
  const entry = REWARD_LEADERBOARD.find((item) => item.userId === userId) ?? REWARD_LEADERBOARD[0];

  return Response.json({
    data: {
      id: `reward_summary_${entry.userId}`,
      userId: entry.userId,
      points: entry.points,
      availablePwrc: entry.points / 20,
      lifetimePwrc: entry.points / 15,
      tier: entry.tier,
      nextTierPoints: 120000,
      streakDays: entry.streakDays,
      missionsCompleted: 18
    }
  });
}
