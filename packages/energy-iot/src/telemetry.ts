import type{MeterReading}from"./types.js";
export const netEnergyKwh=(r:MeterReading)=>Number((r.exportedKwh-r.importedKwh).toFixed(6));
export const isReadingHealthy=(r:MeterReading)=>r.voltage>=180&&r.voltage<=265&&r.powerKw>=0;
export function aggregateReadings(rs:MeterReading[]){return rs.reduce((a,r)=>({importedKwh:a.importedKwh+r.importedKwh,exportedKwh:a.exportedKwh+r.exportedKwh,peakPowerKw:Math.max(a.peakPowerKw,r.powerKw)}),{importedKwh:0,exportedKwh:0,peakPowerKw:0})}
