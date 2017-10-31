import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcontentliveComponent } from './viewcontentlive.component';

describe('ViewcontentliveComponent', () => {
  let component: ViewcontentliveComponent;
  let fixture: ComponentFixture<ViewcontentliveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewcontentliveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewcontentliveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
