import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesComponentUnidad } from './series.component';

describe('SeriesComponentUnidad', () => {
  let component: SeriesComponentUnidad;
  let fixture: ComponentFixture<SeriesComponentUnidad>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeriesComponentUnidad ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesComponentUnidad);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
