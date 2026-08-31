import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardGraficoConsumoMensalOcupacao } from './dashboard-grafico-consumo-mensal-ocupacao';

describe('DashboardGraficoConsumoMensalOcupacao', () => {
  let component: DashboardGraficoConsumoMensalOcupacao;
  let fixture: ComponentFixture<DashboardGraficoConsumoMensalOcupacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardGraficoConsumoMensalOcupacao],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardGraficoConsumoMensalOcupacao);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
