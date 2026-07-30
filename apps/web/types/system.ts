
export type SystemServiceStatus = "operational" | "degraded" | "maintenance" | "offline";
export type SystemService = {
  id:string; name:string; category:"api"|"blockchain"|"payments"|"ai"|"iot"|"depin";
  status:SystemServiceStatus; latencyMs?:number; updatedAt:string
};
