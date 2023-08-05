import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvShowTableComponent } from './tv-show-table.component';
import { TvShow, TvShowSearch } from '../search-view/type';
import { By } from '@angular/platform-browser';
import { ChangeDetectionStrategy } from '@angular/core';
import { first } from 'rxjs/operators';

describe('TvShowTableComponent', () => {
  let component: TvShowTableComponent;
  let fixture: ComponentFixture<TvShowTableComponent>;
  let tvShowsResult: TvShowSearch;
  let tvShowId: number;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TvShowTableComponent]
    }).overrideComponent(TvShowTableComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    })
    fixture = TestBed.createComponent(TvShowTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tvShowsResult = {
      total: '',
      page: 1,
      pages: 0,
      tv_shows: [{
        id: 1,
        name: "one",
        permalink: "www.google.ca",
        start_date: "1-2-2000",
        end_date: "",
        country: "Canada",
        network: "BELL",
        status: 'New Series',
        image_thumbnail_path: "www.google.ca"
      } as TvShow]
    };
    tvShowId = tvShowsResult.tv_shows[0].id;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a loader while loading', () => {
    component.isLoading = true;
    fixture.detectChanges();
    let loaderElement = fixture.debugElement.query(By.css("tbody tr.loading"));
    expect(loaderElement).toBeTruthy();
  });

  fit('should display TV show data when provided', () => {
    component.tvShowsResult = tvShowsResult;
    
    component.favoriteShows = [tvShowId];
    fixture.detectChanges();
    const nameElement = fixture.debugElement.query(By.css('tr'));
    expect(nameElement.nativeElement.innerText).toBe(tvShowsResult);
    // Write your assertions here to check if the data is displayed correctly.
  });

  it('should emit toggleFavorite event when favorite button is clicked', () => {
    let actualTvShowId: number | undefined;
    let expectTvShowId: number = tvShowId;
    component.tvShowsResult = tvShowsResult;
    component.favoriteShows = [tvShowId];
    
    // launch the event emitter to set actualTvShowId once clicking
    component.toggleFavorite.pipe(first()).subscribe((tvShowId: number) => actualTvShowId = tvShowId);
    fixture.detectChanges();

    // query data
    const favoriteButton = fixture.debugElement.query(By.css('tbody tr td span.icon-bookmark'));
    favoriteButton.triggerEventHandler('click');
    expect(actualTvShowId).toBe(expectTvShowId);
  });

  // for how to use asynchronize function test
  // fit('should emit toggleFavorite event when favorite button is clicked', (done: DoneFn) => {
  //   component.tvShowsResult = tvShowsResult;
  //   component.favoriteShows = [tvShowId];
    
  //   spyOn(component.toggleFavorite, 'emit');
  //   fixture.detectChanges();
  //   fixture.whenStable().then(() => {
  //     // Trigger the favorite button click.
  //     // Replace this with the actual selector of the favorite button in your template.
  //     const favoriteButton = fixture.debugElement.query(By.css('tbody tr td span.icon-bookmark'));
  //     favoriteButton.triggerEventHandler('click', null);
  //     expect(component.toggleFavorite.emit).toHaveBeenCalledWith(tvShowId);
  //     done();
  //   });
  // });
});
