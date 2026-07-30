export { PowerChainClient } from "@powerchain/web3.js";
export type { PowerChainClientConfig, PowerChainNetwork } from "@powerchain/web3.js";
export * from "@powerchain/protocol";

export const POWERCHAIN_SDK_VERSION = "1.0.0-beta.1";
export const ENTERPRISE_CAPABILITIES = [
  "wallet", "blockchain", "payments", "treasury", "exchange", "marketplace",
  "energy", "ai", "identity", "audit", "policy-engine",
] as const;

export * from "./generator/index.js";
