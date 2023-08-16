import { HttpClient } from '@angular/common/http';
import { DestroyRef, Injectable, Signal, effect, signal } from '@angular/core';
import { TvShowSearch } from './type';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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

  constructor(private http: HttpClient, private destroyRef: DestroyRef) {
    effect(() => {
      const term = this.term_signal();
      const result$ = !!term ? this.searchApi(term) : this.showPopularInfoApi();
      result$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((tvshow: TvShowSearch) => { // angular 16 - takeUntilDestroyed
        this.isLoading.set(false);
        this.searchResult.set(tvshow);
      });
    })
  }

  setPage(page: number) {
    this.page_signal.set(page);
    this.term_signal.set(this.term_signal());
  }

  updateSearchResult(term: string = ''): void {
    if (this.term_signal() === term) { // when term_signal is the same as before, not show isLoading
      return;
    }
    this.isLoading.set(true);
    this.searchResult.set(null);
    this.page_signal.set(1);
    this.term_signal.set(term);
  }

  private searchApi(q?: string): Observable<TvShowSearch>{
    return this.http.get<TvShowSearch>(`https://www.episodate.com/api/search`, {params: {q: q ?? '', page: this.page_signal()}});
  }

  private showPopularInfoApi(): Observable<TvShowSearch>{
    return this.http.get<TvShowSearch>(`https://www.episodate.com/api/most-popular`, {params: {page: this.page_signal() }});
  }
}
