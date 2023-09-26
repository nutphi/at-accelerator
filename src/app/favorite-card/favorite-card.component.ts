import { NgIf, NgFor, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TvShowDetail } from '../type';
import { RouterLink } from '@angular/router';
import { CountDownPipe } from '../count-down.pipe';
import { FavoriteToggleDirective } from '../favorite-toggle.directive';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-favorite-card',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, DatePipe, CountDownPipe, FavoriteToggleDirective, CardComponent],
  templateUrl: './favorite-card.component.html',
  styleUrls: ['./favorite-card.component.css']
})
export class FavoriteCardComponent {
  @Input() detail!: TvShowDetail;

  constructor() { }
}
