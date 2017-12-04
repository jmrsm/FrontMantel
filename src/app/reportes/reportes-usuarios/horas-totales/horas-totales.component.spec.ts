import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorasTotalesComponent } from './horas-totales.component';

describe('HorasTotalesComponent', () => {
  let component: HorasTotalesComponent;
  let fixture: ComponentFixture<HorasTotalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorasTotalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorasTotalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
