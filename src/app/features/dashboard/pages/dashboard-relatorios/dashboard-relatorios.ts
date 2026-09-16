import { Component, effect, inject } from '@angular/core';
import { HeaderService } from '@core/services/header/header-service';
import { RecursoEmDesenvolvimento } from '@shared/components/recurso-em-desenvolvimento/recurso-em-desenvolvimento';

@Component({
  selector: 'app-dashboard-relatorios',
  imports: [RecursoEmDesenvolvimento],
  templateUrl: './dashboard-relatorios.html',
  styleUrl: './dashboard-relatorios.scss',
})
export class DashboardRelatorios {
  private headerService = inject(HeaderService);

  constructor() {
    effect(() => {
      this.headerService.definirCabecalho(
        'Relatórios',
        [
          { label: 'Início', route: '/dashboard/geral'},
          { label: 'Relatórios' }
        ],
        'Relatórios disponíveis no sistema.',
      );
    });
  };
}
