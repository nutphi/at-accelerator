import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { TvShowDetail } from './type';
import { Observable } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class TvShowDetailsService {

  constructor(private http: HttpClient) { }

  showInfoApi(id: number): Observable<TvShowDetail | null>{
    return this.http.get<TvShowDetail | null>(`https://www.episodate.com/api/show-details`, {params: {q: id}});
  }
}
