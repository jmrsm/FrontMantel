import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorasVitasxmesComponent } from './horas-vitasxmes.component';

describe('HorasVitasxmesComponent', () => {
  let component: HorasVitasxmesComponent;
  let fixture: ComponentFixture<HorasVitasxmesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorasVitasxmesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorasVitasxmesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
