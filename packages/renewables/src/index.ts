
import { z } from "zod";

export const renewableAssetSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(["solar", "wind", "hydro", "battery", "geothermal", "biomass"]),
  country: z.string().length(2),
  capacityMw: z.number().positive(),
  currentOutputMw: z.number().nonnegative(),
  annualGenerationMwh: z.number().nonnegative(),
  avoidedCarbonTonnes: z.number().nonnegative(),
  status: z.enum(["development", "construction", "operational", "maintenance", "retired"]),
  tokenAddress: z.string().optional()
});

export type RenewableAsset = z.infer<typeof renewableAssetSchema>;

export type RenewableSummary = {
  capacityMw: number;
  currentOutputMw: number;
  annualGenerationMwh: number;
  avoidedCarbonTonnes: number;
  operationalAssets: number;
};

export function summarizeRenewables(assets: RenewableAsset[]): RenewableSummary {
  return assets.reduce((summary, asset) => ({
    capacityMw: summary.capacityMw + asset.capacityMw,
    currentOutputMw: summary.currentOutputMw + asset.currentOutputMw,
    annualGenerationMwh: summary.annualGenerationMwh + asset.annualGenerationMwh,
    avoidedCarbonTonnes: summary.avoidedCarbonTonnes + asset.avoidedCarbonTonnes,
    operationalAssets: summary.operationalAssets + Number(asset.status === "operational")
  }), {capacityMw:0,currentOutputMw:0,annualGenerationMwh:0,avoidedCarbonTonnes:0,operationalAssets:0});
}

export interface RenewableTelemetryProvider {
  name: string;
  fetchCurrentOutput(assetId: string, signal?: AbortSignal): Promise<{ outputMw:number; recordedAt:string }>;
}

export * from "./pools.js";
export * from "./rentals.js";
export * from "./token-use-cases.js";
