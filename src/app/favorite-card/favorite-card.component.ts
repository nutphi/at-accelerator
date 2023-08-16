import { NgIf, NgFor, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TvShowDetail } from '../type';
import { FavoritesService } from '../favorites.service';
import { RouterLink } from '@angular/router';
import { CountDownPipe } from '../count-down.pipe';
import { FavoriteToggleDirective } from '../favorite-toggle.directive';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-favorite-card',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, DatePipe, CountDownPipe, FavoriteToggleDirective],
  templateUrl: './favorite-card.component.html',
  styleUrls: ['./favorite-card.component.css']
})
export class FavoriteCardComponent {
  @Input() detail!: TvShowDetail;

  constructor(protected favorites: FavoritesService, private dom: DomSanitizer) { }
}
