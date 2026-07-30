export type EnergyMarketStat = { timestamp: string; generatedKwh: number; consumedKwh: number; exportedKwh: number; pricePerKwh: number; carbonAvoidedKg: number; };
export const energyMarketSeries: EnergyMarketStat[] = [
  { timestamp: "2026-07-30T06:00:00Z", generatedKwh: 22500, consumedKwh: 8200, exportedKwh: 14300, pricePerKwh: 0.062, carbonAvoidedKg: 7540 },
  { timestamp: "2026-07-30T07:00:00Z", generatedKwh: 24100, consumedKwh: 9300, exportedKwh: 14800, pricePerKwh: 0.067, carbonAvoidedKg: 8090 },
  { timestamp: "2026-07-30T08:00:00Z", generatedKwh: 26800, consumedKwh: 11200, exportedKwh: 15600, pricePerKwh: 0.076, carbonAvoidedKg: 12180 },
];
export const energySummary = energyMarketSeries.reduce((acc, row) => ({ generatedKwh: acc.generatedKwh + row.generatedKwh, consumedKwh: acc.consumedKwh + row.consumedKwh, exportedKwh: acc.exportedKwh + row.exportedKwh, carbonAvoidedKg: acc.carbonAvoidedKg + row.carbonAvoidedKg }), { generatedKwh: 0, consumedKwh: 0, exportedKwh: 0, carbonAvoidedKg: 0 });
