
import { roleCan } from "./roles";
import type { DashboardPermission } from "@/types/access";
import type { DashboardRole } from "@/types/roles";

export function canAccess(role:DashboardRole, permission?:DashboardPermission) {
  return permission ? roleCan(role, permission) : true;
}

export function assertAccess(role:DashboardRole, permission:DashboardPermission) {
  if (!roleCan(role, permission)) {
    throw new Error(`Role ${role} cannot access ${permission}.`);
  }
}
