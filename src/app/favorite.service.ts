import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { TvShow } from './search-view/type';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class FavoriteService {
  static readonly FAVORITE_KEY = 'favorites';
  private _favorites: BehaviorSubject<TvShow['id'][] | null> = new BehaviorSubject(this.storage.getlocalObject(FavoriteService.FAVORITE_KEY));
  favorites$ = this._favorites.asObservable();

  constructor(private storage: StorageService<TvShow['id'][]>) {
    this.favorites$.subscribe((favorites) => {
      if (favorites) {
        storage.setlocalObject(FavoriteService.FAVORITE_KEY, favorites);
      }
    });
  }

  toggleFavorites (id: number) {
    const favorites = this._favorites.getValue();
    const idx = favorites?.indexOf(id) ?? -1;
    if (idx === -1) {
      favorites?.push(id);
    } else {
      favorites?.splice(idx, 1);
    }
    this._favorites.next(favorites);
  }
}
