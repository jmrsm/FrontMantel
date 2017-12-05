import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesSuperadminComponent } from './reportes-superadmin.component';

describe('ReportesSuperadminComponent', () => {
  let component: ReportesSuperadminComponent;
  let fixture: ComponentFixture<ReportesSuperadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportesSuperadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesSuperadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
