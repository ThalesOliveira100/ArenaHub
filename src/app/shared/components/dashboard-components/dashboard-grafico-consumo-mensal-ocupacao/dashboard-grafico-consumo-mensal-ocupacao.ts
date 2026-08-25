import { Component, effect, ElementRef, input, OnDestroy, viewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from '@angular/material/icon';
import { RelatorioConsumo } from '@core/models/relatorio-consumo.model';

// Registra todos os componentes necessários do Chart.js
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard-grafico-consumo-mensal-ocupacao',
  imports: [MatCardModule, MatIconModule],
  templateUrl: './dashboard-grafico-consumo-mensal-ocupacao.html',
  styleUrl: './dashboard-grafico-consumo-mensal-ocupacao.scss',
})
export class DashboardGraficoConsumoMensalOcupacao implements OnDestroy {
  private canvasRef = viewChild<ElementRef<HTMLCanvasElement>>('graficoConsumoCanvas');
  private chartInstance?: Chart;

  dadosConsumo = input.required<RelatorioConsumo[]>();

  constructor() {
    effect(() => {
      const dados = this.dadosConsumo();

      if (!dados || dados.length === 0) {
        if (this.chartInstance) this.chartInstance.destroy();
        return;
      };

      const { labels, dadosEnergia, dadosAgua, dadosOcupacao } = this.processarDadosDeConsumo(dados);

      setTimeout(() => {
        this.renderizarGrafico(labels, dadosEnergia, dadosAgua, dadosOcupacao);
      }, 300)
    });
  };

  ngOnDestroy(): void {
    if (this.chartInstance) this.chartInstance.destroy();
  };

  private processarDadosDeConsumo(dados: RelatorioConsumo[]) {
    const dadosOrdenados = [...dados].sort((a, b) => {
      if (a.ano !== b.ano) return a.ano - b.ano;
      return a.mes - b.mes;
    });

    const agrupado: { [key: string] : { energia: number, agua: number, ocupacaoSoma: number, qtd: number } } = {};

    dadosOrdenados.forEach(item => {
      const label = `${this.obterNomeMesAbreviado(item.mes)}/${item.ano}`;
      if (!agrupado[label]) {
        agrupado[label] = { energia: 0, agua: 0, ocupacaoSoma: 0, qtd: 0 };
      }
      agrupado[label].energia += item.energiaKwh;
      agrupado[label].agua += item.aguaM3;

      const taxaOcupacao = (item as any).ocupacaoPercentual ?? 0;
      agrupado[label].ocupacaoSoma += taxaOcupacao;
      agrupado[label].qtd += 1;
    });

    return {
      labels: Object.keys(agrupado),
      dadosEnergia: Object.values(agrupado).map(v => v.energia),
      dadosAgua: Object.values(agrupado).map(v => v.agua),
      dadosOcupacao: Object.values(agrupado).map(v => {
      const divisor = v.qtd || 1;
      return Math.round(v.ocupacaoSoma / divisor);
    })
    };
  }

  private obterNomeMesAbreviado(mes: number): string {
    const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

    return meses[mes - 1] || '';
  }

  private renderizarGrafico(labels: string[], energia: number[], agua: number[], ocupacao: number[]): void {
    const canvasElement = this.canvasRef()?.nativeElement;

    if (!canvasElement) return;

    const ctx = canvasElement.getContext('2d');
    if (!ctx) return;

    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    this.chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Energia (kWh)',
            data: energia,
            borderColor: '#ffd740',
            backgroundColor: 'rgba(255, 215, 64, 0.08)',
            borderWidth: 3,
            tension: 0.35,
            fill: true,
            yAxisID: 'yEnergia',
            pointBackgroundColor: '#ffd740',
            pointRadius: 4,
            pointHoverRadius: 6
          },
          {
            label: 'Água (m³)',
            data: agua,
            borderColor: '#2196f3',
            backgroundColor: 'rgba(33, 150, 243, 0.08)',
            borderWidth: 3,
            tension: 0.35,
            fill: true,
            yAxisID: 'yAgua',
            pointBackgroundColor: '#2196f3',
            pointRadius: 4,
            pointHoverRadius: 6
          },
          {
            label: 'Ocupação (%)',
            data: ocupacao,
            borderColor: '#4caf50', // Verde
            backgroundColor: 'rgba(76, 175, 80, 0.03)',
            borderWidth: 3,
            tension: 0.35,
            fill: true,
            yAxisID: 'yOcupacao',
            pointBackgroundColor: '#4caf50',
            pointRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              boxWidth: 12,
              font: { family: 'Roboto, sans-serif', size: 12 }
            }
          },
          tooltip: {
            mode: 'index',
            intersect: false
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          yEnergia: {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
              display: true,
              text: 'Consumo de Energia (kWh)',
              font: { weight: 'bold' }
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.04)'
            }
          },
          yAgua: {
            type: 'linear',
            display: true,
            position: 'right',
            title: {
              display: true,
              text: 'Consumo de Água (m³)',
              font: { weight: 'bold' }
            },
            grid: {
              drawOnChartArea: false
            }
          },
          yOcupacao: {
            type: 'linear',
            display: true,
            position: 'right',
            title: {
              display: true,
              text: 'Ocupação da Quadra (%)',
              font: { weight: 'bold' }
            },
            grid: {
              drawOnChartArea: false
            }
          }
        }
      }
    });
  };
}
