import { QuadrasService } from '@core/services/quadras-service';
import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { DashboardCard } from '@features/dashboard/components/dashboard-card/dashboard-card';
import { DashboardGraficoHorasEsporte } from '@features/dashboard/components/dashboard-grafico-horas-esporte/dashboard-grafico-horas-esporte';
import { DashboardGraficoConsumoMensalOcupacao } from '@features/dashboard/components/dashboard-grafico-consumo-mensal-ocupacao/dashboard-grafico-consumo-mensal-ocupacao';
import { Usuario } from '@core/models/usuario.model';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { forkJoin, map, of, switchMap } from 'rxjs';
import { GradeHorarioService } from '@core/services/grade-horario-service';
import { RelatoriosConsumoService } from '@core/services/relatorios-consumo-service';
import { MatButtonModule } from '@angular/material/button';
import { BasicButton } from '@shared/components/basic-button/basic-button';
import { HeaderService } from '@core/services/header-service';
import { AutenticacaoService } from '@core/auth/autenticacao.service';

const MODULES = [
  MatButtonModule,
]

const COMPONENTS = [
  DashboardCard,
  DashboardGraficoHorasEsporte,
  DashboardGraficoConsumoMensalOcupacao,
  BasicButton,
]

@Component({
  selector: 'app-dashboard-geral',
  imports: [
    MODULES,
    COMPONENTS,
  ],
  templateUrl: './dashboard-geral.html',
  styleUrl: './dashboard-geral.scss',
})
export class DashboardGeral implements OnInit {
  private headerService = inject(HeaderService);
  private authService = inject(AutenticacaoService);
  private quadrasService = inject(QuadrasService);
  private gradesService = inject(GradeHorarioService);
  private relatoriosConsumoService = inject(RelatoriosConsumoService);

  protected readonly usuarioLogado = this.authService.usuarioLogado as Signal<Usuario>;


  ngOnInit(): void {
    const nome = this.usuarioLogado().nome || 'Usuário';
    const perfil = this.usuarioLogado().perfil || 'PUBLICO';

    this.headerService.definirCabecalho(
      'Dashboard',
      `Olá, ${nome}`,
      `Perfil ${perfil} · visão geral das quadras sob sua responsabilidade.`
    )
  }

  protected readonly quadrasPorUsuario = toSignal(
    toObservable(this.usuarioLogado).pipe(
      switchMap((usuario) => {
        if (!usuario || !usuario?.id) return of([]);
        if (usuario.perfil === 'MONITOR')
          return this.quadrasService.getQuadrasByMonitor(usuario.id);
        if (usuario.perfil === 'GESTOR') return this.quadrasService.getQuadrasByGestor(usuario.id);
        if (usuario.perfil === 'ADMIN') return this.quadrasService.getQuadras();

        return of([]);
      }),
    ),
    { initialValue: [] },
  );

  protected readonly gradesDoUsuario = toSignal(
    toObservable(this.usuarioLogado).pipe(
      switchMap((usuario) => {
        if (!usuario || !usuario.id) {
          return of([]);
        }

        if (usuario.perfil === 'ADMIN') {
          return this.gradesService.getGradeHorarios();
        }

        const quadras = this.quadrasPorUsuario();
        if (quadras.length === 0) {
          return of([]);
        }

        const ids = quadras.map((q) => q.id);
        return this.quadrasService.getGradesHorariosByQuadras(ids);
      }),
    ),
    { initialValue: [] },
  );

  protected readonly dadosConsumoDoUsuario = toSignal(
    toObservable(this.quadrasPorUsuario).pipe(
      switchMap((quadras) => {
        const usuario = this.usuarioLogado();

        if (!quadras || quadras.length === 0 || !usuario || usuario.perfil === 'PUBLICO')
          return of([]);

        if (usuario.perfil === 'ADMIN') {
          return this.relatoriosConsumoService.getDadosConsumo();
        }

        const requests = quadras.map((q) =>
          this.relatoriosConsumoService.getDadosConsumo(String(q.id)),
        );

        return forkJoin(requests).pipe(map((resultados) => resultados.flat()));
      }),
    ),
    { initialValue: [] },
  );

  protected readonly dadosConsumoMensalOcupacaoQuadra = computed(() => {
    return this.dadosConsumoDoUsuario();
  });

  protected readonly cardsVisiveis = computed(() => [
    {
      title: 'Quadras',
      value: this.quadrasPorUsuario().length,
      subtitle: 'sob gestão',
      icon: 'pin_drop',
    },
    {
      title: 'Horários ocupados',
      value: 3,
      subtitle: 'de 6 na grade',
      icon: 'timer',
    },
    {
      title: 'Eventos ativos',
      value: 3,
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
      value: 2,
      subtitle: 'R$ 350',
      icon: 'description',
    },
  ]);
}
