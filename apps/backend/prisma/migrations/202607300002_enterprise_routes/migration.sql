
CREATE TABLE IF NOT EXISTS "Device" (
  "id" TEXT PRIMARY KEY,
  "organizationId" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "category" TEXT NOT NULL,
  "manufacturer" TEXT NOT NULL,
  "model" TEXT NOT NULL,
  "serialNumber" TEXT NOT NULL UNIQUE,
  "status" TEXT NOT NULL DEFAULT 'offline',
  "walletAddress" TEXT,
  "lastSeenAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "EnergyReading" (
  "id" TEXT PRIMARY KEY,
  "deviceId" TEXT NOT NULL,
  "timestamp" TIMESTAMP(3) NOT NULL,
  "productionKwh" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "consumptionKwh" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "exportedKwh" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "importedKwh" DOUBLE PRECISION NOT NULL DEFAULT 0,
  CONSTRAINT "EnergyReading_deviceId_fkey"
    FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS "EnergyReading_deviceId_timestamp_idx"
ON "EnergyReading"("deviceId", "timestamp");
