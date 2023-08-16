import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceToNow } from 'date-fns';
import { Status } from './type';
@Pipe({
  name: 'countDown',
  standalone: true
})
export class CountDownPipe implements PipeTransform {

  transform(date: Date | undefined, status: Status): string {
    if (status === 'Running' || status === 'To Be Determined') {
      return date ? `Next episode in ${formatDistanceToNow(new Date(date))}` : 'Running but no next episode date';
    } else if (status === 'Ended' || status === 'Canceled/Ended') {
      return `Show has ${status.toLocaleLowerCase()}`;
    } else {
      return `Show is ${status?.toLocaleLowerCase()}`;
    }
  }

}
