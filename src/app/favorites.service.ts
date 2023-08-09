import { effect, Injectable, signal } from '@angular/core';
import { StorageService } from './storage.service';
import { TvShow, TvShowDetail, TvShowDetailResult } from './type';
import { forkJoin, map, shareReplay, switchMap, of } from 'rxjs';
import { TvShowDetailsService } from './tv-show-details.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

@Injectable()
export class FavoritesService {
  static readonly FAVORITES_KEY = 'favorites';
  private favorites_signal = signal<TvShow['id'][]>(this.storage.getLocalStorage(FavoritesService.FAVORITES_KEY, []));
  favoritesSignal = this.favorites_signal.asReadonly();

  private favoritesDetail$ = toObservable(this.favoritesSignal).pipe(
    switchMap((favoriteIds: TvShow['id'][]) => {
      return favoriteIds.length ?
        forkJoin(favoriteIds.map((id) => this.tvShowDetail.showInfoApi(id))) :
        of([]);
    }),
    map((result: (TvShowDetailResult|null)[]) => {
      const details = result.map((result) => result?.tvShow).filter((result) => !!result) as TvShowDetail[];
      details.sort(this.sortTvShowByDate);
      return details;
    }),
    shareReplay()
  );
  favoritesDetailSignal = toSignal(this.favoritesDetail$);

  constructor(private storage: StorageService<TvShow['id'][]>, private tvShowDetail: TvShowDetailsService) {
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

  private sortTvShowByDate(a: TvShowDetail, b: TvShowDetail) {
    if (a.status === 'Running' && b.status === 'Running') {
      const bAirTimestamp = b?.countdown?.air_date ? new Date(b?.countdown?.air_date).getTime() : Number.MAX_VALUE;
      const aAirTimestamp = a?.countdown?.air_date ? new Date(a?.countdown?.air_date).getTime() : Number.MAX_VALUE;
      return aAirTimestamp - bAirTimestamp;
    } else if (a.status === 'Running' && (b.status === 'Canceled/Ended' || b.status === 'Ended')) {
      return -1;
    } else if ((a.status === 'Canceled/Ended' || a.status === 'Ended') && b.status === 'Running') {
      return 1;
    } else {
      return 0;
    }
  }
}
