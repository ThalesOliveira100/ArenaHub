import { Component, computed, effect, inject } from '@angular/core';
import { DashboardStateService } from '@core/services/dashboard-state-service';
import { HeaderService } from '@core/services/header/header-service';
import { SearchBar } from '@shared/components/search-bar/search-bar';

@Component({
  selector: 'app-dashboard-eventos',
  imports: [SearchBar],
  templateUrl: './dashboard-eventos.html',
  styleUrl: './dashboard-eventos.scss',
})
export class DashboardEventos {
  private headerService = inject(HeaderService);
  private dashboardState = inject(DashboardStateService);

  protected readonly usuarioLogado = this.dashboardState.usuarioLogado;

  protected readonly permissoes = computed(() => {
    const perfil = this.usuarioLogado()?.perfil;

    return {
      criar: perfil === 'ADMIN',
      editar: perfil === 'ADMIN' || perfil === 'GESTOR',
      excluir: perfil === 'ADMIN',
      visualizar: perfil === 'ADMIN' || perfil === 'GESTOR' || perfil === 'MONITOR'
    };
  });

  constructor() {
    effect(() => {
      const podeCriar = this.permissoes().criar;

      this.headerService.definirCabecalho(
        'Eventos',
        'Eventos',
        'Competições, festivais e atividades programadas nas quadras.',
        podeCriar ? {
          label: 'Novo evento',
          icon: 'add',
          color: 'primary',
          action: () => this.abrirModalCriar()
        } : undefined
      );
    });
  };

  abrirModalCriar() { console.log(`Abrir modal de criação`)}
}
