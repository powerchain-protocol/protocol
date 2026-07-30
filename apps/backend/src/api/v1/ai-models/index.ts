
import type { FastifyInstance } from "fastify";

export async function aiModelRoutes(app: FastifyInstance) {
  app.get("/ai/models", async () => ({
    data: [
      { id: "gridllm-large", provider: "powerchain", supportsLora: true, supportsMpc: true, contextWindow: 128000 },
      { id: "gridllm-fast", provider: "powerchain", supportsLora: true, supportsMpc: false, contextWindow: 64000 },
      { id: "solana-agent", provider: "powerchain", supportsLora: false, supportsMpc: true, contextWindow: 32000 }
    ]
  }));

  app.get("/ai/agents", async () => ({
    data: [
      { id: "agent_grid_operator", model: "gridllm-large", status: "available" },
      { id: "agent_treasury", model: "gridllm-large", status: "available" },
      { id: "agent_solana", model: "solana-agent", status: "available" }
    ]
  }));
}
