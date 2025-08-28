import type { StorageKeys, StorageValues } from "./types";

function useLocalStorage() {
  function get<Key extends StorageKeys>(key: Key): StorageValues[Key] | null {
    const value = localStorage.getItem(key);
    const isEmptyValue = !value;

    if (isEmptyValue) return null;

    return JSON.parse(value);
  }

  function set<Key extends StorageKeys>(key: Key, value: StorageValues[Key]) {
    const parsedValue = JSON.stringify(value);
    localStorage.setItem(key, parsedValue);
  }

  return {
    get,
    set,
  };
}

export default useLocalStorage;
