import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RacingClockComponent } from './racing-clock.component';

describe('RacingClockComponent', () => {
  let component: RacingClockComponent;
  let fixture: ComponentFixture<RacingClockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RacingClockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RacingClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
