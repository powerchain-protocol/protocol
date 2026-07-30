export type DepinNode = { id: string; operator: string; category: "gateway" | "oracle" | "storage" | "compute"; uptimePct: number; rewardsPwrc: number; region: string; };
export const depinNodes: DepinNode[] = [
  { id: "depin-gw-001", operator: "Nordic Grid Labs", category: "gateway", uptimePct: 99.98, rewardsPwrc: 1284, region: "FI-Uusimaa" },
  { id: "depin-oracle-001", operator: "Clean Data Cooperative", category: "oracle", uptimePct: 99.95, rewardsPwrc: 2140, region: "FI-Pirkanmaa" },
  { id: "depin-store-001", operator: "Green Archive", category: "storage", uptimePct: 99.9, rewardsPwrc: 860, region: "SE-Stockholm" },
];
