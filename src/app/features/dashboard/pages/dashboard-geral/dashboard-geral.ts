import { Component, computed, effect, inject, OnInit, output } from '@angular/core';
import { DashboardCard } from '@features/dashboard/components/dashboard-card/dashboard-card';
import { DashboardGraficoHorasEsporte } from '@features/dashboard/components/dashboard-grafico-horas-esporte/dashboard-grafico-horas-esporte';
import { DashboardGraficoConsumoMensalOcupacao } from '@features/dashboard/components/dashboard-grafico-consumo-mensal-ocupacao/dashboard-grafico-consumo-mensal-ocupacao';
import { BasicButton } from '@shared/components/basic-button/basic-button';
import { HeaderService } from '@core/services/header/header-service';
import { DashboardTable } from "@features/dashboard/components/dashboard-table/dashboard-table";
import { DashboardStateService } from '@core/services/dashboard-state-service';

const COMPONENTS = [
  DashboardCard,
  DashboardGraficoHorasEsporte,
  DashboardGraficoConsumoMensalOcupacao,
  BasicButton,
  DashboardTable
]

@Component({
  selector: 'app-dashboard-geral',
  imports: [
    COMPONENTS
],
  templateUrl: './dashboard-geral.html',
  styleUrl: './dashboard-geral.scss',
})
export class DashboardGeral {
  private headerService = inject(HeaderService);
  private dashboardState = inject(DashboardStateService);

  protected readonly usuarioLogado = this.dashboardState.usuarioLogado;
  protected readonly quadras = this.dashboardState.quadrasPorUsuario;
  protected readonly eventos = this.dashboardState.eventosDoUsuario;
  protected readonly eventosFormatados = this.dashboardState.eventosFormatados;
  protected readonly eventosFuturos = this.dashboardState.eventosFuturos;
  protected readonly grades = this.dashboardState.gradesDoUsuario;
  protected readonly dadosConsumo = this.dashboardState.dadosConsumoDoUsuario;
  protected readonly multas = this.dashboardState.todasAsMultas;
  protected readonly multasPendentes = this.dashboardState.multasPendentes;

  constructor() {
    const nome = this.usuarioLogado()!.nome;
    const perfil = this.usuarioLogado()!.perfil;

    effect(() => {
      this.headerService.definirCabecalho(
        'Dashboard',
        `Olá, ${nome}`,
        `Perfil ${perfil} · visão geral das quadras sob sua responsabilidade.`,
        {
          label: "Ver Relatórios",
          action: () => {},
        }
      );
    });
  };

  protected readonly cardsVisiveis = computed(() => [
    {
      title: 'Quadras',
      value: this.quadras().length,
      subtitle: 'sob gestão',
      icon: 'pin_drop',
    },
    {
      title: 'Horários ocupados',
      value: this.grades().length,
      subtitle: `de ${this.grades().length} na grade`,
      icon: 'timer',
    },
    {
      title: 'Eventos ativos',
      value: this.eventosFuturos().length,
      subtitle: 'programados',
      icon: 'calendar_month',
    },
    {
      title: 'Equipamentos',
      value: 4,
      subtitle: 'itens patrimoniados',
      icon: 'storage',
    },
    {
      title: 'Multas em aberto',
      value: this.multasPendentes().length,
      subtitle: 'R$ 150',
      icon: 'description',
    },
  ]);
}
