import { Component, computed, inject } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatNavList, MatDivider } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Logo } from '@shared/components/logo/logo';
import { DashboardHeader } from "@features/dashboard/components/dashboard-header/dashboard-header";
import { AutenticacaoService } from '@core/auth/autenticacao.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Footer } from "@shared/components/footer/footer";
import { BreakpointObserver } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { HeaderService } from '@core/services/header-service';

const MODULES = [
  MatIcon,
  MatSidenavModule,
  MatButtonModule,
  MatBadgeModule,
  MatNavList,
  MatToolbarModule,
  MatDivider,
  RouterLink,
  RouterOutlet
]

const COMPONENTS = [
    Logo,
    DashboardHeader,
    Footer,
]

@Component({
  selector: 'app-dashboard',
  imports: [
    MODULES,
    COMPONENTS
],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  // SERVICES
  private authService = inject(AutenticacaoService);
  protected headerService = inject(HeaderService);
  private router = inject(Router);
  private breakpointObserver = inject(BreakpointObserver);

  protected readonly usuarioLogado = this.authService.usuarioLogado;

  protected isDesktop = toSignal(
    this.breakpointObserver.observe('(min-width: 768px)').pipe(
      map(result => result.matches)
    ),
    { initialValue: window.innerWidth >= 768 }
  );

  protected readonly sidenavMode = computed(() => this.isDesktop() ? 'side' : 'over');
  protected readonly sidenavOpened = computed(() => this.isDesktop());

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/'])
  }
}
