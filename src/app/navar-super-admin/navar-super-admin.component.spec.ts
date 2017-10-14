import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavarSuperAdminComponent } from './navar-super-admin.component';

describe('NavarSuperAdminComponent', () => {
  let component: NavarSuperAdminComponent;
  let fixture: ComponentFixture<NavarSuperAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavarSuperAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavarSuperAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
