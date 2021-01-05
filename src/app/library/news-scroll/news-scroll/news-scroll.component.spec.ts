import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsScrollComponent } from './news-scroll.component';

describe('NewsScrollComponent', () => {
  let component: NewsScrollComponent;
  let fixture: ComponentFixture<NewsScrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsScrollComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
