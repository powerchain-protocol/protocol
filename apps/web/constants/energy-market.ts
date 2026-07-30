import type { EnergyProject, LocalEnergyMarket } from "@/types/energy-market";

export const ENERGY_MARKETS: readonly LocalEnergyMarket[] = [
  { id:"helsinki-solar", name:"Helsinki Solar Cooperative", region:"Uusimaa", country:"Finland", latitude:60.1699, longitude:24.9384, source:"solar", availableKwh:1840, pricePerKwh:0.12, currency:"EUR", carbonIntensity:18, distanceKm:4.2, status:"open", verifiedMeters:42 },
  { id:"espoo-wind", name:"Espoo Community Wind", region:"Uusimaa", country:"Finland", latitude:60.2055, longitude:24.6559, source:"wind", availableKwh:3210, pricePerKwh:0.10, currency:"EUR", carbonIntensity:11, distanceKm:15.6, status:"open", verifiedMeters:68 },
  { id:"vantaa-biogas", name:"Vantaa Circular Energy", region:"Uusimaa", country:"Finland", latitude:60.2934, longitude:25.0378, source:"biogas", availableKwh:980, pricePerKwh:0.14, currency:"EUR", carbonIntensity:34, distanceKm:19.1, status:"balancing", verifiedMeters:27 },
  { id:"porvoo-hydro", name:"Porvoo Local Hydro Pool", region:"Uusimaa", country:"Finland", latitude:60.3932, longitude:25.6639, source:"hydro", availableKwh:2450, pricePerKwh:0.11, currency:"EUR", carbonIntensity:9, distanceKm:51.7, status:"open", verifiedMeters:31 },
  { id:"kirkkonummi-battery", name:"Kirkkonummi Flex Battery", region:"Uusimaa", country:"Finland", latitude:60.1238, longitude:24.4385, source:"battery", availableKwh:740, pricePerKwh:0.16, currency:"EUR", carbonIntensity:22, distanceKm:29.8, status:"open", verifiedMeters:16 },
];

export const ENERGY_PROJECTS: readonly EnergyProject[] = [
  { id:"school-solar-01", title:"Solar roof for Kallio community school", location:"Helsinki, Finland", source:"solar", target:85000, raised:52750, currency:"EUR", contributors:319, impact:"76 MWh clean electricity annually", verified:true },
  { id:"village-battery-02", title:"Resilience battery for coastal homes", location:"Espoo, Finland", source:"battery", target:120000, raised:86400, currency:"EUR", contributors:184, impact:"420 homes with peak-hour flexibility", verified:true },
  { id:"farm-biogas-03", title:"Cooperative farm biogas digester", location:"Porvoo, Finland", source:"biogas", target:210000, raised:94500, currency:"EUR", contributors:271, impact:"1,100 tonnes of organic waste diverted", verified:true },
];

export const ENERGY_SOURCE_LABELS = { solar:"Solar", wind:"Wind", hydro:"Hydro", battery:"Battery", biogas:"Biogas" } as const;
