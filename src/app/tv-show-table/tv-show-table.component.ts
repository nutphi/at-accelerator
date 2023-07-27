import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TvShowSearch } from '../search-view/type';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tv-show-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tv-show-table.component.html',
  styleUrls: ['./tv-show-table.component.css']
})
export class TvShowTableComponent {
  @Input() tvShowsResult$!: Observable<TvShowSearch>; // add default tv show
  @Input() isLoading$!: Observable<boolean>;
}
