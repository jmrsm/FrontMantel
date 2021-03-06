import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidoVivoComponent } from './contenido-vivo.component';

describe('ContenidoVivoComponent', () => {
  let component: ContenidoVivoComponent;
  let fixture: ComponentFixture<ContenidoVivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContenidoVivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenidoVivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
