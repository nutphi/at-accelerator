import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, signal } from '@angular/core';
import { TvShowSearch } from './search-view/type';
import { Observable } from 'rxjs';

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

  constructor(private http: HttpClient) {
  }

  updateSearchResult(term?: string): void {
    this.isLoading.set(true);
    this.searchResult.set(null);
    this.searchApi(term).subscribe((tvshow: TvShowSearch) => {
      this.isLoading.set(false);
      this.searchResult.set(tvshow);
    });
  }

  private searchApi(term?: string): Observable<TvShowSearch>{
    const termParam = term ? `q=${term}&` : '';
    return this.http.get<TvShowSearch>(`https://www.episodate.com/api/search?${termParam}page=1`);
  }
}
