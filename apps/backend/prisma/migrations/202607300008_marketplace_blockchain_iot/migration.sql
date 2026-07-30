
CREATE TABLE IF NOT EXISTS "MarketplaceOrder"(
 "id" TEXT PRIMARY KEY,"organizationId" TEXT,"assetId" TEXT NOT NULL,"side" TEXT NOT NULL,"quantity" DOUBLE PRECISION NOT NULL,
 "priceUsd" DECIMAL(24,8) NOT NULL,"subtotalUsd" DECIMAL(24,8) NOT NULL,"platformFeeUsd" DECIMAL(24,8) NOT NULL,
 "totalUsd" DECIMAL(24,8) NOT NULL,"settlementAsset" TEXT NOT NULL,"walletAddress" TEXT NOT NULL,"clientReference" TEXT NOT NULL,
 "status" TEXT NOT NULL DEFAULT 'CREATED',"transactionSignature" TEXT,"createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
 "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS "MarketplaceOrder_organizationId_status_idx" ON "MarketplaceOrder"("organizationId","status");

CREATE TABLE IF NOT EXISTS "BlockchainTransaction"(
 "id" TEXT PRIMARY KEY,"organizationId" TEXT,"network" TEXT NOT NULL,"signature" TEXT,"fromAddress" TEXT NOT NULL,
 "toAddress" TEXT NOT NULL,"asset" TEXT NOT NULL,"amount" TEXT NOT NULL,"status" TEXT NOT NULL DEFAULT 'CREATED',
 "explorerUrl" TEXT,"metadata" JSONB,"createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
 "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE UNIQUE INDEX IF NOT EXISTS "BlockchainTransaction_network_signature_key" ON "BlockchainTransaction"("network","signature");

CREATE TABLE IF NOT EXISTS "RenewableTelemetry"(
 "id" TEXT PRIMARY KEY,"assetId" TEXT NOT NULL,"outputMw" DOUBLE PRECISION NOT NULL,"generationMwh" DOUBLE PRECISION NOT NULL,
 "availabilityPercent" DOUBLE PRECISION,"metadata" JSONB,"recordedAt" TIMESTAMP(3) NOT NULL
);
CREATE INDEX IF NOT EXISTS "RenewableTelemetry_assetId_recordedAt_idx" ON "RenewableTelemetry"("assetId","recordedAt");

CREATE TABLE IF NOT EXISTS "HardwareDevice"(
 "id" TEXT PRIMARY KEY,"organizationId" TEXT,"type" TEXT NOT NULL,"vendor" TEXT NOT NULL,"model" TEXT NOT NULL,
 "serialNumber" TEXT UNIQUE,"firmwareVersion" TEXT,"certified" BOOLEAN NOT NULL DEFAULT false,"status" TEXT NOT NULL DEFAULT 'OFFLINE',
 "metadata" JSONB,"createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,"updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
