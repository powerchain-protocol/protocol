export type Unsubscribe = () => void;
export interface Subscription<T> { subscribe(listener: (value: T) => void): Unsubscribe; getSnapshot(): T; }
export function createSubscription<T>(initial: T): Subscription<T> & { set(value: T): void } {
  let value = initial; const listeners = new Set<(value: T) => void>();
  return { subscribe(listener) { listeners.add(listener); return () => listeners.delete(listener); }, getSnapshot: () => value, set(next) { value = next; listeners.forEach((listener) => listener(value)); } };
}
