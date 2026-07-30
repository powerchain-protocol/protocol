# PowerChain programs

All program packages are versioned at **1.0.0-beta.1**.

- `powerchain/` — Anchor-based protocol, RWA, renewable-energy, settlement, treasury, bridge, and faucet logic.
- `svm/` — Anza Pinocchio programs for compute-sensitive SVM paths.
- `foucets/` — TypeScript SPL Token and Token-2022 faucet service package.
- `generator/` — key and account-generation utilities.
- `contracts/` — program manifests and deployment policies.

## Build

```bash
pnpm programs:doctor
pnpm programs:build
pnpm programs:test
pnpm svm:check
```

Before devnet or mainnet-beta deployment, replace placeholder program IDs and synchronize `Anchor.toml`, keypairs, deployment manifests, and generated IDLs.
