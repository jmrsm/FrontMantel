import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidoFavnvistoComponent } from './contenido-favnvisto.component';

describe('ContenidoFavnvistoComponent', () => {
  let component: ContenidoFavnvistoComponent;
  let fixture: ComponentFixture<ContenidoFavnvistoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContenidoFavnvistoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenidoFavnvistoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
