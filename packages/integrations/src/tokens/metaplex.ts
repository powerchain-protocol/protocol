
export type TokenMetadataInput = {
  name: string;
  symbol: string;
  uri: string;
  sellerFeeBasisPoints?: number;
  creators?: Array<{ address: string; verified: boolean; share: number }>;
};

export function buildMetaplexMetadata(input: TokenMetadataInput) {
  return {
    name: input.name,
    symbol: input.symbol,
    uri: input.uri,
    sellerFeeBasisPoints: input.sellerFeeBasisPoints ?? 0,
    creators: input.creators ?? null,
    collection: null,
    uses: null
  };
}
