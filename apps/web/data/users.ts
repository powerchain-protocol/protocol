
import type { UserDashboardData } from "@/types/users";

export const USER_DASHBOARDS: Record<string, UserDashboardData> = {
  "usr_001": {
    user: {
      id: "usr_001",
      email: "owner@powerchain.example",
      name: "John Doe",
      organizationId: "org_powerchain",
      role: "owner",
      walletAddresses: ["PWRCRXXZxbg6FdQZfK3PMD7KP8xfxs9acvifJiG46wc"],
      status: "active",
      permissions: ["portfolio:read", "payments:create", "trade:create", "users:manage", "rewards:read"],
      createdAt: "2026-01-15T00:00:00.000Z",
      lastActiveAt: new Date().toISOString()
    },
    portfolioValueEur: 48700000,
    energyTradedKwh: 482500,
    carbonRetiredTonnes: 2840,
    rewardsPoints: 98250,
    recentTransactions: [
      { id: "tx_001", type: "buy", amount: "250 kWh", status: "settled", createdAt: new Date().toISOString() },
      { id: "tx_002", type: "reward", amount: "25 PWRC", status: "confirmed", createdAt: new Date().toISOString() }
    ]
  }
};
