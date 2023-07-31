import { TestBed } from '@angular/core/testing';

import { TvShowService } from './tv-show.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TvShowService', () => {
  let service: TvShowService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TvShowService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TvShowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not loading by default', () => {
    expect(service.isLoadingSignal()).toBeFalsy();
    expect(service.searchResultSignal()).toBeNull();
  });

  it('should loading signals after calling api', () => {

    // TODO
  });
});
