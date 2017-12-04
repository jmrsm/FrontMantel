import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorasVistasxsemanaComponent } from './horas-vistasxsemana.component';

describe('HorasVistasxsemanaComponent', () => {
  let component: HorasVistasxsemanaComponent;
  let fixture: ComponentFixture<HorasVistasxsemanaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorasVistasxsemanaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorasVistasxsemanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
