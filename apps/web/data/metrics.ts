export type PlatformMetric = {
  id: string;
  label: string;
  value: number;
  unit: string;
  changePct: number;
  updatedAt: string;
};

export const platformMetrics: PlatformMetric[] = [
  { id: "renewable-capacity", label: "Connected renewable capacity", value: 84.7, unit: "MW", changePct: 12.4, updatedAt: "2026-07-30T08:00:00Z" },
  { id: "energy-traded", label: "P2P energy traded", value: 12640, unit: "MWh", changePct: 18.9, updatedAt: "2026-07-30T08:00:00Z" },
  { id: "active-devices", label: "Active DePIN devices", value: 18420, unit: "devices", changePct: 9.2, updatedAt: "2026-07-30T08:00:00Z" },
  { id: "carbon-avoided", label: "Verified carbon avoided", value: 9320, unit: "tCO₂e", changePct: 15.1, updatedAt: "2026-07-30T08:00:00Z" },
];
