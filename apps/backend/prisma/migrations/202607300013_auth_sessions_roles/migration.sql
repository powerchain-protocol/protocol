-- Authentication/session hardening indexes for dashboard and wallet access.
CREATE INDEX IF NOT EXISTS "UserSession_tokenHash_expiresAt_idx" ON "UserSession"("tokenHash", "expiresAt");
CREATE INDEX IF NOT EXISTS "UserSession_revokedAt_expiresAt_idx" ON "UserSession"("revokedAt", "expiresAt");
CREATE INDEX IF NOT EXISTS "Membership_organizationId_role_idx" ON "Membership"("organizationId", "role");
CREATE INDEX IF NOT EXISTS "Wallet_userId_network_idx" ON "Wallet"("userId", "network");
