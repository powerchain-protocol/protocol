export type IoTReading = { deviceId: string; timestamp: string; metric: "voltage" | "current" | "frequency" | "temperature" | "irradiance"; value: number; unit: string; quality: "verified" | "estimated"; };
export const iotReadings: IoTReading[] = [
  { deviceId: "inverter-001", timestamp: "2026-07-30T08:00:00Z", metric: "voltage", value: 230.4, unit: "V", quality: "verified" },
  { deviceId: "inverter-001", timestamp: "2026-07-30T08:00:00Z", metric: "frequency", value: 50.01, unit: "Hz", quality: "verified" },
  { deviceId: "weather-001", timestamp: "2026-07-30T08:00:00Z", metric: "irradiance", value: 742, unit: "W/m²", quality: "verified" },
];
