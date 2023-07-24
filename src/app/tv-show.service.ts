import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, signal, computed } from '@angular/core';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { TvShowSearch } from './search-view/type';
import { Observable, switchMap } from 'rxjs';

@Injectable()
export class TvShowService {
  
  private searchName = signal<string>("");
  
  private readonly result$ = toObservable(this.searchName).pipe(
    switchMap((name: string) => {
      const nameSearch = name ? `q=${name}&` : '';
      return this.http.get<TvShowSearch>(`https://www.episodate.com/api/search?${nameSearch}page=1`);
    }));

  searchResultSignal = toSignal(this.result$);

  constructor(private http: HttpClient) {
  }

  changeSearchName(name: string): void {
    this.searchName.set(name);
  }
}
