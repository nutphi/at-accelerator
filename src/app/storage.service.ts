import { Injectable } from '@angular/core';
import { isSupportedJsonParse } from './utils';
import { fromEvent } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable()
export class StorageService<T> {

  private storageSignal = toSignal(fromEvent(window, 'storage'));

  constructor() { }

  getStorageEvent(key: string): T | undefined {
    const event = this.storageSignal() as StorageEvent;
      if (event?.key === key) {
        const newValue = JSON.parse(event.newValue || '[]');
        return newValue;
      } else {
        return undefined;
      }
  }

  setLocalStorage(key: string, value: T): void {
    const strValue = typeof(value) !== "string" ? JSON.stringify(value) : value;
    window.localStorage.setItem(key, strValue);
  }
  

  getLocalStorage(key: string, defaultValue: T): T {
    const strValue = window.localStorage.getItem(key);
    if (strValue && isSupportedJsonParse(strValue)) {
      return JSON.parse(strValue);
    } else {
      return defaultValue;
    }
  }
}
