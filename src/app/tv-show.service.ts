import { HttpClient } from '@angular/common/http';
import { DestroyRef, Injectable, Signal, signal } from '@angular/core';
import { TvShowSearch } from './type';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable()
export class TvShowService {
  private searchResult = signal<TvShowSearch | null>(null);

  get searchResultSignal(): Signal<TvShowSearch | null> {
    return this.searchResult.asReadonly();
  }

  private isLoading = signal<boolean>(false);

  get isLoadingSignal(): Signal<boolean> {
    return this.isLoading.asReadonly();
  }

  constructor(private http: HttpClient, private destroyRef: DestroyRef) {
  }

  updateSearchResult(term?: string): void {
    this.isLoading.set(true);
    this.searchResult.set(null);
    this.searchApi(term).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((tvshow: TvShowSearch) => { // angular 16 - takeUntilDestroyed
      this.isLoading.set(false);
      this.searchResult.set(tvshow);
    });
  }

  private searchApi(term?: string): Observable<TvShowSearch>{
    const termParam = term ? `q=${term}&` : '';
    return this.http.get<TvShowSearch>(`https://www.episodate.com/api/search?${termParam}page=1`);
  }
}
