import { Component } from '@angular/core';
import { FavoritesService } from '../favorites.service';
import { NgIf, NgFor, DecimalPipe, I18nPluralPipe, JsonPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MaxSeasonPipe } from '../max-season.pipe';
import { StorageService } from '../storage.service';
import { TvShowDetail } from '../type';

@Component({
  selector: 'app-favorites-view',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, DatePipe],
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
