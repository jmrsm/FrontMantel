import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaContentComponent } from './alta-content.component';

describe('AltaContentComponent', () => {
  let component: AltaContentComponent;
  let fixture: ComponentFixture<AltaContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
