import { Component } from '@angular/core';
import { FavoritesService } from '../favorites.service';
import { NgFor } from '@angular/common';
import { StorageService } from '../storage.service';
import { TvShowDetail } from '../type';
import { FavoriteCardComponent } from '../favorite-card/favorite-card.component';

@Component({
  selector: 'app-favorites-view',
  standalone: true,
  imports: [NgFor, FavoriteCardComponent],
  providers: [FavoritesService, StorageService],
  templateUrl: './favorites-view.component.html',
  styleUrls: ['./favorites-view.component.css']
})
export default class FavoritesViewComponent {
  constructor(protected favorites: FavoritesService) { }

  trackTvShowId(index: number, item: TvShowDetail) {
    return item.id;
  }
}
