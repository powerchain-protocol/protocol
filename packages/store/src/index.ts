
export type StoreListener<T> = (state: T, previousState: T) => void;
export type StoreUpdater<T> = Partial<T> | ((current: T) => Partial<T>);

export function createStore<T extends object>(initial: T) {
  let state = initial;
  const listeners = new Set<StoreListener<T>>();

  const api = {
    getState: () => state,
    setState(next: StoreUpdater<T>) {
      const previous = state;
      const patch = typeof next === "function" ? next(state) : next;
      state = { ...state, ...patch };
      listeners.forEach((listener) => listener(state, previous));
    },
    replaceState(next: T) {
      const previous = state;
      state = next;
      listeners.forEach((listener) => listener(state, previous));
    },
    reset() {
      api.replaceState(initial);
    },
    subscribe(listener: StoreListener<T>) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    select<S>(selector: (state: T) => S) {
      return selector(state);
    }
  };

  return api;
}

export type StoreApi<T extends object> = ReturnType<typeof createStore<T>>;

export * from "./persist.js";
