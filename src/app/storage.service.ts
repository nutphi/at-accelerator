import { Injectable } from '@angular/core';

export function isSupportedJsonParse(str: string) {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
}

@Injectable()
export class StorageService<T> {
  constructor() {
  }

  setLocalStorage(name: string, value: T): void {
    const strValue = typeof(value) !== "string" ? JSON.stringify(value) : value;
    window.localStorage.setItem(name, strValue);
  }

  getLocalStorage(name: string): T | null {
    const strValue = window.localStorage.getItem(name);
    if (strValue && isSupportedJsonParse(strValue)) {
      return JSON.parse(strValue);
    } else {
      return null;
    }
  }
}
