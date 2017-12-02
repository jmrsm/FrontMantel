import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReproSeriesComponent } from './repro-series.component';

describe('ReproSeriesComponent', () => {
  let component: ReproSeriesComponent;
  let fixture: ComponentFixture<ReproSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReproSeriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReproSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
