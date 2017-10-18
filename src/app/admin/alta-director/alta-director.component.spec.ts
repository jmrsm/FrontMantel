import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaDirectorComponent } from './alta-director.component';

describe('AltaDirectorComponent', () => {
  let component: AltaDirectorComponent;
  let fixture: ComponentFixture<AltaDirectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaDirectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaDirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
