import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchViewComponent } from './search-view.component';
import { HttpClientModule } from '@angular/common/http';
import { TvShowService } from '../tv-show.service';
import { FavoritesService } from '../favorites.service';

describe('SearchViewComponent', () => {
  let component: SearchViewComponent;
  let fixture: ComponentFixture<SearchViewComponent>;
  const mockTvShowService = {};
  const mockFavoritesService = {};
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SearchViewComponent, HttpClientModule],
      providers: [
        { provide: TvShowService, useValue: mockTvShowService }, 
        { provide: FavoritesService, useValue: mockFavoritesService }
      ]
    });
    fixture = TestBed.createComponent(SearchViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
