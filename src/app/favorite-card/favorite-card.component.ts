import { NgIf, NgFor, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TvShowDetail } from '../type';
import { FavoritesService } from '../favorites.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-favorite-card',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, DatePipe],
  templateUrl: './favorite-card.component.html',
  styleUrls: ['./favorite-card.component.css']
})
export class FavoriteCardComponent {
  @Input() detail!: TvShowDetail;

  constructor(protected favorites: FavoritesService) { }
}
