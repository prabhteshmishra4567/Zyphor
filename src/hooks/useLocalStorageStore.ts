"use client";

import { useMemo, useSyncExternalStore } from "react";

type StoreUpdate<T> = T | ((currentValue: T) => T);

interface LocalStorageStore<T> {
  subscribe: (onStoreChange: () => void) => () => void;
  getSnapshot: () => string;
  getServerSnapshot: () => string;
  parse: (serializedValue: string) => T;
  update: (nextValue: StoreUpdate<T>) => void;
}

export function createLocalStorageStore<T>(key: string, fallback: T): LocalStorageStore<T> {
  const updateEvent = `zyphor-storage-update:${key}`;
  const getSnapshot = () => localStorage.getItem(key) ?? "";
  const getServerSnapshot = () => "";
  const parse = (serializedValue: string) => {
    if (!serializedValue) return fallback;
    try {
      return JSON.parse(serializedValue) as T;
    } catch {
      return fallback;
    }
  };
  const subscribe = (onStoreChange: () => void) => {
    if (typeof window === "undefined") return () => {};
    const handleStorage = (event: StorageEvent) => {
      if (event.key === key || event.key === null) onStoreChange();
    };
    window.addEventListener("storage", handleStorage);
    window.addEventListener(updateEvent, onStoreChange);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(updateEvent, onStoreChange);
    };
  };
  const update = (nextValue: StoreUpdate<T>) => {
    const currentValue = parse(getSnapshot());
    const updatedValue = typeof nextValue === "function"
      ? (nextValue as (currentValue: T) => T)(currentValue)
      : nextValue;
    localStorage.setItem(key, JSON.stringify(updatedValue));
    window.dispatchEvent(new Event(updateEvent));
  };

  return { subscribe, getSnapshot, getServerSnapshot, parse, update };
}

export function useLocalStorageStore<T>(store: LocalStorageStore<T>) {
  const serializedValue = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);
  const value = useMemo(() => store.parse(serializedValue), [serializedValue, store]);
  return [value, store.update] as const;
}