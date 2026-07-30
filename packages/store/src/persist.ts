
import type { StoreApi } from "./index.js";

export function persistStore<T extends object>(
  store: StoreApi<T>,
  options: {
    key: string;
    storage: Pick<Storage, "getItem" | "setItem">;
    serialize?: (value: T) => string;
    deserialize?: (value: string) => T;
  }
) {
  const serialize = options.serialize ?? JSON.stringify;
  const deserialize = options.deserialize ?? JSON.parse;

  const saved = options.storage.getItem(options.key);
  if (saved) store.replaceState(deserialize(saved));

  return store.subscribe((state) => {
    options.storage.setItem(options.key, serialize(state));
  });
}
