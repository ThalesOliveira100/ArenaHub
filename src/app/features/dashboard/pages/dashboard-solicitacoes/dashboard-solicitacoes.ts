import { Component, effect, inject } from '@angular/core';
import { HeaderService } from '@core/services/header/header-service';
import { RecursoEmDesenvolvimento } from '@shared/components/recurso-em-desenvolvimento/recurso-em-desenvolvimento';

@Component({
  selector: 'app-dashboard-solicitacoes',
  imports: [RecursoEmDesenvolvimento],
  templateUrl: './dashboard-solicitacoes.html',
  styleUrl: './dashboard-solicitacoes.scss',
})
export class DashboardSolicitacoes {
  private headerService = inject(HeaderService);

  constructor() {
    effect(() => {
      this.headerService.definirCabecalho(
        'Solicitações',
        [
          { label: 'Início', route: '/dashboard/geral'},
          { label: 'Solicitações' }
        ],
        'Veja as solicitações de horários para as quadras.',
      );
    });
  };
}
