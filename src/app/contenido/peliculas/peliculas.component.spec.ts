import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeliculasComponentUnidad } from './peliculas.component';

describe('PeliculasComponentUnidad', () => {
  let component: PeliculasComponentUnidad;
  let fixture: ComponentFixture<PeliculasComponentUnidad>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeliculasComponentUnidad ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeliculasComponentUnidad);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
