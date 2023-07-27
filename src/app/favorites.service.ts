import { effect, Injectable, signal } from '@angular/core';
import { StorageService } from './storage.service';
import { TvShow } from './search-view/type';

@Injectable()
export class FavoritesService {
  static readonly FAVORITES_KEY = 'favorites';
  private favorites_signal = signal<TvShow['id'][]>(this.storage.getLocalStorage(FavoritesService.FAVORITES_KEY, []));
  favoritesSignal = this.favorites_signal.asReadonly();

  constructor(private storage: StorageService<TvShow['id'][]>) {
    effect(() => {
      const favorites = this.favoritesSignal()
      this.storage.setLocalStorage(FavoritesService.FAVORITES_KEY, favorites);
    })
  }

  toggleFavorite(id: TvShow['id']) {
    this.favorites_signal.mutate((favorites) => {
      const favoriteIdx = favorites.indexOf(id);
      if (favoriteIdx === -1) {
        favorites.push(id);
      } else {
        favorites.splice(favoriteIdx, 1);
      }
    });
  }
}
