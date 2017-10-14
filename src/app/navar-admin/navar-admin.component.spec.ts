import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavarAdminComponent } from './navar-admin.component';

describe('NavarAdminComponent', () => {
  let component: NavarAdminComponent;
  let fixture: ComponentFixture<NavarAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavarAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavarAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
