import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';
import { TvShowService } from './tv-show.service';
import { Pagination } from './type';

@Directive({
  selector: '[appPagination]',
  standalone: true
})
export class PaginationDirective {

  constructor(private tvShow: TvShowService, private element: ElementRef) { }

  @Input({required: true, alias: 'appPagination'}) pagination!: Pagination;

  @HostBinding('disabled')
  @HostBinding('class.secondary') get isDisabled() {
    switch(this.element.nativeElement.textContent) {
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

  @HostBinding('class.hidden') get isHidden() {
    return this.pagination.pages === 1;
  }

  @HostListener('click') updatePage() {
    let currentPage = this.pagination.page;
    switch(this.element.nativeElement.textContent) {
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
    this.tvShow.setPage(currentPage);
  }

}
