import { Component, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TvShowTableComponent} from '../tv-show-table/tv-show-table.component';
import { TvShowService } from '../tv-show.service';

@Component({
  selector: 'app-search-view',
  standalone: true,
  imports: [CommonModule, TvShowTableComponent],
  templateUrl: './search-view.component.html',
  styleUrls: ['./search-view.component.css'],
  providers: [TvShowService]
})
export class SearchViewComponent {

  constructor(protected tvShow: TvShowService) {
  }

  onSearch(name: string, $event: Event) {
    $event.preventDefault();
    this.tvShow.changeSearchName(name);
  }
}
