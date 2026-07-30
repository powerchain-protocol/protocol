
export const DASHBOARD_ROLES = [
  "SUPER_ADMIN",
  "COMPANY_ADMIN",
  "PROSUMER_MANAGER",
  "PROSUMER",
  "CLIENT_MANAGER",
  "CLIENT_USER",
  "FINANCE_ADMIN",
  "ENERGY_OPERATOR",
  "DEVELOPER",
  "AUDITOR",
  "VIEWER"
] as const;

export type DashboardRole = typeof DASHBOARD_ROLES[number];
