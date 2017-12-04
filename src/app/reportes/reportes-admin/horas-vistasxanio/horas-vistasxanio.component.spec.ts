import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorasVistasxanioComponent } from './horas-vistasxanio.component';

describe('HorasVistasxanioComponent', () => {
  let component: HorasVistasxanioComponent;
  let fixture: ComponentFixture<HorasVistasxanioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorasVistasxanioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorasVistasxanioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
