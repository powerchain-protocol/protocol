
ALTER TABLE "User"
  ADD COLUMN IF NOT EXISTS "avatarUrl" TEXT,
  ADD COLUMN IF NOT EXISTS "locale" TEXT NOT NULL DEFAULT 'fi-FI',
  ADD COLUMN IF NOT EXISTS "timezone" TEXT NOT NULL DEFAULT 'Europe/Helsinki',
  ADD COLUMN IF NOT EXISTS "status" TEXT NOT NULL DEFAULT 'ACTIVE';

ALTER TABLE "Membership" ADD COLUMN IF NOT EXISTS "zkVerifiedAt" TIMESTAMP(3);

CREATE TABLE IF NOT EXISTS "Subscription" (
  "id" TEXT PRIMARY KEY,
  "organizationId" TEXT NOT NULL,
  "provider" TEXT NOT NULL,
  "providerRef" TEXT UNIQUE,
  "tier" TEXT NOT NULL,
  "interval" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'TRIALING',
  "seats" INTEGER NOT NULL DEFAULT 1,
  "currentPeriodEnd" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Subscription_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "UserSession" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "tokenHash" TEXT NOT NULL UNIQUE,
  "ipAddress" TEXT,
  "userAgent" TEXT,
  "lastActiveAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  "revokedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "UserSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "CrmAccount" (
  "id" TEXT PRIMARY KEY,
  "organizationId" TEXT NOT NULL,
  "externalId" TEXT,
  "provider" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "stage" TEXT NOT NULL,
  "annualValueEur" DECIMAL(18,2),
  "metadata" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "CrmAccount_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "ErpEntry" (
  "id" TEXT PRIMARY KEY,
  "organizationId" TEXT NOT NULL,
  "externalId" TEXT,
  "provider" TEXT NOT NULL,
  "entryType" TEXT NOT NULL,
  "reference" TEXT NOT NULL,
  "amountEur" DECIMAL(18,2) NOT NULL,
  "status" TEXT NOT NULL,
  "metadata" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ErpEntry_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE
);
