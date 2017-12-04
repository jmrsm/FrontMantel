import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosTotalesComponent } from './usuarios-totales.component';

describe('UsuariosTotalesComponent', () => {
  let component: UsuariosTotalesComponent;
  let fixture: ComponentFixture<UsuariosTotalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuariosTotalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosTotalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
