import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorasVistasxmesComponent } from './horas-vistasxmes.component';

describe('HorasVistasxmesComponent', () => {
  let component: HorasVistasxmesComponent;
  let fixture: ComponentFixture<HorasVistasxmesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorasVistasxmesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorasVistasxmesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
