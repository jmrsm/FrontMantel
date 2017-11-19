import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaEpisodioComponent } from './alta-episodios.component';

describe('AltaEpisodioComponent', () => {
  let component: AltaEpisodioComponent;
  let fixture: ComponentFixture<AltaEpisodioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaEpisodioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaEpisodioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
