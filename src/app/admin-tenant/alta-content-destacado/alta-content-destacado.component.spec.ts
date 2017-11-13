import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaContentDestacadoComponent } from './alta-content-destacado.component';

describe('AltaContentDestacadoComponent', () => {
  let component: AltaContentDestacadoComponent;
  let fixture: ComponentFixture<AltaContentDestacadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaContentDestacadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaContentDestacadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
