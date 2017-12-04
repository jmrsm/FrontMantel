import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvCantidadComponent } from './prov-cantidad.component';

describe('ProvCantidadComponent', () => {
  let component: ProvCantidadComponent;
  let fixture: ComponentFixture<ProvCantidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvCantidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvCantidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
