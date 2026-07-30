
import type { FastifyInstance } from "fastify";

export async function rewardRoutes(app: FastifyInstance) {
  app.get("/rewards/leaderboard", async () => ({
    data: [
      { id: "reward_user_001", userId: "usr_001", rank: 1, points: 98250, tier: "pioneer" },
      { id: "reward_user_002", userId: "usr_002", rank: 2, points: 87410, tier: "validator" }
    ]
  }));
}
