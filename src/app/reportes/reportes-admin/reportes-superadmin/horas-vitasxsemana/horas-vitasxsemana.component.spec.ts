import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorasVitasxsemanaComponent } from './horas-vitasxsemana.component';

describe('HorasVitasxsemanaComponent', () => {
  let component: HorasVitasxsemanaComponent;
  let fixture: ComponentFixture<HorasVitasxsemanaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorasVitasxsemanaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorasVitasxsemanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
