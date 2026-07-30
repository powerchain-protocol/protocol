
import type { EnergyLocation } from "@/types/locations";

export const ENERGY_LOCATIONS: EnergyLocation[] = [
  {
    id: "loc_solar_oulu_01",
    slug: "oulu-solar-one",
    name: "Oulu Solar One",
    category: "solar-farm",
    position: { latitude: 65.0121, longitude: 25.4651 },
    address: "Aurinkotie 12",
    municipality: "Oulu",
    countryCode: "FI",
    capacityMw: 48.2,
    status: "online",
    renewableSharePercent: 100,
    operator: "Powerchain Nordic",
    tags: ["solar", "utility-scale", "verified"],
    updatedAt: new Date().toISOString()
  },
  {
    id: "loc_wind_vaasa_01",
    slug: "vaasa-offshore-wind",
    name: "Vaasa Offshore Wind",
    category: "wind-farm",
    position: { latitude: 63.0951, longitude: 21.6165 },
    address: "Kvarken Energy Zone",
    municipality: "Vaasa",
    countryCode: "FI",
    capacityMw: 126.5,
    status: "online",
    renewableSharePercent: 100,
    operator: "Baltic Wind Cooperative",
    tags: ["wind", "offshore", "grid-balancing"],
    updatedAt: new Date().toISOString()
  },
  {
    id: "loc_grid_tampere_01",
    slug: "tampere-grid-hub",
    name: "Tampere Grid Hub",
    category: "power-station",
    position: { latitude: 61.4978, longitude: 23.761 },
    address: "Verkkokatu 8",
    municipality: "Tampere",
    countryCode: "FI",
    capacityMw: 240,
    status: "online",
    renewableSharePercent: 78,
    operator: "Finnish Local Grid",
    tags: ["substation", "settlement", "telemetry"],
    updatedAt: new Date().toISOString()
  },
  {
    id: "loc_ev_helsinki_01",
    slug: "helsinki-ev-superhub",
    name: "Helsinki EV Superhub",
    category: "ev-station",
    position: { latitude: 60.1699, longitude: 24.9384 },
    address: "Latausaukio 4",
    municipality: "Helsinki",
    countryCode: "FI",
    availableKw: 2400,
    status: "online",
    renewableSharePercent: 94,
    operator: "Powercharge Finland",
    tags: ["ev", "fast-charging", "local-energy"],
    updatedAt: new Date().toISOString()
  },
  {
    id: "loc_battery_espoo_01",
    slug: "espoo-battery-reserve",
    name: "Espoo Battery Reserve",
    category: "battery-site",
    position: { latitude: 60.2055, longitude: 24.6559 },
    address: "Varastokuja 5",
    municipality: "Espoo",
    countryCode: "FI",
    capacityMw: 32,
    status: "online",
    renewableSharePercent: 89,
    operator: "Nordic Storage Oy",
    tags: ["battery", "frequency-reserve", "balancing"],
    updatedAt: new Date().toISOString()
  },
  {
    id: "loc_local_turku_01",
    slug: "turku-local-energy-market",
    name: "Turku Local Energy Market",
    category: "local-energy",
    position: { latitude: 60.4518, longitude: 22.2666 },
    address: "Energiatori 1",
    municipality: "Turku",
    countryCode: "FI",
    capacityMw: 14.5,
    status: "online",
    renewableSharePercent: 91,
    operator: "Turku Energy Community",
    tags: ["p2p", "community", "local-market"],
    updatedAt: new Date().toISOString()
  }
];

export const LOCATION_CATEGORIES = [
  { id: "all", label: "All locations" },
  { id: "power-station", label: "Power stations" },
  { id: "ev-station", label: "EV stations" },
  { id: "solar-farm", label: "Solar farms" },
  { id: "wind-farm", label: "Wind farms" },
  { id: "battery-site", label: "Storage" },
  { id: "local-energy", label: "Local energy" }
] as const;
