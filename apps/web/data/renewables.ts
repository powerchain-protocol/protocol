export type RenewableSource = "solar" | "wind" | "hydro" | "biomass" | "geothermal" | "battery";
export type RenewableSite = { id: string; name: string; source: RenewableSource; capacityKw: number; availableKwh: number; latitude: number; longitude: number; status: "online" | "limited" | "offline"; };
export const renewableSites: RenewableSite[] = [
  { id: "solar-helsinki-01", name: "Helsinki Community Solar", source: "solar", capacityKw: 5200, availableKwh: 18600, latitude: 60.1699, longitude: 24.9384, status: "online" },
  { id: "wind-espoo-01", name: "Espoo Coastal Wind", source: "wind", capacityKw: 8400, availableKwh: 22400, latitude: 60.2055, longitude: 24.6559, status: "online" },
  { id: "battery-vantaa-01", name: "Vantaa Flex Battery", source: "battery", capacityKw: 3100, availableKwh: 9800, latitude: 60.2934, longitude: 25.0378, status: "limited" },
];
