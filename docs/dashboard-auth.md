# Dashboard authentication and wallet access

The dashboard now separates application authentication from wallet connectivity. A signed-in user receives an opaque, hashed server session. A connected wallet remains non-custodial and every transaction still requires explicit wallet approval.

## Components

- `AuthMenu` displays sign-in, sign-out and wallet controls.
- `WalletConnectModal` uses the existing Solana wallet-adapter provider.
- `ModalShell` provides one accessible dialog primitive for checkout, payments and wallet flows.
- `useAuthSession` reads the same-origin session endpoint and never exposes backend credentials.

## Authorization

Repository/source-code views must be protected on the server. UI hiding is only presentation. `OWNER` and `DEVELOPER` are currently the roles allowed by the web type guard; backend route handlers must perform the final authorization check for each protected resource.
