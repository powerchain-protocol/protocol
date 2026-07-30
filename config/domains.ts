
export const powerchainDomains = {
  website: "https://powerchain.energy",
  api: "https://api.powerchain.energy",
  dashboard: "https://dashboard.powerchain.energy",
  checkout: "https://checkout.powerchain.energy",
  docs: "https://docs.powerchain.energy"
} as const;

export type PowerchainDomain = keyof typeof powerchainDomains;
