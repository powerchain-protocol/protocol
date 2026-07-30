export type TokenMetadataInput = {
  name: string;
  symbol: string;
  uri: string;
  additionalMetadata?: ReadonlyArray<readonly [string, string]>;
};

export function validateTokenMetadata(input: TokenMetadataInput): TokenMetadataInput {
  const name = input.name.trim();
  const symbol = input.symbol.trim().toUpperCase();
  const uri = input.uri.trim();
  if (!name || name.length > 32) throw new RangeError("Token name must contain 1 to 32 characters.");
  if (!symbol || symbol.length > 10) throw new RangeError("Token symbol must contain 1 to 10 characters.");
  if (!/^https:\/\//.test(uri) && !/^ipfs:\/\//.test(uri) && !uri.startsWith("/")) {
    throw new TypeError("Metadata URI must use HTTPS, IPFS, or an absolute public path.");
  }
  return {...input, name, symbol, uri};
}
