
export const DEVICE_CATEGORIES = [
  "smart-meter",
  "solar-inverter",
  "wind-controller",
  "battery-system",
  "ev-charger",
  "grid-sensor",
  "weather-station"
] as const;

export type DeviceCategory = typeof DEVICE_CATEGORIES[number];

export type EnergyDevice = {
  id: string;
  organizationId: string;
  name: string;
  category: DeviceCategory;
  manufacturer: string;
  model: string;
  serialNumber: string;
  status: "online" | "offline" | "maintenance" | "degraded";
  firmwareVersion?: string;
  walletAddress?: string;
  lastSeenAt?: string;
};
