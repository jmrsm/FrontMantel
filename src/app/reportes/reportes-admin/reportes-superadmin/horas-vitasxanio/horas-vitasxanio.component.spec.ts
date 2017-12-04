import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorasVitasxanioComponent } from './horas-vitasxanio.component';

describe('HorasVitasxanioComponent', () => {
  let component: HorasVitasxanioComponent;
  let fixture: ComponentFixture<HorasVitasxanioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorasVitasxanioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorasVitasxanioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
