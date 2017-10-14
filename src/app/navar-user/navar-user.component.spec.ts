import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavarUserComponent } from './navar-user.component';

describe('NavarUserComponent', () => {
  let component: NavarUserComponent;
  let fixture: ComponentFixture<NavarUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavarUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavarUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
