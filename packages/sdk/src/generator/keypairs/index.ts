export type GeneratorKeypairMetadata = { id: string; publicKey: string; label: string; createdAt: string };
export function isSolanaPublicKey(value: string): boolean { return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(value); }
export function buildFaucetUrl(baseUrl: string, publicKey: string): string { const url = new URL("/faucets", baseUrl); url.searchParams.set("wallet", publicKey); return url.toString(); }
export function buildRewardsUrl(baseUrl: string, publicKey: string): string { const url = new URL("/rewards", baseUrl); url.searchParams.set("wallet", publicKey); return url.toString(); }
