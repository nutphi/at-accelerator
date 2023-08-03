import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TvShowDetailResult } from './type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TvShowDetailsService {

  constructor(private http: HttpClient) { }

  showInfoApi(id: number): Observable<TvShowDetailResult | null>{
    return this.http.get<TvShowDetailResult | null>(`https://www.episodate.com/api/show-details`, {params: {q: id}});
  }
}
