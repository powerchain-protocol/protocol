/** Central release and tooling versions for PowerChain. */
export const versions = Object.freeze({
  release: "1.0.0-beta.1",
  node: ">=22.12.0 <25",
  pnpm: "11.0.0",
  typescript: "7.0.2",
  next: "16.2.12",
  react: "19.2.8",
  prisma: "6.16.1",
} as const);

export type PowerChainVersionKey = keyof typeof versions;
export const POWERCHAIN_VERSION = versions.release;
