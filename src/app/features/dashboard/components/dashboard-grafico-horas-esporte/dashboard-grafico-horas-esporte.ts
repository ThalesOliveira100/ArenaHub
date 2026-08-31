import { Component, effect, ElementRef, input, OnDestroy, viewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { MatCardModule } from '@angular/material/card';
import { GradeHorario } from '@core/models/grade-horario.model';
import { MatIcon } from "@angular/material/icon";

// Registra todos os componentes necessários do Chart.js
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard-grafico-horas-esporte',
  imports: [MatCardModule, MatIcon],
  templateUrl: './dashboard-grafico-horas-esporte.html',
  styleUrl: './dashboard-grafico-horas-esporte.scss',
})
export class DashboardGraficoHorasEsporte implements OnDestroy {
  // Captura a tag <canvas> do HTML de forma segura
  private canvasRef = viewChild<ElementRef<HTMLCanvasElement>>('graficoCanvas');
  private chartInstance?: Chart;

  grades = input.required<GradeHorario[]>();

  constructor() {
    effect(() => {
      const dadosGrade = this.grades();

      if (!dadosGrade || dadosGrade.length === 0) {
        if (this.chartInstance) this.chartInstance.destroy();
        return;
      };

      const dadosAgrupados = this.processarHorasPorEsporte(dadosGrade);
      const labels = Object.keys(dadosAgrupados);
      const valores = Object.values(dadosAgrupados);

      setTimeout(() => {
        this.renderizarGrafico(labels, valores);
      }, 300)
    });
  }

  ngOnDestroy(): void {
    if (this.chartInstance) this.chartInstance.destroy();
  }

  private processarHorasPorEsporte(horarios: any[]): { [esporte: string]: number } {
    const totalPorEsporte: { [esporte: string]: number } = {};

    horarios.forEach((h) => {
      if (!h.horaInicio || !h.horaFinal || !h.esporte) return;

      const duracaoHoras = this.calcularDiferencaEmHoras(h.horaInicio, h.horaFinal);
      const esporteFormatado = h.esporte.trim();

      totalPorEsporte[esporteFormatado] = (totalPorEsporte[esporteFormatado] || 0) + duracaoHoras;
    });
    return totalPorEsporte;
  }

  private calcularDiferencaEmHoras(inicio: string, fim: string): number {
    const [hInicio, mInicio] = inicio.split(':').map(Number);
    const [hFim, mFim] = fim.split(':').map(Number);

    const minutosInicio = hInicio * 60 + mInicio;
    const minutosFim = hFim * 60 + mFim;

    return (minutosFim - minutosInicio) / 60;
  }

  private renderizarGrafico(labels: string[], valores: number[]): void {
    const canvasElement = this.canvasRef()?.nativeElement;

    if (!canvasElement) {
      console.error('O elemento canvas ainda não está disponível no DOM!');
      return;
    }

    const ctx = canvasElement.getContext('2d');
    if (!ctx) return;

    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    this.chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Horas reservadas',
            data: valores,
            backgroundColor: "#007F53",
            borderWidth: 1,
            borderRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const valor = context.raw as number;
                return ` ${valor.toFixed(1)}h semanais reservadas`;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)',
            },
          },
          x: {
            grid: {
              display: false, // Remove as linhas de grade verticais para limpar o visual
            },
          },
        },
      },
    });
  }
}
