import { createHmac, timingSafeEqual } from "node:crypto";

export function signWebhook(payload: string, secret: string, timestamp = Math.floor(Date.now() / 1000)) {
  const signature = createHmac("sha256", secret).update(`${timestamp}.${payload}`).digest("hex");
  return { timestamp, signature: `v1=${signature}` };
}

export function verifyWebhookSignature(input: {
  payload: string;
  secret: string;
  signature: string | undefined;
  timestamp: string | undefined;
  toleranceSeconds?: number;
}) {
  const timestamp = Number(input.timestamp);
  if (!input.signature || !Number.isFinite(timestamp)) return false;
  const tolerance = input.toleranceSeconds ?? 300;
  if (Math.abs(Math.floor(Date.now() / 1000) - timestamp) > tolerance) return false;
  const expected = signWebhook(input.payload, input.secret, timestamp).signature;
  const received = Buffer.from(input.signature);
  const reference = Buffer.from(expected);
  return received.length === reference.length && timingSafeEqual(received, reference);
}
