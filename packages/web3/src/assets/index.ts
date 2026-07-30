/** Public asset paths shipped with @powerchain/web3. */
export const POWERCHAIN_ASSETS = {
  brand: {
    powerchain: "./public/icons/powerchain.svg",
  },
  tokens: {
    PWRC: "./public/tokens/pwrc.svg",
    WPWRC: "./public/tokens/wpwrc.svg",
    CCT: "./public/tokens/cct.png",
  },
  currencies: {
    PWRC: "./public/currencies/pwrc.svg",
    WPWRC: "./public/currencies/wpwrc.svg",
    CCT: "./public/currencies/cct.png",
  },
} as const;

export type PowerchainAssetGroup = keyof typeof POWERCHAIN_ASSETS;
