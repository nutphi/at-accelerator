import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService<any>;
  let store: {[key: string]: string} = {};
  const mockLocalStorage = {    
    getItem: (key: string): string | null => {
      return key in store ? store[key] : null;
    },
    setItem: (key: string, value: string) => {
      store[key] = `${value}`;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService]
    });
    service = TestBed.inject(StorageService);

    spyOn(window.localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(window.localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(window.localStorage, 'clear').and.callFake(mockLocalStorage.clear);
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get empty default storage', () => {
    const empty = { };
    expect(service).toBeTruthy();
    const v = service.getLocalStorage("key", empty);
    expect(v).toBe(empty);
  });

  it('should get a number from the storage', () => {
    expect(service).toBeTruthy();
    service.setLocalStorage("key", 10);
    const v = service.getLocalStorage("key", null);
    expect(v).toEqual(10);
  });

  it('should get an object from the storage', () => {
    const obj = {a: 10, b: "hello"};
    expect(service).toBeTruthy();
    service.setLocalStorage("key", obj);
    const v = service.getLocalStorage("key", null);
    expect(v).toEqual(obj);
  });
});
