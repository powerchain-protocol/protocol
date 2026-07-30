export type Device = { id: string; name: string; type: "smart-meter" | "gateway" | "inverter" | "sensor" | "charger"; manufacturer: string; firmware: string; siteId: string; status: "online" | "maintenance" | "offline"; };
export const devices: Device[] = [
  { id: "device-001", name: "PowerChain Smart Meter Pro", type: "smart-meter", manufacturer: "PowerChain Hardware", firmware: "3.4.1", siteId: "solar-helsinki-01", status: "online" },
  { id: "device-002", name: "LoRaWAN Energy Gateway", type: "gateway", manufacturer: "Nordic Grid Labs", firmware: "2.8.0", siteId: "wind-espoo-01", status: "online" },
  { id: "device-003", name: "Hybrid Inverter Controller", type: "inverter", manufacturer: "VoltWorks", firmware: "5.2.6", siteId: "battery-vantaa-01", status: "maintenance" },
];
