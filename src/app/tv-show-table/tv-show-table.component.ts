import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TvShow, TvShowSearch } from '../type';

@Component({
  selector: 'app-tv-show-table',
  standalone: true,
  imports: [CommonModule],
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
