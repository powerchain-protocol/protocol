
import type { AccessCapability, AccessGrant, CompanyRole } from "@/types/access";

const all: AccessCapability[] = [
  "company.manage","users.manage","billing.manage","crm.manage","erp.manage",
  "energy.trade","assets.tokenize","contracts.admin","reports.read","audit.read","zk.verify"
];

export const ACCESS_GRANTS: Record<CompanyRole, AccessGrant> = {
  OWNER: { role:"OWNER", capabilities: all },
  EXECUTIVE: { role:"EXECUTIVE", capabilities:["company.manage","billing.manage","crm.manage","erp.manage","reports.read","audit.read"] },
  FINANCE_ADMIN: { role:"FINANCE_ADMIN", capabilities:["billing.manage","erp.manage","reports.read","audit.read"] },
  ENERGY_MANAGER: { role:"ENERGY_MANAGER", capabilities:["energy.trade","assets.tokenize","reports.read"] },
  GRID_OPERATOR: { role:"GRID_OPERATOR", capabilities:["energy.trade","reports.read"] },
  ASSET_MANAGER: { role:"ASSET_MANAGER", capabilities:["assets.tokenize","reports.read"] },
  SUSTAINABILITY_MANAGER: { role:"SUSTAINABILITY_MANAGER", capabilities:["assets.tokenize","reports.read"] },
  DEVELOPER: { role:"DEVELOPER", capabilities:["reports.read","zk.verify"], requiresZkProof:true },
  ANALYST: { role:"ANALYST", capabilities:["reports.read"] },
  AUDITOR: { role:"AUDITOR", capabilities:["reports.read","audit.read"] },
  VIEWER: { role:"VIEWER", capabilities:["reports.read"] }
};

export function can(role: CompanyRole, capability: AccessCapability) {
  return ACCESS_GRANTS[role].capabilities.includes(capability);
}
