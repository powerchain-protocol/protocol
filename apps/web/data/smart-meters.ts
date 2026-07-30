export type SmartMeter = { id: string; serial: string; owner: string; siteId: string; protocol: "lorawan" | "mqtt" | "modbus"; lastReadingKwh: number; signalQuality: number; status: "online" | "warning" | "offline"; };
export const smartMeters: SmartMeter[] = [
  { id: "meter-001", serial: "PWRC-SM-0001", owner: "Helsinki Energy Coop", siteId: "solar-helsinki-01", protocol: "lorawan", lastReadingKwh: 18234.4, signalQuality: 96, status: "online" },
  { id: "meter-002", serial: "PWRC-SM-0002", owner: "Espoo Wind Collective", siteId: "wind-espoo-01", protocol: "mqtt", lastReadingKwh: 26481.2, signalQuality: 91, status: "online" },
  { id: "meter-003", serial: "PWRC-SM-0003", owner: "Vantaa Storage Oy", siteId: "battery-vantaa-01", protocol: "modbus", lastReadingKwh: 8742.9, signalQuality: 73, status: "warning" },
];
