import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesMesualDepartamentoComponent } from './reportes-mesual-departamento.component';

describe('ReportesMesualDepartamentoComponent', () => {
  let component: ReportesMesualDepartamentoComponent;
  let fixture: ComponentFixture<ReportesMesualDepartamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportesMesualDepartamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesMesualDepartamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
