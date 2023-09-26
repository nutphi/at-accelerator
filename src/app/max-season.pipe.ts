import { Pipe, PipeTransform } from '@angular/core';
import { Episode } from './type';

@Pipe({
  name: 'maxSeason',
  standalone: true,
  pure: true
})
export class MaxSeasonPipe implements PipeTransform {

  transform(value: Episode[]): number {
    const seasons = value.map(episode => episode.season);
    return seasons.length ? Math.max(... seasons): 0;
  }

}
