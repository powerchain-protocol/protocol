
export type AgentDefinition = {
  id: string;
  name: string;
  description: string;
  model: string;
  skills: string[];
  tools: string[];
  requiresMpc: boolean;
};

export const AGENTS: AgentDefinition[] = [
  {
    id: "agent_grid_operator",
    name: "Grid Operator",
    description: "Analyzes telemetry, grid constraints, alarms, and local energy balancing.",
    model: "gridllm-large",
    skills: ["grid-analysis", "alarm-triage", "energy-forecasting"],
    tools: ["search_locations", "get_device_telemetry", "get_market_rates"],
    requiresMpc: false
  },
  {
    id: "agent_treasury",
    name: "Treasury Agent",
    description: "Reviews wallets, transactions, platform fees, and treasury risk.",
    model: "gridllm-large",
    skills: ["portfolio-analysis", "transaction-review", "risk-controls"],
    tools: ["get_balances", "get_transactions", "simulate_transfer"],
    requiresMpc: true
  },
  {
    id: "agent_solana",
    name: "Solana Execution Agent",
    description: "Builds safe Solana payment, swap, and settlement transactions.",
    model: "solana-agent",
    skills: ["solana-transactions", "jupiter-routing", "wallet-compatibility"],
    tools: ["quote_swap", "build_transaction", "verify_signature"],
    requiresMpc: true
  }
];
