import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TvShowDetail, TvShowDetailResult } from '../type';
import { NgIf, NgFor, DecimalPipe, I18nPluralPipe, JsonPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MaxSeasonPipe } from '../max-season.pipe';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-tv-show-details',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, DecimalPipe, I18nPluralPipe, MaxSeasonPipe, CardComponent],
  templateUrl: './tv-show-details.component.html',
  styleUrls: ['./tv-show-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush // if you have only input output, it is better to add ChangeDetectionStrategy.OnPush so the change detection won't trigger until the data changes
})
export default class TvShowDetailsComponent {
  @Input() id!: string; // just to show that we can get param from input with configure bindToComponentInputs: true on router app module
  @Input() tvShowResult!: TvShowDetailResult; // from tvShow on resolver with configure bindToComponentInputs: true
  protected currentImg!: string;

  clicker() {
    console.log('hello');
  }
  constructor() { }
}
