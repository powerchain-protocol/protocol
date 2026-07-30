
import type { DashboardRole } from "@/types/roles";

export const AI_DASHBOARD_CONFIG = {
  enabled: true,
  assistantName: "Powerchain AI",
  allowedRoles: ["SUPER_ADMIN","COMPANY_ADMIN","PROSUMER_MANAGER","ENERGY_OPERATOR","DEVELOPER"] as DashboardRole[],
  features: {
    operationalInsights: true,
    clientRiskAnalysis: true,
    prosumerForecasts: true,
    contractReview: true,
    autonomousActions: false
  },
  requireConfirmationFor: ["energy-order","role-change","treasury-transfer","contract-upgrade"]
} as const;
