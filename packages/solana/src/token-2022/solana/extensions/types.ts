export const PWRC_TOKEN_2022_EXTENSIONS = [
  "TransferFeeConfig",
  "MetadataPointer",
  "TokenMetadata",
  "PermanentDelegate",
  "MintCloseAuthority",
] as const;

export type PwrcToken2022Extension = (typeof PWRC_TOKEN_2022_EXTENSIONS)[number];

export type TransferFeePolicy = {
  basisPoints: number;
  maximumFeeBaseUnits: bigint;
};

export type Token2022ExtensionConfig = {
  transferFee: TransferFeePolicy;
  metadataAddress?: string;
  permanentDelegate?: string;
  closeAuthority?: string;
};
