import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorasVisualizadasComponent } from './horas-visualizadas.component';

describe('HorasVisualizadasComponent', () => {
  let component: HorasVisualizadasComponent;
  let fixture: ComponentFixture<HorasVisualizadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorasVisualizadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorasVisualizadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
