import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentCatComponent } from './content.catComponent';

describe('ContentCatComponent', () => {
  let component: ContentCatComponent;
  let fixture: ComponentFixture<ContentCatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentCatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
