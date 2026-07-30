# @powerchain/solana

Powerchain's typed Solana token layer.

## Entry points

- `@powerchain/solana/tokens/spl` — classic SPL Token helpers.
- `@powerchain/solana/token-2022` — PWRC Token-2022 specification.
- `@powerchain/solana/token-2022/extensions` — transfer-fee and metadata validation.

All token amounts use `bigint` base units. Production mint, authority, treasury, and metadata addresses remain unset until deployment verification.
