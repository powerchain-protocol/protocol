# Encrypted keypair vault storage

This directory may contain **client-encrypted** vault payloads only. Plaintext Solana secret keys, seed phrases, passwords, and encryption keys must never be written here.

Runtime records are ignored by Git. The browser derives the encryption key from a user passphrase and encrypts each secret key with AES-GCM before upload. The server stores only ciphertext and public metadata.
