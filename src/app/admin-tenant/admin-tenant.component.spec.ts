import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTenantComponent } from './admin-tenant.component';

describe('AdminTenantComponent', () => {
  let component: AdminTenantComponent;
  let fixture: ComponentFixture<AdminTenantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTenantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
