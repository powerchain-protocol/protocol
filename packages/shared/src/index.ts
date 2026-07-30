
export const ROLES = ["owner","admin","operator","analyst","auditor","viewer"] as const;
export type Role = typeof ROLES[number];
export const PERMISSIONS = {
  owner:["*"],
  admin:["dashboard:read","users:manage","assets:write","payments:write","governance:write","ai:use"],
  operator:["dashboard:read","assets:write","payments:write","ai:use"],
  analyst:["dashboard:read","analytics:read","ai:use"],
  auditor:["dashboard:read","audit:read","governance:read"],
  viewer:["dashboard:read"]
} as const;
export function can(role:Role, permission:string){
  const list = PERMISSIONS[role] as readonly string[];
  return list.includes("*") || list.includes(permission);
}

export * from "./iot/devices.js";
export * from "./depin/nodes.js";
export * from "./energy/markets.js";

export * from "./api/contracts.js";
export * from "./routes/definitions.js";
export * from "./errors/application-error.js";
export * from "./security/request-id.js";
