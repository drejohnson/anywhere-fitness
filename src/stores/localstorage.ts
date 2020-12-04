import { writable, get } from "svelte/store";

import type { JsonValue } from "../types"

export function local<T extends JsonValue>(key: string, initial: T) {
  const toString = (value: T) => JSON.stringify(value, null, 2); // helper function
  const parsed = JSON.parse; // helper function

  if (!localStorage) return writable(initial);

  if (localStorage.getItem(key) === null)
    localStorage.setItem(key, toString(initial));

  const saved = parsed(localStorage.getItem(key) || '');

  const store = writable(saved);

  return {
    subscribe: store.subscribe,
    set: (value: T) => {
      localStorage.setItem(key, toString(value));

      store.set(value);
    },
    update: (fn: (value: T) => T) => {
      store.update(fn);

      localStorage.setItem(key, toString(get(store)));
    }
  };
};