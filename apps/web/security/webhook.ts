
import { createHmac, timingSafeEqual } from "node:crypto";

export function verifyWebhookSignature(input: {
  body: string;
  signature: string;
  secret: string;
}) {
  const expected = createHmac("sha256", input.secret).update(input.body).digest("hex");
  const left = Buffer.from(expected);
  const right = Buffer.from(input.signature);
  return left.length === right.length && timingSafeEqual(left, right);
}
