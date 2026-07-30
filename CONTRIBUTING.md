# Contributing to PowerChain

Thank you for helping improve PowerChain. Contributions should be focused, testable, documented, and safe for a multi-package platform handling blockchain, identity, financial, and energy workflows.

## Before contributing

1. Read the [Code of Conduct](./CODE_OF_CONDUCT.md) and [Security Policy](./SECURITY.md).
2. Search existing issues and proposals before opening duplicate work.
3. Use a PowerChain Improvement Proposal for significant protocol, governance, compatibility, or economic changes.
4. Never include credentials, private keys, production data, or personal data in commits, fixtures, screenshots, or logs.

## Local setup

```bash
corepack enable
corepack prepare pnpm@11.0.0 --activate
pnpm install:workspace
pnpm install:check
pnpm env:check
```

## Validation

Run the checks relevant to your change:

```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm docs:check
pnpm platform:verify
```

Rust and program changes should also run:

```bash
cargo fmt --all --check
cargo clippy --workspace --all-targets -- -D warnings
pnpm programs:doctor
pnpm anchor:test
pnpm svm:test
```

## Pull requests

Pull requests should include:

- A concise problem statement and solution summary
- Tests or a reason tests are not applicable
- Documentation for public behavior changes
- Migration notes for database, program, API, or configuration changes
- Security implications and rollback considerations where relevant
- A Changeset when published packages change

Use Conventional Commit style for commit messages, for example `feat(energy): add settlement quote validation`.

## Compatibility

Do not silently break public APIs, schema contracts, program account layouts, PDA seeds, instruction discriminators, or database migrations. Breaking changes require explicit documentation and a versioning plan.

## License

By contributing, you agree that your contribution is licensed under Apache-2.0.
