export const APP_ROLES = [
  "OWNER", "EXECUTIVE", "FINANCE_ADMIN", "ENERGY_MANAGER", "GRID_OPERATOR",
  "ASSET_MANAGER", "SUSTAINABILITY_MANAGER", "DEVELOPER", "ANALYST", "AUDITOR", "VIEWER"
] as const;
export type AppRole = (typeof APP_ROLES)[number];
export type AuthUser = { id: string; email: string; name?: string | null; avatarUrl?: string | null };
export type AuthMembership = { organizationId: string; organizationName: string; role: AppRole };
export type AuthSession = { user: AuthUser; memberships: AuthMembership[]; expiresAt: string };
export const SOURCE_CODE_ROLES: readonly AppRole[] = ["OWNER", "DEVELOPER"];
export function canAccessSource(role?: AppRole | null) { return Boolean(role && SOURCE_CODE_ROLES.includes(role)); }
