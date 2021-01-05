import { TestBed } from '@angular/core/testing';

import { NewsScrollService } from './news-scroll.service';

describe('NewsScrollService', () => {
  let service: NewsScrollService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsScrollService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
