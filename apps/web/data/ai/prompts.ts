
import type { SavedPrompt } from "@/types/prompts.messages";

export const DEFAULT_SAVED_PROMPTS: SavedPrompt[] = [
  {
    id: "prompt_portfolio_risk",
    title: "Portfolio risk review",
    content: "Review my renewable asset portfolio and identify concentration, liquidity, and operational risks.",
    category: "portfolio",
    favorite: true,
    createdAt: "2026-07-30T00:00:00.000Z",
    updatedAt: "2026-07-30T00:00:00.000Z"
  },
  {
    id: "prompt_grid_alarm",
    title: "Explain grid alarms",
    content: "Summarize current grid alarms, rank them by severity, and recommend operational actions.",
    category: "grid",
    favorite: true,
    createdAt: "2026-07-30T00:00:00.000Z",
    updatedAt: "2026-07-30T00:00:00.000Z"
  },
  {
    id: "prompt_solana_swap",
    title: "Analyze Solana swap",
    content: "Compare available Solana swap routes, price impact, fees, and MEV protection.",
    category: "solana",
    favorite: false,
    createdAt: "2026-07-30T00:00:00.000Z",
    updatedAt: "2026-07-30T00:00:00.000Z"
  }
];

export const QUICK_PROMPTS = [
  "Summarize today's renewable production",
  "Find underperforming devices",
  "Explain my latest transactions",
  "Show nearby EV charging stations",
  "Review treasury exposure"
] as const;
