import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorasVitasxdiaComponent } from './horas-vitasxdia.component';

describe('HorasVitasxdiaComponent', () => {
  let component: HorasVitasxdiaComponent;
  let fixture: ComponentFixture<HorasVitasxdiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorasVitasxdiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorasVitasxdiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
