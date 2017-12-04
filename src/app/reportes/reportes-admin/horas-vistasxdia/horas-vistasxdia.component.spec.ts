import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorasVistasxdiaComponent } from './horas-vistasxdia.component';

describe('HorasVistasxdiaComponent', () => {
  let component: HorasVistasxdiaComponent;
  let fixture: ComponentFixture<HorasVistasxdiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorasVistasxdiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorasVistasxdiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
