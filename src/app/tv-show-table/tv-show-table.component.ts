import { Component, Input, TrackByFunction } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TvShow, TvShowSearch } from '../search-view/type';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tv-show-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tv-show-table.component.html',
  styleUrls: ['./tv-show-table.component.css']
})
export class TvShowTableComponent {
  @Input() tvShowsResult$: Observable<TvShowSearch> | undefined; // add default tv show
  protected trackById: TrackByFunction<TvShow> = (index: number, tvshow: TvShow) => tvshow.id;
}
