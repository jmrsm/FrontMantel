import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidoCategoriaComponent } from './contenido-categoria.component';

describe('ContenidoCategoriaComponent', () => {
  let component: ContenidoCategoriaComponent;
  let fixture: ComponentFixture<ContenidoCategoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContenidoCategoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenidoCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
