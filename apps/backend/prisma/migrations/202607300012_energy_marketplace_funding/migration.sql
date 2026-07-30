CREATE TABLE "EnergyOffer" (
  "id" TEXT PRIMARY KEY,
  "sellerId" TEXT NOT NULL,
  "meterId" TEXT,
  "source" TEXT NOT NULL,
  "region" TEXT NOT NULL,
  "latitude" DOUBLE PRECISION NOT NULL,
  "longitude" DOUBLE PRECISION NOT NULL,
  "availableKwh" DECIMAL(20,6) NOT NULL,
  "pricePerKwh" DECIMAL(20,8) NOT NULL,
  "currency" TEXT NOT NULL DEFAULT 'EUR',
  "carbonIntensityGco2Kwh" DECIMAL(12,4) NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'OPEN',
  "expiresAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL
);
CREATE INDEX "EnergyOffer_region_source_status_idx" ON "EnergyOffer"("region","source","status");
CREATE TABLE "FundingContribution" (
  "id" TEXT PRIMARY KEY,
  "projectId" TEXT NOT NULL,
  "contributorId" TEXT,
  "kind" TEXT NOT NULL,
  "amountEur" DECIMAL(18,2) NOT NULL,
  "paymentMethod" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'PENDING',
  "anonymous" BOOLEAN NOT NULL DEFAULT false,
  "message" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL
);
CREATE INDEX "FundingContribution_projectId_kind_status_idx" ON "FundingContribution"("projectId","kind","status");
