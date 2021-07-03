import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAdministradorComponent } from './main-administrador.component';

describe('MainAdministradorComponent', () => {
  let component: MainAdministradorComponent;
  let fixture: ComponentFixture<MainAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainAdministradorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
