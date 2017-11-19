import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentListEventComponent } from './content-list-evento.component';

describe('ContentListEventComponent', () => {
  let component: ContentListEventComponent;
  let fixture: ComponentFixture<ContentListEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentListEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentListEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
