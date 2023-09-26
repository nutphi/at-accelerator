import { Directive, HostBinding, HostListener, Input } from '@angular/core';
import { FavoritesService } from './favorites.service';

@Directive({
  selector: '[appFavoriteToggle]',
  standalone: true
})
export class FavoriteToggleDirective {
  @Input({required: true, alias: 'appFavoriteToggle'}) id!: number;

  @HostBinding('class.highlight') get highlight() {
    return this.favorite.favoritesSignal().indexOf(this.id) !== -1;
  }

  @HostListener('click') onToggle() {
    this.favorite.toggleFavorite(+this.id);
  }

  constructor(private favorite: FavoritesService) { }
}
