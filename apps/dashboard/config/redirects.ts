
import { ROLE_RULES } from "./roles";
import type { DashboardRole } from "@/types/roles";

export function dashboardLandingPage(role:DashboardRole) {
  return ROLE_RULES[role].landingPage;
}

export const LEGACY_DASHBOARD_REDIRECTS = {
  "/dashboard/admin": "/admin",
  "/company": "/management",
  "/client-management": "/clients",
  "/prosumer-management": "/prosumers",
  "/team": "/users"
} as const;
