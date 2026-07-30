
export type WalletCapability =
  | "connect"
  | "disconnect"
  | "signMessage"
  | "signTransaction"
  | "signAllTransactions";

export type CompatibleWallet = {
  id: string;
  name: string;
  installed: boolean;
  readyState: string;
  capabilities: WalletCapability[];
};

export function inspectSolanaWallets(wallets: Array<{
  adapter: {
    name: string;
    readyState: string;
    connect?: unknown;
    disconnect?: unknown;
    signMessage?: unknown;
    signTransaction?: unknown;
    signAllTransactions?: unknown;
  };
}>): CompatibleWallet[] {
  return wallets.map(({ adapter }) => ({
    id: adapter.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    name: adapter.name,
    installed: adapter.readyState === "Installed" || adapter.readyState === "Loadable",
    readyState: adapter.readyState,
    capabilities: [
      typeof adapter.connect === "function" ? "connect" : null,
      typeof adapter.disconnect === "function" ? "disconnect" : null,
      typeof adapter.signMessage === "function" ? "signMessage" : null,
      typeof adapter.signTransaction === "function" ? "signTransaction" : null,
      typeof adapter.signAllTransactions === "function" ? "signAllTransactions" : null
    ].filter((value): value is WalletCapability => value !== null)
  }));
}
