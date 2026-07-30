
import type { DashboardRole } from "./roles";

export type DashboardPermission =
  | "dashboard.read"
  | "admin.access"
  | "companies.read"
  | "companies.manage"
  | "clients.read"
  | "clients.manage"
  | "prosumers.read"
  | "prosumers.manage"
  | "users.read"
  | "users.manage"
  | "billing.read"
  | "billing.manage"
  | "energy.read"
  | "energy.manage"
  | "assets.read"
  | "assets.manage"
  | "integrations.read"
  | "integrations.manage"
  | "ai.use"
  | "ai.configure"
  | "settings.read"
  | "settings.manage"
  | "audit.read"
  | "features.manage";

export type DashboardAccessRule = {
  role: DashboardRole;
  permissions: DashboardPermission[];
  landingPage: string;
  hiddenFeatures?: string[];
};
