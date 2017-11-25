import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloqueoContenidoComponent } from './bloqueo-contenido.component';

describe('BloqueoContenidoComponent', () => {
  let component: BloqueoContenidoComponent;
  let fixture: ComponentFixture<BloqueoContenidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloqueoContenidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloqueoContenidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
