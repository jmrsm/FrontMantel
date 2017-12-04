import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesUsuariosComponent } from './reportes-usuarios.component';

describe('ReportesUsuariosComponent', () => {
  let component: ReportesUsuariosComponent;
  let fixture: ComponentFixture<ReportesUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportesUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
