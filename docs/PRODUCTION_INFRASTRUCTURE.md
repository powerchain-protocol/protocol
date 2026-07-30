# Production infrastructure

Powerchain beta.25 adds hardened Vercel settings, API v2 foundations, runtime validation, wallet balance fallbacks, replay-protected signature challenges, signed webhooks, rate limiting, and an expanded OpenAPI contract.

## Truthful fallbacks

Mainnet and devnet balance endpoints return verified RPC data or an explicit `503 BALANCE_UNAVAILABLE`. They do not substitute mock balances. Mock mode is opt-in through `ALLOW_MOCK_DATA`.

## Webhook signatures

Incoming webhook requests use `x-powerchain-timestamp` and `x-powerchain-signature`. The signature payload is `timestamp + "." + JSON payload` and uses HMAC-SHA256. Production rejects webhook traffic when `WEBHOOK_SIGNING_SECRET` is absent.

## Wallet signatures

Challenges contain a nonce, issue time and expiry and can only be consumed once. Solana Ed25519 signatures are verified cryptographically and checked against the supplied base58 address. Sui requests fail closed until the signature scheme flag is supplied and supported.

## API versions

Existing endpoints remain under `/api/v1`. New provider-aware wallet balance endpoints begin under `/api/v2`. Swagger UI remains at `/docs/api`, and the machine-readable contract is available at `/openapi.json`.
