import * as R from "ramda";

export function getLocalStorageItem(key: string) {
  try {
    const item = localStorage.getItem(key);
    return R.isNil(item) ? null : JSON.parse(item);
  } catch (error) {
    console.error(`Error getting item from storage: ${error}`);
    return null;
  }
}

export function setLocalStorageItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting item in storage: ${error}`);
  }
}

export function removeLocalStorageItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing item from storage: ${error}`);
  }
}
