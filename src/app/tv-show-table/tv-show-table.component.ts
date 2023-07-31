import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { DatePipe, NgIf, NgFor } from '@angular/common';
import { TvShow, TvShowSearch } from '../type';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tv-show-table',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, DatePipe],
  templateUrl: './tv-show-table.component.html',
  styleUrls: ['./tv-show-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush // if you have only input output, it is better to add ChangeDetectionStrategy.OnPush so the change detection won't trigger until the data changes
})
export class TvShowTableComponent {
  @Input() tvShowsResult!: TvShowSearch | null;
  @Input() isLoading!: boolean;
  @Input() favoriteShows!: TvShow['id'][];
  @Output() toggleFavorite: EventEmitter<TvShow['id']> = new EventEmitter<TvShow['id']>();
}
