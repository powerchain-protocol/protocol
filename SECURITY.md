# Security Policy

## Supported versions

Security fixes are provided for the latest beta release and the latest stable release when one exists. Older beta builds should be upgraded before reporting an issue that may already be fixed.

## Reporting a vulnerability

Do not open a public issue for a suspected vulnerability. Use GitHub private vulnerability reporting for the `powerchain-protocol/powerchain` repository. Include the affected component, reproduction steps, impact, and any suggested mitigation.

Never include production credentials, private keys, seed phrases, signing secrets, customer data, or unredacted access tokens in a report.

## Response process

The maintainers will acknowledge a complete report, validate the issue, prepare a fix, and coordinate disclosure. Public disclosure should wait until a patched release is available.

## Security requirements

- Store secrets only in approved secret managers or encrypted deployment variables.
- Validate all untrusted input at API and webhook boundaries.
- Verify webhook signatures before processing payloads.
- Use nonces and expiration times for wallet-signature authentication.
- Apply least-privilege access to databases, cloud services, and CI/CD credentials.
- Keep lockfiles committed and use frozen installs in CI and production builds.
- Never log private keys, seed phrases, authorization headers, or complete payment data.
