import { Component, computed, inject } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatNavList, MatDivider } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Logo } from '@shared/components/logo/logo';
import { DashboardHeader } from "@shared/components/dashboard-components/dashboard-header/dashboard-header";
import { AutenticacaoService } from '../../core/auth/autenticacao.service';
import { Router } from '@angular/router';
import { Footer } from "@shared/components/footer/footer";
import { DashboardCard } from '@shared/components/dashboard-components/dashboard-card/dashboard-card';
import { BreakpointObserver } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

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
    DashboardCard
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
  private authService = inject(AutenticacaoService);
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

  usuarioLogado = this.authService.usuarioLogado();

  cardsVisiveis = [
    {
      "title": "Quadras",
      "value": 4,
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
  ]

  onSideBarButtonClick() {

  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/'])
  }
}
