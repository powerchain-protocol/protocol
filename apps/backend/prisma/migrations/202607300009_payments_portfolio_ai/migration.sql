
CREATE TABLE IF NOT EXISTS "PaymentIntent"(
 "id" TEXT PRIMARY KEY,"organizationId" TEXT,"userId" TEXT,"rail" TEXT NOT NULL,"amountUsd" DECIMAL(24,8) NOT NULL,
 "currency" TEXT NOT NULL DEFAULT 'USD',"status" TEXT NOT NULL DEFAULT 'CREATED',"walletAddress" TEXT,"reference" TEXT NOT NULL,
 "providerReference" TEXT,"metadata" JSONB,"createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,"updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS "PaymentIntent_organizationId_status_idx" ON "PaymentIntent"("organizationId","status");
CREATE TABLE IF NOT EXISTS "PortfolioSnapshot"(
 "id" TEXT PRIMARY KEY,"userId" TEXT NOT NULL,"environment" TEXT NOT NULL,"totalValueUsd" DECIMAL(24,8),
 "assets" JSONB NOT NULL,"capturedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS "PortfolioSnapshot_userId_capturedAt_idx" ON "PortfolioSnapshot"("userId","capturedAt");
CREATE TABLE IF NOT EXISTS "AiMemory"(
 "id" TEXT PRIMARY KEY,"userId" TEXT NOT NULL,"scope" TEXT NOT NULL,"content" JSONB NOT NULL,
 "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,"updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS "AiMemory_userId_scope_idx" ON "AiMemory"("userId","scope");
CREATE TABLE IF NOT EXISTS "AnalyticsEvent"(
 "id" TEXT PRIMARY KEY,"userId" TEXT,"organizationId" TEXT,"name" TEXT NOT NULL,"properties" JSONB,
 "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
