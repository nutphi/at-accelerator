import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TvShowDetailResult } from '../type';
import { NgIf, NgFor, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tv-show-details',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, DecimalPipe],
  templateUrl: './tv-show-details.component.html',
  styleUrls: ['./tv-show-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush // if you have only input output, it is better to add ChangeDetectionStrategy.OnPush so the change detection won't trigger until the data changes
})
export class TvShowDetailsComponent {
  @Input() id!: string; // just to show that we can get param from input with configure bindToComponentInputs: true on router app module
  @Input() tvShowResult!: TvShowDetailResult; // from tvShow on resolver with configure bindToComponentInputs: true
  constructor() { }
}
