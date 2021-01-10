import { TestBed } from '@angular/core/testing';

import { ScrollingTextService } from './scrolling-text.service';

describe('ScrollingTextService', () => {
  let service: ScrollingTextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrollingTextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
