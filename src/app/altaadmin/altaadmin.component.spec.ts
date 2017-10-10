import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaadminComponent } from './altaadmin.component';

describe('AltaadminComponent', () => {
  let component: AltaadminComponent;
  let fixture: ComponentFixture<AltaadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
