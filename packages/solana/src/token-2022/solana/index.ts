import { TOKEN_2022_PROGRAM_ID } from "@solana/spl-token";
export { TOKEN_2022_PROGRAM_ID };
export * from "./extensions/index";

export const PWRC_TOKEN_2022_SPEC = Object.freeze({
  name: "PowerChain",
  symbol: "PWRC",
  decimals: 9,
  maximumSupply: 18_446_000_000n,
  maximumSupplyBaseUnits: 18_446_000_000n * 1_000_000_000n,
  supplyModel: "fixed",
  transferFeeBasisPoints: 200,
} as const);
