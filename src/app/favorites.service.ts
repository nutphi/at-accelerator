import { computed, effect, Injectable, signal } from '@angular/core';
import { StorageService } from './storage.service';
import { TvShow } from './search-view/type';
import { fromEvent } from 'rxjs';

@Injectable()
export class FavoritesService {
  static readonly FAVORITES_KEY = 'favorites';
  private favorites_signal = signal<TvShow['id'][]>(this.storage.getLocalStorage(FavoritesService.FAVORITES_KEY, []));
  favoritesSignal = this.favorites_signal.asReadonly();

  constructor(private storage: StorageService<TvShow['id'][]>) {
    // update toggle from the same tab
    effect(() => {
      const favorites = this.favoritesSignal();
      this.storage.setLocalStorage(FavoritesService.FAVORITES_KEY, favorites);
    });

    // update toggle from different tabs
    effect(() => {
      const favorites = this.storage.getStorageEvent(FavoritesService.FAVORITES_KEY);
      if (favorites) {
        this.favorites_signal.set(favorites);
      }
    }, { allowSignalWrites: true });
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
