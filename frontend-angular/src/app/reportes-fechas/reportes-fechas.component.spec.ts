import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesFechasComponent } from './reportes-fechas.component';

describe('ReportesFechasComponent', () => {
  let component: ReportesFechasComponent;
  let fixture: ComponentFixture<ReportesFechasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportesFechasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesFechasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
