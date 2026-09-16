import { Component, effect, inject } from '@angular/core';
import { HeaderService } from '@core/services/header/header-service';
import { RecursoEmDesenvolvimento } from '@shared/components/recurso-em-desenvolvimento/recurso-em-desenvolvimento';

@Component({
  selector: 'app-dashboard-perfil',
  imports: [RecursoEmDesenvolvimento],
  templateUrl: './dashboard-perfil.html',
  styleUrl: './dashboard-perfil.scss',
})
export class DashboardPerfil {
  private headerService = inject(HeaderService);

  constructor() {
    effect(() => {
      this.headerService.definirCabecalho(
        'Perfil',
        [
          { label: 'Início', route: '/dashboard/geral'},
          { label: 'Perfil' }
        ],
        'Configurações e informações do perfil logado.',
      );
    });
  };
}
