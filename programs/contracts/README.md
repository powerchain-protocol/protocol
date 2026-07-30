
# Powerchain contract manifests

This directory documents deployment-facing program configuration, security policy, treasury rules, supported services, networks, and public assets.

Validation:

```bash
pnpm contracts:verify
pnpm contracts:manifest
anchor build
anchor test
```

Mainnet deployment requires manifest verification, transaction simulation, separate treasury and upgrade authorities, and multisig approval.
