import { Injectable } from '@angular/core';
import { isSupportedJsonParse } from './utils';

@Injectable()
export class StorageService<T> {
  constructor() {
  }

  setLocalStorage(name: string, value: T): void {
    const strValue = typeof(value) !== "string" ? JSON.stringify(value) : value;
    window.localStorage.setItem(name, strValue);
  }

  getLocalStorage(name: string, defaultValue: T): T {
    const strValue = window.localStorage.getItem(name);
    if (strValue && isSupportedJsonParse(strValue)) {
      return JSON.parse(strValue);
    } else {
      return defaultValue;
    }
  }
}
