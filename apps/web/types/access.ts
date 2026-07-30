
export const COMPANY_ROLES = [
  "OWNER",
  "EXECUTIVE",
  "FINANCE_ADMIN",
  "ENERGY_MANAGER",
  "GRID_OPERATOR",
  "ASSET_MANAGER",
  "SUSTAINABILITY_MANAGER",
  "DEVELOPER",
  "ANALYST",
  "AUDITOR",
  "VIEWER"
] as const;

export type CompanyRole = typeof COMPANY_ROLES[number];

export type AccessCapability =
  | "company.manage"
  | "users.manage"
  | "billing.manage"
  | "crm.manage"
  | "erp.manage"
  | "energy.trade"
  | "assets.tokenize"
  | "contracts.admin"
  | "reports.read"
  | "audit.read"
  | "zk.verify";

export type AccessGrant = {
  role: CompanyRole;
  capabilities: AccessCapability[];
  requiresZkProof?: boolean;
};
