export type CurrencyKind = "native" | "wrapped" | "carbon-credit" | "fiat" | "stablecoin";

export interface CurrencyMetadata {
  readonly symbol: string;
  readonly displaySymbol: string;
  readonly name: string;
  readonly decimals: number;
  readonly kind: CurrencyKind;
  readonly network: "powerchain" | "solana" | "sui" | "multi-chain";
  readonly icon: string;
}

export const POWERCHAIN_CURRENCIES = {
  PWRC: {
    symbol: "PWRC",
    displaySymbol: "PWRC",
    name: "Powerchain",
    decimals: 9,
    kind: "native",
    network: "powerchain",
    icon: "./public/currencies/pwrc.svg",
  },
  WPWRC: {
    symbol: "WPWRC",
    displaySymbol: "wPWRC",
    name: "Wrapped Powerchain",
    decimals: 9,
    kind: "wrapped",
    network: "multi-chain",
    icon: "./public/currencies/wpwrc.svg",
  },
  CCT: {
    symbol: "CCT",
    displaySymbol: "CCT",
    name: "Carbon Credit Token",
    decimals: 6,
    kind: "carbon-credit",
    network: "powerchain",
    icon: "./public/currencies/cct.png",
  },
} as const satisfies Record<string, CurrencyMetadata>;

export type PowerchainCurrencyCode = keyof typeof POWERCHAIN_CURRENCIES;

export function getPowerchainCurrency(code: string): CurrencyMetadata | undefined {
  return POWERCHAIN_CURRENCIES[code.toUpperCase() as PowerchainCurrencyCode];
}

export function formatPowerchainAmount(
  amount: bigint | number | string,
  code: PowerchainCurrencyCode,
  locale = "fi-FI",
): string {
  const currency = POWERCHAIN_CURRENCIES[code];
  const numericAmount = typeof amount === "bigint"
    ? Number(amount) / 10 ** currency.decimals
    : Number(amount);

  if (!Number.isFinite(numericAmount)) {
    throw new TypeError(`Invalid ${code} amount: ${String(amount)}`);
  }

  return `${new Intl.NumberFormat(locale, {
    maximumFractionDigits: currency.decimals,
  }).format(numericAmount)} ${currency.displaySymbol}`;
}
