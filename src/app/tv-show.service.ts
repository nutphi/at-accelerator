import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TvShowSearch } from './search-view/type';
import { BehaviorSubject, Observable, Subject, finalize, switchMap, tap } from 'rxjs';

@Injectable()
export class TvShowService {
  private term$ = new BehaviorSubject<string | undefined>(undefined);
  
  readonly searchResult$ = this.term$.asObservable().pipe(
    tap(() => this.isLoadingSubject.next(true)),
    switchMap((term: string | undefined) => this.searchTvShowByName(term)),
    tap(() => this.isLoadingSubject.next(false))
  );

  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  readonly isLoading$ = this.isLoadingSubject.asObservable();

  constructor(private http: HttpClient) {}

  set term(term: string) {
    this.term$.next(term);
  }

  private searchTvShowByName(name?: string): Observable<TvShowSearch> {
    const nameSearch = name ? `q=${name}&` : '';
    return this.http.get<TvShowSearch>(`https://www.episodate.com/api/search?${nameSearch}page=1`);
  }
}
