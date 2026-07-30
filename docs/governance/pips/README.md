# PowerChain Improvement Proposals (PIPs)

A PIP is the canonical mechanism for proposing protocol, governance, standards, ecosystem, or process changes.

## Lifecycle

```text
Idea → Draft → Discussion → Review → Voting → Accepted/Rejected
     → Implementation → Audit/Testing → Timelock → Activation
```

## Categories

- `PIP-C`: core chain, runtime, validator, consensus, cryptography.
- `PIP-P`: native protocols such as energy, carbon, oracle, or treasury.
- `PIP-G`: governance, delegation, councils, and constitution.
- `PIP-S`: APIs, SDKs, wallets, metadata, and standards.
- `PIP-I`: informational guidance and research.
- `PIP-X`: project and release processes.

## Repository layout

```text
pips/
├── README.md
├── TEMPLATE.md
├── PIP-0001.md
└── archive/
```

## Review expectations

A protocol-changing PIP must define motivation, normative specification, architecture, security impact, compatibility, implementation, tests, migration, risks, alternatives, and activation conditions.
