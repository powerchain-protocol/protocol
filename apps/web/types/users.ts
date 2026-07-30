
export type UserAccessRole = "owner" | "admin" | "operator" | "analyst" | "viewer";

export type UserAccount = {
  id: string;
  email: string;
  name: string;
  organizationId: string;
  role: UserAccessRole;
  walletAddresses: string[];
  status: "active" | "invited" | "suspended";
  permissions: string[];
  createdAt: string;
  lastActiveAt?: string;
};

export type UserDashboardData = {
  user: UserAccount;
  portfolioValueEur: number;
  energyTradedKwh: number;
  carbonRetiredTonnes: number;
  rewardsPoints: number;
  recentTransactions: Array<{
    id: string;
    type: "buy" | "sell" | "payment" | "reward" | "retirement";
    amount: string;
    status: string;
    createdAt: string;
  }>;
};
