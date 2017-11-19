import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentEventComponent } from './content-evento.component';

describe('ContentEventComponent', () => {
  let component: ContentEventComponent;
  let fixture: ComponentFixture<ContentEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
