import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvCanthorasComponent } from './prov-canthoras.component';

describe('ProvCanthorasComponent', () => {
  let component: ProvCanthorasComponent;
  let fixture: ComponentFixture<ProvCanthorasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvCanthorasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvCanthorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
