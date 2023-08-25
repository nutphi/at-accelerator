import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { Pagination } from './type';

@Directive({
  selector: '[appPagination]',
  standalone: true
})
export class PaginationDirective {
  toPage!: number;
  textContent!: string;
  constructor(private element: ElementRef) { }

  @Input({required: true, alias: 'appPagination'}) pagination!: Pagination;
  @Input() type!: '<<' | '<' | '>' | '>>';
  @Input() isLoading!: boolean;
  @Output() goToPage: EventEmitter<number> = new EventEmitter<number>();

  @HostBinding('disabled')
  @HostBinding('class.secondary') get isDisabled() {
    if (this.isLoading) {
      return true;
    }
    switch(this.type) {
      case '<<':
      case '<':
        return this.pagination.page <= 1;
      case '>':
      case '>>':
        return this.pagination.page >= this.pagination.pages;
      default:
        return false;
    }
  }

  @HostBinding('textContent') get contentChanges () {
    let currentPage = this.pagination.page;
    switch(this.type) {
      case '<<':
        currentPage = 1;
        break;
      case '<':
        currentPage -= 1;
        break;
      case '>':
        currentPage += 1;
        break;
      case '>>':
        currentPage = this.pagination.pages;
        break;
    }
    this.toPage = currentPage;
    return this.element.nativeElement.textContent;
  }

  @HostListener('click') updatePage() {
    this.goToPage.emit(this.toPage);
  }

}
