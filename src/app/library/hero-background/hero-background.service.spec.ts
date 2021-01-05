import { TestBed } from '@angular/core/testing';

import { HeroBackgroundService } from './hero-background.service';

describe('HeroBackgroundService', () => {
  let service: HeroBackgroundService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroBackgroundService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
