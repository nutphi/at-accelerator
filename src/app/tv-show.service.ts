import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, signal, computed, inject, Injector, effect } from '@angular/core';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { TvShowSearch } from './search-view/type';
import { Observable, of, switchMap } from 'rxjs';

@Injectable()
export class TvShowService {
  
  private searchName = signal<string>("");
  private searchResult = signal<TvShowSearch | null>(null);

  get searchResultSignal(): Signal<TvShowSearch | null> {
    return this.searchResult.asReadonly();
  }

  private isLoading = signal<boolean>(false);

  get isLoadingSignal(): Signal<boolean> {
    return this.isLoading.asReadonly();
  }

  constructor(private http: HttpClient) {
    effect(() => {
      this.isLoading.set(true);
      this.searchResult.set(null);

      this.getTvShowSearchApi(this.searchName())
        .subscribe((searchResult) => {
          this.searchResult.set(searchResult);
          this.isLoading.set(false);
      });
    }, {
      allowSignalWrites: true
    });
  }

  getTvShowSearchApi(name: string): Observable<TvShowSearch> {
    const nameSearch = name ? `q=${name}&` : '';
    return this.http.get<TvShowSearch>(`https://www.episodate.com/api/search?${nameSearch}page=1`);
  }

  changeSearchName(name: string): void {
    this.searchName.set(name);
  }
}
