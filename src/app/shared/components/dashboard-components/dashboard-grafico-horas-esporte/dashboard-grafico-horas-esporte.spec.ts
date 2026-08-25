import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardGraficoHorasEsporte } from './dashboard-grafico-horas-esporte';

describe('DashboardGraficoHorasEsporte', () => {
  let component: DashboardGraficoHorasEsporte;
  let fixture: ComponentFixture<DashboardGraficoHorasEsporte>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardGraficoHorasEsporte],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardGraficoHorasEsporte);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
