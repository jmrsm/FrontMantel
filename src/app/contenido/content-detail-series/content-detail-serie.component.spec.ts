import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentDetailSerieComponent } from './content-detail-serie.component';

describe('ContentDetailSerieComponent', () => {
  let component: ContentDetailSerieComponent;
  let fixture: ComponentFixture<ContentDetailSerieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentDetailSerieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentDetailSerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
