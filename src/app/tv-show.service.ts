import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, computed, signal } from '@angular/core';
import { TvShowSearch } from './type';
import { Observable, switchMap } from 'rxjs';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';

@Injectable()
export class TvShowService {
  private searchResult = signal<TvShowSearch | null>(null);

  private page_signal = signal<number>(1);
  pageSignal = this.page_signal.asReadonly();

  get searchResultSignal(): Signal<TvShowSearch | null> {
    return this.searchResult.asReadonly();
  }

  private isLoading = signal<boolean>(false);

  get isLoadingSignal(): Signal<boolean> {
    return this.isLoading.asReadonly();
  }

  private term_signal = signal<string>('');

  // wrap computed with toObservable to trigger both term and page signals with observable to use switchmap (cancel the http request)
  private search_trigger_signal: Observable<string> = toObservable(
    computed(() => {
      return `${this.term_signal()} ${this.page_signal()}`;
    })
  );

  constructor(private http: HttpClient) {
    this.search_trigger_signal.pipe(
      switchMap(() => {
      this.isLoading.set(true);
      const term = this.term_signal();
      return term !== '' ? this.searchApi(term) : this.showPopularInfoApi();
    }), takeUntilDestroyed())
      .subscribe((tvshow: TvShowSearch) => {
        this.isLoading.set(false);
        this.searchResult.set(tvshow);
    });
    // effect(() => {
    //   const term = this.term_signal();
    //   const result$ = this.searchApi(term);
    //   result$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((tvshow: TvShowSearch) => { // angular 16 - takeUntilDestroyed with destroyRef will destroy the observable for sure once the service is destroyed
    //     this.isLoading.set(false);
    //     this.searchResult.set(tvshow);
    //   });
    // })
  }

  setPage(page: number) {
    this.page_signal.set(page);
    this.term_signal.set(this.term_signal());
  }

  updateSearchResult(term: string = ''): void {
    if (this.term_signal() === term) { // when term_signal is the same as before, not show isLoading
      return;
    }
    this.page_signal.set(1);
    this.term_signal.set(term);
  }

  private searchApi(q?: string): Observable<TvShowSearch>{
    // it's ok to have multiple observable options since we use switchMap, but in effect on the comment better to use single observable to make sure the process is working well.
    // const url = !!q ? `https://www.episodate.com/api/search` : `https://www.episodate.com/api/most-popular`;
    // return this.http.get<TvShowSearch>(url, {params: {q: q ?? '', page: this.page_signal()}});
    return this.http.get<TvShowSearch>(`https://www.episodate.com/api/search`, {params: {q: q ?? '', page: this.page_signal()}});
  }

  private showPopularInfoApi(): Observable<TvShowSearch>{
    return this.http.get<TvShowSearch>(`https://www.episodate.com/api/most-popular`, {params: {page: this.page_signal() }});
  }
}
