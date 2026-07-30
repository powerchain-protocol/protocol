
CREATE TABLE IF NOT EXISTS "CrowdfundingCampaign" (
  "id" TEXT PRIMARY KEY,
  "title" TEXT NOT NULL,
  "slug" TEXT NOT NULL UNIQUE,
  "goalEur" DOUBLE PRECISION NOT NULL,
  "raisedEur" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "minimumInvestmentEur" DOUBLE PRECISION NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'open',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "CrowdfundingInvestment" (
  "id" TEXT PRIMARY KEY,
  "campaignId" TEXT NOT NULL,
  "userId" TEXT,
  "amountEur" DOUBLE PRECISION NOT NULL,
  "paymentMethod" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'awaiting-payment',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "CrowdfundingInvestment_campaignId_fkey"
    FOREIGN KEY ("campaignId") REFERENCES "CrowdfundingCampaign"("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "SmartMeter" (
  "id" TEXT PRIMARY KEY,
  "actorId" TEXT NOT NULL,
  "serialNumber" TEXT NOT NULL UNIQUE,
  "manufacturer" TEXT NOT NULL,
  "model" TEXT NOT NULL,
  "protocol" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'offline',
  "signedTelemetry" BOOLEAN NOT NULL DEFAULT false,
  "lastSeenAt" TIMESTAMP(3)
);
