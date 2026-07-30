export const PWRC_DECIMALS = 9 as const;
export const PWRC_MAX_SUPPLY_TOKENS = 18_446_000_000n;
export const PWRC_MAX_SUPPLY_BASE_UNITS =
  PWRC_MAX_SUPPLY_TOKENS * 10n ** BigInt(PWRC_DECIMALS);

export const PWRC_INITIAL_REFERENCE_PRICE_USD = "0.000001" as const;
export const PWRC_TRANSFER_FEE_BASIS_POINTS = 200 as const;
export const PWRC_MAX_TRANSFER_FEE_BASE_UNITS = PWRC_MAX_SUPPLY_BASE_UNITS;
export const PWRC_QUARTERLY_BURN_BASIS_POINTS = 200 as const;

export const PWRC_TOKEN_2022_EXTENSIONS = [
  "TransferFeeConfig",
  "MetadataPointer",
  "TokenMetadata",
  "PermanentDelegate",
  "MintCloseAuthority",
] as const;

export const PWRC_SPECIFICATION = {
  name: "PowerChain",
  symbol: "PWRC",
  network: "solana",
  standard: "Token-2022",
  decimals: PWRC_DECIMALS,
  maximumSupplyTokens: PWRC_MAX_SUPPLY_TOKENS,
  maximumSupplyBaseUnits: PWRC_MAX_SUPPLY_BASE_UNITS,
  supplyModel: "fixed",
  initialReferencePriceUsd: PWRC_INITIAL_REFERENCE_PRICE_USD,
  transferFeeBasisPoints: PWRC_TRANSFER_FEE_BASIS_POINTS,
  quarterlyBurnBasisPoints: PWRC_QUARTERLY_BURN_BASIS_POINTS,
  extensions: PWRC_TOKEN_2022_EXTENSIONS,
} as const;

export function tokensToBaseUnits(tokens: bigint): bigint {
  if (tokens < 0n) throw new RangeError("Token amount cannot be negative");
  return tokens * 10n ** BigInt(PWRC_DECIMALS);
}

export function assertValidSupply(supplyBaseUnits: bigint): void {
  if (supplyBaseUnits < 0n || supplyBaseUnits > PWRC_MAX_SUPPLY_BASE_UNITS) {
    throw new RangeError("PWRC supply is outside the fixed-supply boundary");
  }
}
