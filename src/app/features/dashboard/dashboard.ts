import { RelatoriosConsumoService } from './../../core/services/relatorios-consumo-service';
import { QuadrasService } from '@core/services/quadras-service';
import { Component, computed, inject } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatNavList, MatDivider } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Logo } from '@shared/components/logo/logo';
import { DashboardHeader } from "@shared/components/dashboard-components/dashboard-header/dashboard-header";
import { AutenticacaoService } from '@core/auth/autenticacao.service';
import { Router } from '@angular/router';
import { Footer } from "@shared/components/footer/footer";
import { DashboardCard } from '@shared/components/dashboard-components/dashboard-card/dashboard-card';
import { BreakpointObserver } from '@angular/cdk/layout';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { forkJoin, map, of, switchMap } from 'rxjs';
import { DashboardGraficoHorasEsporte } from "@shared/components/dashboard-components/dashboard-grafico-horas-esporte/dashboard-grafico-horas-esporte";
import { GradeHorarioService } from '@core/services/grade-horario-service';
import { DashboardGraficoConsumoMensalOcupacao } from "@shared/components/dashboard-components/dashboard-grafico-consumo-mensal-ocupacao/dashboard-grafico-consumo-mensal-ocupacao";

const MODULES = [
  MatIcon,
  MatSidenavModule,
  MatButtonModule,
  MatBadgeModule,
  MatNavList,
  MatToolbarModule,
  MatDivider,
]

const COMPONENTS = [
    Logo,
    DashboardHeader,
    Footer,
    DashboardCard,
    DashboardGraficoHorasEsporte,
    DashboardGraficoConsumoMensalOcupacao,
]

@Component({
  selector: 'app-dashboard',
  imports: [
    MODULES,
    COMPONENTS,
],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  // SERVICES
  private authService = inject(AutenticacaoService);
  private quadrasService = inject(QuadrasService);
  private gradesService = inject(GradeHorarioService);
  private relatoriosConsumoService = inject(RelatoriosConsumoService);

  private router = inject(Router);
  private breakpointObserver = inject(BreakpointObserver);

  protected isDesktop = toSignal(
    this.breakpointObserver.observe('(min-width: 768px)').pipe(
      map(result => result.matches)
    ),
    { initialValue: window.innerWidth >= 768 }
  );

  protected readonly sidenavMode = computed(() => this.isDesktop() ? 'side' : 'over');
  protected readonly sidenavOpened = computed(() => this.isDesktop());

  protected readonly usuarioLogado = this.authService.usuarioLogado;

  protected readonly quadrasPorUsuario = toSignal(
    toObservable(this.usuarioLogado).pipe(
      switchMap(usuario => {
        if (!usuario || !usuario?.id) return of([]);
        if (usuario.perfil === 'MONITOR') return this.quadrasService.getQuadrasByMonitor(usuario.id);
        if (usuario.perfil === 'GESTOR') return this.quadrasService.getQuadrasByGestor(usuario.id);
        if (usuario.perfil === 'ADMIN') return this.quadrasService.getQuadras();

        return of([]);
      })
    ),
    { initialValue: [] }
  );

  protected readonly gradesDoUsuario = toSignal(
    toObservable(this.usuarioLogado).pipe(
      switchMap(usuario => {
        if (!usuario || !usuario.id) {
          return of([]);
        };

        if (usuario.perfil === 'ADMIN') {
          return this.gradesService.getGradeHorarios();
        }

        const quadras = this.quadrasPorUsuario();
        if (quadras.length === 0) {
          return of([]);
        }

        const ids = quadras.map(q => q.id);
        return this.quadrasService.getGradesHorariosByQuadras(ids);
      })
    ),
    { initialValue: [] }
  );

  protected readonly dadosConsumoDoUsuario = toSignal(
    toObservable(this.quadrasPorUsuario).pipe(
      switchMap(quadras => {
        const usuario = this.usuarioLogado();

        if (!quadras || quadras.length === 0 || !usuario || usuario.perfil === 'PUBLICO') return of([]);

        if (usuario.perfil === 'ADMIN') {
          return this.relatoriosConsumoService.getDadosConsumo();
        }

        const requests = quadras.map(q => this.relatoriosConsumoService.getDadosConsumo(String(q.id)));

        return forkJoin(requests).pipe(
          map(resultados => resultados.flat())
        )
      })
    ),
    { initialValue: [] }
  );

  protected readonly dadosConsumoMensalOcupacaoQuadra = computed(() => {
    return this.dadosConsumoDoUsuario();
  });

  protected readonly cardsVisiveis = computed(() => [
    {
      "title": "Quadras",
      "value": this.quadrasPorUsuario().length,
      "subtitle": "sob gestão",
      "icon": "pin_drop"
    },
    {
      "title": "Horários ocupados",
      "value": 3,
      "subtitle": "de 6 na grade",
      "icon": "timer"
    },
    {
      "title": "Eventos ativos",
      "value": 3,
      "subtitle": "programados",
      "icon": "calendar_month"
    },
    {
      "title": "Equipamentos",
      "value": 4,
      "subtitle": "itens patrimoniados",
      "icon": "storage"
    },
    {
      "title": "Multas em aberto",
      "value": 2,
      "subtitle": "R$ 350",
      "icon": "description"
    },
  ])

  onSideBarButtonClick():void {
    console.log(this.quadrasPorUsuario());
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/'])
  }
}
