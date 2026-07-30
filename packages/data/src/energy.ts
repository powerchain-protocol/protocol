
export type EnergyReading = {
  id: string;
  deviceId: string;
  timestamp: string;
  productionKwh: number;
  consumptionKwh: number;
  exportedKwh: number;
  importedKwh: number;
  voltage?: number;
  frequency?: number;
  carbonIntensity?: number;
};

export function calculateNetEnergy(reading: EnergyReading) {
  return reading.productionKwh - reading.consumptionKwh;
}
