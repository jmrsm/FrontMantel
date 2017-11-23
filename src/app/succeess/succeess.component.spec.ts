import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SucceessComponent } from './succeess.component';

describe('SucceessComponent', () => {
  let component: SucceessComponent;
  let fixture: ComponentFixture<SucceessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SucceessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SucceessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
