
import type { FastifyInstance } from "fastify";

export async function depinRoutes(app: FastifyInstance) {
  app.get("/depin/nodes", async () => ({
    data: [
      { id: "node_fi_001", ownerWallet: "PwrcNodeOwner", uptimePercent: 99.98, rewardsAccrued: "4820.55", status: "active" },
      { id: "node_se_002", ownerWallet: "PwrcNodeOwner2", uptimePercent: 98.72, rewardsAccrued: "3150.12", status: "active" }
    ]
  }));
}
