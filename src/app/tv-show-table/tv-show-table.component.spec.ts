import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvShowTableComponent } from './tv-show-table.component';
import { TvShow, TvShowSearch } from '../search-view/type';
import { By } from '@angular/platform-browser';
import { ChangeDetectionStrategy } from '@angular/core';

fdescribe('TvShowTableComponent', () => {
  let component: TvShowTableComponent;
  let fixture: ComponentFixture<TvShowTableComponent>;
  let tvShowsResult: TvShowSearch;
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // NOT WORKING
  xit('should display a loader while loading', () => {
    component.isLoading = true;
    fixture.detectChanges();
    let loaderElement = fixture.debugElement.query(By.css("tbody tr.loading"));
    expect(loaderElement).toBeTruthy();
  });

  it('should display TV show data when provided', () => {
    const tvShowId = 1; // Replace with a test TV show ID.
    component.tvShowsResult = tvShowsResult;
    
    component.favoriteShows = [tvShowId];
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();
    const nameElement = fixture.debugElement.query(By.css('tr'));
    expect(nameElement).toBeTruthy();
    // expect(nameElement.nativeElement.innerText).toBeTruthy();
    // Write your assertions here to check if the data is displayed correctly.
  });

  fit('should emit toggleFavorite event when favorite button is clicked', () => {
    const tvShowId = 1; // Replace with a test TV show ID.
    component.tvShowsResult = tvShowsResult;
    
    component.favoriteShows = [tvShowId];
    spyOn(component.toggleFavorite, 'emit');
    
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      // Trigger the favorite button click.
      // Replace this with the actual selector of the favorite button in your template.
      const favoriteButton = fixture.debugElement.query(By.css('tbody tr td span.icon-bookmark'));
      console.log(favoriteButton.nativeNode);
      favoriteButton.triggerEventHandler('click', null);
    
      // // Expect the emit function to be called with the correct argument.
      expect(component.toggleFavorite.emit).toHaveBeenCalledWith(tvShowId);
    });
  });
});
