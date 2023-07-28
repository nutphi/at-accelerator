import { Injectable } from '@angular/core';

function isJsonParseSupported (str: string) {
  let support = true;
  try {
    JSON.parse(str);
  } catch(e) {
    support = false;
  }
  return support;
}

@Injectable()
export class StorageService<T> {

  constructor() { }

  setlocalObject (key: string, value: T): void {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  getlocalObject (key: string): T | null {
    const str = window.localStorage.getItem(key);
    if (str && isJsonParseSupported(str)) {
      return JSON.parse(str);
    } else {
      return null;
    }
  }
}
