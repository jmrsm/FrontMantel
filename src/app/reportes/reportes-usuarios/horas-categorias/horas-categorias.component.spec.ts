import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorasCategoriasComponent } from './horas-categorias.component';

describe('HorasCategoriasComponent', () => {
  let component: HorasCategoriasComponent;
  let fixture: ComponentFixture<HorasCategoriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorasCategoriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorasCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
