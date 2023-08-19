import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { Pagination } from '../type';
import { PaginationDirective } from '../pagination.directive';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [PaginationDirective],
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginatorComponent {
  @Input({required: true}) pagination!: Pagination;
  @Output() goToPage: EventEmitter<number> = new EventEmitter<number>();
  constructor() { }
}
