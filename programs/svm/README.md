# PowerChain SVM programs

Low-compute Solana Virtual Machine programs implemented with Anza's Pinocchio stack.

## Packages

- `pinocchio-powerchain`: minimal energy-recording and settlement instruction processor.
- `resources`: deployment manifests, account layouts, and generated artifacts.
- `target`: generated local build output; do not hand-edit or commit binaries.

## Commands

```bash
cargo test -p powerchain-svm
cargo build -p powerchain-svm --release
```

Anchor remains the high-level framework for complex account workflows. Pinocchio is used for compute-sensitive, small-binary SVM primitives. Both packages remain at `1.0.0-beta.1`.
