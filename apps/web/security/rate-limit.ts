export type RateLimitResult = { allowed: boolean; limit: number; remaining: number; resetAt: number };
type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();
const MAX_BUCKETS = 10_000;

export function checkRateLimit(key: string, limit = 20, windowMs = 60_000): RateLimitResult {
  const now = Date.now();
  if (buckets.size > MAX_BUCKETS) {
    for (const [bucketKey, bucket] of buckets) if (bucket.resetAt <= now) buckets.delete(bucketKey);
  }
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    const resetAt = now + windowMs;
    buckets.set(key, { count: 1, resetAt });
    return { allowed: true, limit, remaining: Math.max(0, limit - 1), resetAt };
  }
  if (bucket.count >= limit) return { allowed: false, limit, remaining: 0, resetAt: bucket.resetAt };
  bucket.count += 1;
  return { allowed: true, limit, remaining: Math.max(0, limit - bucket.count), resetAt: bucket.resetAt };
}

export function clearRateLimit(key: string) { buckets.delete(key); }
