
import type { DashboardPermission } from "./access";
import type { DashboardRole } from "./roles";

export type DashboardServiceId =
  | "overview"
  | "admin"
  | "management"
  | "clients"
  | "prosumers"
  | "users"
  | "crm"
  | "erp"
  | "payments"
  | "marketplace"
  | "renewables"
  | "crowdfunding"
  | "blockchain"
  | "wallet"
  | "iot"
  | "depin"
  | "hardware"
  | "assets"
  | "energy"
  | "analytics"
  | "ai"
  | "integrations"
  | "developers"
  | "settings";

export type DashboardNavItem = {
  id: DashboardServiceId;
  label: string;
  href: string;
  icon: string;
  section: "workspace" | "operations" | "company" | "platform" | "administration";
  permission?: DashboardPermission;
  roles?: DashboardRole[];
  featureFlag?: string;
  badge?: string;
};

export type DashboardFeature = {
  id: string;
  enabled: boolean;
  label: string;
  description: string;
  requiredPermission?: DashboardPermission;
};
