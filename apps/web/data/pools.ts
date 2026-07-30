export type EnergyPool = { id: string; name: string; source: string; liquidityPwrc: number; energyInventoryKwh: number; pricePerKwh: number; utilizationPct: number; };
export const energyPools: EnergyPool[] = [
  { id: "pool-solar-eur", name: "Solar / EUR Energy Pool", source: "solar", liquidityPwrc: 920000, energyInventoryKwh: 184000, pricePerKwh: 0.071, utilizationPct: 68 },
  { id: "pool-wind-pwrc", name: "Wind / PWRC Pool", source: "wind", liquidityPwrc: 1275000, energyInventoryKwh: 238000, pricePerKwh: 0.066, utilizationPct: 74 },
  { id: "pool-battery-flex", name: "Battery Flex Pool", source: "battery", liquidityPwrc: 480000, energyInventoryKwh: 76000, pricePerKwh: 0.089, utilizationPct: 51 },
];
