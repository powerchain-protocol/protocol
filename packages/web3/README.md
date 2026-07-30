# @powerchain/web3.js

Powerchain Web3 SDK utilities, network integrations, canonical token metadata,
currency formatting, and public brand assets.

## Token and currency registry

```ts
import {
  POWERCHAIN_ASSETS,
  POWERCHAIN_CURRENCIES,
  TOKENS,
  formatPowerchainAmount,
  requireToken,
} from "@powerchain/web3.js";

const pwrc = requireToken("PWRC");
const label = formatPowerchainAmount(1250.5, "PWRC");
const icon = POWERCHAIN_ASSETS.tokens.PWRC;
```

The SDK does not invent mainnet mint or contract addresses. Addresses remain
undefined until officially published and verified.

## Public assets

- `public/tokens/pwrc.svg`
- `public/tokens/wpwrc.svg`
- `public/tokens/cct.png`
- matching files under `public/currencies/`
- `public/icons/powerchain.svg`

Applications can copy these files into their own public directory during build,
or resolve them from the installed package.
