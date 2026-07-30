import { quoteRwaTrade, tokenizeEnergyOutput, validateRwaTrade, type RwaAsset } from "@powerchain/energy-iot";

export interface RwaClientOptions {
  feeBps?: number;
}

export class RwaClient {
  readonly feeBps: number;
  constructor(options: RwaClientOptions = {}) {
    this.feeBps = options.feeBps ?? 25;
  }
  quote(asset: RwaAsset, units: number, side: "buy" | "sell" = "buy") {
    return quoteRwaTrade(asset, units, side, this.feeBps);
  }
  validate(asset: RwaAsset, units: number) {
    return validateRwaTrade(asset, units);
  }
  tokenizeEnergy = tokenizeEnergyOutput;
}

export * from "@powerchain/energy-iot";
