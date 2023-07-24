import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TvShowTableComponent} from '../tv-show-table/tv-show-table.component';
import { TvShowService } from '../tv-show.service';
import { TvShowSearch } from './type';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-view',
  standalone: true,
  imports: [CommonModule, TvShowTableComponent],
  templateUrl: './search-view.component.html',
  styleUrls: ['./search-view.component.css'],
  providers: [TvShowService]
})
export class SearchViewComponent {
  protected searchResult$: Observable<TvShowSearch> | undefined;
  constructor(protected tvshow: TvShowService) {
    this.searchResult$ = tvshow.searchTvShowByName();
  }
}
