import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosHabilitComponent } from './usuarios-habilit.component';

describe('UsuariosHabilitComponent', () => {
  let component: UsuariosHabilitComponent;
  let fixture: ComponentFixture<UsuariosHabilitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuariosHabilitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosHabilitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
