
# Contributors

Thank you for contributing to Powerchain.

## Development setup

1. Install Node.js 22 LTS.
2. Enable Corepack.
3. Activate pnpm 11.
4. Run `pnpm clean:install`.
5. Run `pnpm deps:doctor`.
6. Start the web application with `pnpm dev:web`.

## Contributions

- Keep changes scoped and documented.
- Add or update shared types before duplicating application-specific contracts.
- Validate wallet addresses, amounts, roles, and external payloads.
- Never commit secrets, private keys, seed phrases, or production credentials.
- Add a Changeset for user-facing package changes.
- Run `pnpm typecheck` before opening a pull request.
- Document new routes, programs, integrations, and environment variables.

## Commit style

Use a clear imperative subject:

```text
Add CCTP transfer validation
Fix wallet balance polling
Update developer portal navigation
```

## Security reports

Do not disclose a suspected vulnerability in a public issue. Use the private security contact documented in the repository's security policy.
