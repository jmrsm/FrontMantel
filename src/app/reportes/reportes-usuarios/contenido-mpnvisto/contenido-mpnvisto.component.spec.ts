import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidoMpnvistoComponent } from './contenido-mpnvisto.component';

describe('ContenidoMpnvistoComponent', () => {
  let component: ContenidoMpnvistoComponent;
  let fixture: ComponentFixture<ContenidoMpnvistoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContenidoMpnvistoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenidoMpnvistoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
