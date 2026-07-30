
export const AI_MODELS = [
  {
    id: "gridllm-large",
    name: "GridLLM Large",
    provider: "powerchain",
    capabilities: ["chat", "tools", "grid-analysis", "portfolio"],
    contextWindow: 128000,
    supportsLora: true,
    supportsMpc: true
  },
  {
    id: "gridllm-fast",
    name: "GridLLM Fast",
    provider: "powerchain",
    capabilities: ["chat", "tools", "search"],
    contextWindow: 64000,
    supportsLora: true,
    supportsMpc: false
  },
  {
    id: "solana-agent",
    name: "Solana Agent",
    provider: "powerchain",
    capabilities: ["solana", "wallet", "swap", "transactions"],
    contextWindow: 32000,
    supportsLora: false,
    supportsMpc: true
  }
] as const;

export const LORA_ADAPTERS = [
  { id: "lora_energy_nordic", name: "Nordic Energy Markets", baseModel: "gridllm-large", status: "ready" },
  { id: "lora_grid_ops", name: "Grid Operations", baseModel: "gridllm-large", status: "ready" },
  { id: "lora_solana_defi", name: "Solana DeFi", baseModel: "gridllm-fast", status: "ready" }
] as const;
