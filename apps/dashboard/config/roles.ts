
import type { DashboardAccessRule, DashboardPermission } from "@/types/access";
import type { DashboardRole } from "@/types/roles";

const allPermissions: DashboardPermission[] = [
  "dashboard.read","admin.access","companies.read","companies.manage","clients.read","clients.manage",
  "prosumers.read","prosumers.manage","users.read","users.manage","billing.read","billing.manage",
  "energy.read","energy.manage","assets.read","assets.manage","integrations.read","integrations.manage",
  "ai.use","ai.configure","settings.read","settings.manage","audit.read","features.manage"
];

export const ROLE_RULES: Record<DashboardRole, DashboardAccessRule> = {
  SUPER_ADMIN: { role:"SUPER_ADMIN", permissions:allPermissions, landingPage:"/admin" },
  COMPANY_ADMIN: { role:"COMPANY_ADMIN", permissions:[
    "dashboard.read","companies.read","companies.manage","clients.read","clients.manage",
    "prosumers.read","prosumers.manage","users.read","users.manage","billing.read","billing.manage",
    "energy.read","energy.manage","assets.read","assets.manage","integrations.read","integrations.manage",
    "ai.use","settings.read","settings.manage","audit.read"
  ], landingPage:"/management" },
  PROSUMER_MANAGER: { role:"PROSUMER_MANAGER", permissions:[
    "dashboard.read","prosumers.read","prosumers.manage","clients.read","energy.read","energy.manage",
    "assets.read","assets.manage","settings.read"
  ], landingPage:"/prosumers" },
  PROSUMER: { role:"PROSUMER", permissions:[
    "dashboard.read","prosumers.read","energy.read","assets.read","billing.read","settings.read"
  ], landingPage:"/client" },
  CLIENT_MANAGER: { role:"CLIENT_MANAGER", permissions:[
    "dashboard.read","clients.read","clients.manage","users.read","billing.read","energy.read",
    "assets.read","settings.read","settings.manage"
  ], landingPage:"/clients" },
  CLIENT_USER: { role:"CLIENT_USER", permissions:[
    "dashboard.read","clients.read","energy.read","assets.read","billing.read","settings.read"
  ], landingPage:"/client" },
  FINANCE_ADMIN: { role:"FINANCE_ADMIN", permissions:[
    "dashboard.read","billing.read","billing.manage","clients.read","companies.read","audit.read","settings.read"
  ], landingPage:"/erp" },
  ENERGY_OPERATOR: { role:"ENERGY_OPERATOR", permissions:[
    "dashboard.read","energy.read","energy.manage","assets.read","prosumers.read","clients.read","ai.use","settings.read"
  ], landingPage:"/energy" },
  DEVELOPER: { role:"DEVELOPER", permissions:[
    "dashboard.read","integrations.read","ai.use","settings.read"
  ], landingPage:"/developers" },
  AUDITOR: { role:"AUDITOR", permissions:[
    "dashboard.read","companies.read","clients.read","prosumers.read","users.read","billing.read",
    "energy.read","assets.read","integrations.read","settings.read","audit.read"
  ], landingPage:"/analytics" },
  VIEWER: { role:"VIEWER", permissions:["dashboard.read","settings.read"], landingPage:"/" }
};

export function roleCan(role:DashboardRole, permission:DashboardPermission) {
  return ROLE_RULES[role].permissions.includes(permission);
}
