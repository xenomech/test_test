import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const createPersistedStore = <T>(
  store: (set: (partial: Partial<T>) => void, get: () => T) => T,
  persistKey: string,
  options?: {
    partialize?: (state: T) => Partial<T>;
  }
) => {
  return create(
    devtools(
      persist(store, {
        name: persistKey,
        partialize: options?.partialize,
      })
    )
  );
};

export default createPersistedStore;
