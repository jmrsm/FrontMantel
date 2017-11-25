import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloqueoUsuarioComponent } from './bloqueo-usuario.component';

describe('BloqueoUsuarioComponent', () => {
  let component: BloqueoUsuarioComponent;
  let fixture: ComponentFixture<BloqueoUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloqueoUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloqueoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
