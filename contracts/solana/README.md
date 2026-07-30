# PowerChain Solana workspace

This is the canonical contract workspace for Solana. It groups deployable Anchor programs, SPL and Token-2022 integrations, Metaplex metadata, test fixtures, generated targets and environment-specific manifests.

## Layout

- `programs/`: Anchor program sources, including the PowerChain RWA and certificate logic.
- `resources/manifests/`: program, token, treasury and deployment manifests.
- `resources/idl/`: stable copies of generated IDLs for SDK and documentation use.
- `tests/`: integration tests that run against localnet or a configured validator.
- `target/`: generated Anchor artifacts; do not edit manually.

## Networks

Use separate authorities, program IDs and mint addresses for localnet, devnet and mainnet-beta. Mainnet deployment must use a hardware-backed or managed signer and an explicit release review.

## Commands

```bash
pnpm --dir contracts/solana build
pnpm --dir contracts/solana test
pnpm --dir contracts/solana deploy:devnet
pnpm --dir contracts/solana deploy:mainnet-beta
```

The legacy root `programs/` directory remains available for compatibility while tooling migrates to this workspace.
