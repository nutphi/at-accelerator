import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TvShowSearch } from './search-view/type';
import { Observable } from 'rxjs';

@Injectable()
export class TvShowService {

  constructor(private http: HttpClient) { }

  searchTvShowByName(name?: string): Observable<TvShowSearch> {
    const nameSearch = name ? `q=${name}&` : '';
    return this.http.get<TvShowSearch>(`https://www.episodate.com/api/search?${nameSearch}page=1`);
  }
}
