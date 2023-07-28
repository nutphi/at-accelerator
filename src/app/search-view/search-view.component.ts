import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TvShowTableComponent } from '../tv-show-table/tv-show-table.component';
import { TvShowService } from '../tv-show.service';
import { FavoriteService } from '../favorite.service';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-search-view',
  standalone: true,
  imports: [CommonModule, TvShowTableComponent],
  templateUrl: './search-view.component.html',
  styleUrls: ['./search-view.component.css'],
  providers: [TvShowService, FavoriteService, StorageService]
})
export class SearchViewComponent {
  constructor(protected tvshow: TvShowService, protected favorites: FavoriteService) { }

  onSearch(term: string, $event: Event) {
    $event.preventDefault();
    this.tvshow.term = term;
  }
}
