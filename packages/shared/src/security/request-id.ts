
export function createRequestId(prefix = "req") {
  return `${prefix}_${crypto.randomUUID()}`;
}
