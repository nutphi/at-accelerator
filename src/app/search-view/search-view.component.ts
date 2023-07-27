import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TvShowTableComponent} from '../tv-show-table/tv-show-table.component';
import { TvShowService } from '../tv-show.service';
import { FavoritesService } from '../favorites.service';
import { TvShow } from './type';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-search-view',
  standalone: true,
  imports: [CommonModule, TvShowTableComponent],
  templateUrl: './search-view.component.html',
  styleUrls: ['./search-view.component.css'],
  providers: [TvShowService, FavoritesService, StorageService]
})
export class SearchViewComponent {

  constructor(protected tvShow: TvShowService, protected favorites: FavoritesService) {
    this.tvShow.updateSearchResult();
  }

  onSearch(name: string, $event: Event) {
    $event.preventDefault();
    this.tvShow.updateSearchResult(name);
  }

  onFavoriteToggle(id: TvShow['id']) {
    this.favorites.toggleFavorite(id);
  }
}
