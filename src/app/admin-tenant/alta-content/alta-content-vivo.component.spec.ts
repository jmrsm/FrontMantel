import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaContentVivoComponent } from './alta-content-vivo.component';

describe('AltaContentVivoComponent', () => {
  let component: AltaContentVivoComponent;
  let fixture: ComponentFixture<AltaContentVivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaContentVivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaContentVivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
