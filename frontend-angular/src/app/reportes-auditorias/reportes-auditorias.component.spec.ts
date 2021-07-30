import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesAuditoriasComponent } from './reportes-auditorias.component';

describe('ReportesAuditoriasComponent', () => {
  let component: ReportesAuditoriasComponent;
  let fixture: ComponentFixture<ReportesAuditoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportesAuditoriasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesAuditoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
