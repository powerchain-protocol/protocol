
import type { DashboardRole } from "@/types/roles";

export const DASHBOARD_RULES = {
  defaultRole: "VIEWER" as DashboardRole,
  superAdminRoles: ["SUPER_ADMIN"] as DashboardRole[],
  companyAdminRoles: ["SUPER_ADMIN","COMPANY_ADMIN"] as DashboardRole[],
  clientRoles: ["CLIENT_MANAGER","CLIENT_USER","PROSUMER_MANAGER","PROSUMER"] as DashboardRole[],
  editableRoleAssignments: {
    SUPER_ADMIN: ["SUPER_ADMIN","COMPANY_ADMIN","PROSUMER_MANAGER","PROSUMER","CLIENT_MANAGER","CLIENT_USER","FINANCE_ADMIN","ENERGY_OPERATOR","DEVELOPER","AUDITOR","VIEWER"],
    COMPANY_ADMIN: ["PROSUMER_MANAGER","PROSUMER","CLIENT_MANAGER","CLIENT_USER","FINANCE_ADMIN","ENERGY_OPERATOR","DEVELOPER","AUDITOR","VIEWER"]
  } as Partial<Record<DashboardRole,DashboardRole[]>>
};
