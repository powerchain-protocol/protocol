export * from "./energy";
export * from "./devices";
export * from "./trading";
export interface CacheEntry<T> { value: T; expiresAt: number; }
export class MemoryDataStore {
  private readonly values = new Map<string, CacheEntry<unknown>>();
  set<T>(key: string, value: T, ttlMs = 60_000) { this.values.set(key, { value, expiresAt: Date.now() + ttlMs }); }
  get<T>(key: string): T | undefined { const item=this.values.get(key); if (!item || item.expiresAt <= Date.now()) { this.values.delete(key); return undefined; } return item.value as T; }
  delete(key: string) { return this.values.delete(key); }
}
