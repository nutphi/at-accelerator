import { Injectable } from '@angular/core';
import { isSupportedJsonParse } from './utils';
import { fromEvent } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable()
export class StorageService<T> {

  private storageSignal = toSignal(fromEvent(window, 'storage'));

  constructor() { }

  getStorageEvent(key: string): T | null {
    const event = this.storageSignal() as StorageEvent;
      if (event?.key === key && event.newValue) {
        return isSupportedJsonParse(event.newValue) ? JSON.parse(event.newValue) : event.newValue;
      } else {
        return null;
      }
  }

  setLocalStorage(key: string, value: T): void {
    const strValue = typeof(value) !== "string" ? JSON.stringify(value) : value;
    window.localStorage.setItem(key, strValue);
  }

  getLocalStorage(key: string, defaultValue: T): T {
    const strValue = window.localStorage.getItem(key);
    if (strValue) {
      return isSupportedJsonParse(strValue) ? JSON.parse(strValue) : strValue;
    } else {
      return defaultValue;
    }
  }
}
