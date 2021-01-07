import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EqPlayheadComponent } from './eq-playhead.component';

describe('EqPlayheadComponent', () => {
  let component: EqPlayheadComponent;
  let fixture: ComponentFixture<EqPlayheadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EqPlayheadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EqPlayheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
