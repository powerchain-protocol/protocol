
CREATE TABLE IF NOT EXISTS "CheckoutSession"(
"id" TEXT PRIMARY KEY,"merchantId" TEXT NOT NULL,"merchantReference" TEXT NOT NULL,"status" TEXT NOT NULL DEFAULT 'OPEN',
"customer" JSONB,"lineItems" JSONB NOT NULL,"settlementAssets" JSONB NOT NULL,"preferredAsset" TEXT,
"successUrl" TEXT NOT NULL,"cancelUrl" TEXT NOT NULL,"hostedUrl" TEXT NOT NULL,"paymentReference" TEXT,
"transactionSignature" TEXT,"metadata" JSONB,"expiresAt" TIMESTAMP(3) NOT NULL,
"createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,"updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE INDEX IF NOT EXISTS "CheckoutSession_merchantId_status_idx" ON "CheckoutSession"("merchantId","status");
