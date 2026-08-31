import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPerfil } from './dashboard-perfil';

describe('DashboardPerfil', () => {
  let component: DashboardPerfil;
  let fixture: ComponentFixture<DashboardPerfil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardPerfil],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardPerfil);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
