
# Powerchain Programs

## Powerchain settlement program

Program ID:

```text
PwrChn11111111111111111111111111111111111
```

Location:

```text
programs/powerchain/
```

Implemented instructions:

- `initialize`
- `set_paused`
- `register_asset`
- `record_settlement`

## PWRC token

Mint:

```text
PWRCRXXZxbg6FdQZfK3PMD7KP8xfxs9acvifJiG46wc
```

PWRC is the utility and settlement asset used by the Powerchain platform. The mint address must be verified against deployment records before production use.

## Contract manifests

Deployment-facing manifests live under:

```text
programs/contracts/
```

The treasury policy currently documents a 2% platform fee and a maximum configurable fee of 5%.

## Development commands

```bash
pnpm anchor:check
pnpm anchor:sync
anchor build
anchor test
```

## Deployment safety

- Use a multisig or controlled authority.
- Verify program IDs and mint addresses before signing.
- Run simulation and integration tests.
- Keep upgrade authority and treasury authority separate where possible.
- Never store production signer material in the repository.

## Public artifacts

Client-facing program metadata and IDLs are published under `programs/public/`. Never place signer material in that directory.
