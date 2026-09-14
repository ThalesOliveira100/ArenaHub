import { Component, effect, inject } from '@angular/core';
import { HeaderService } from '@core/services/header/header-service';
import { RecursoEmDesenvolvimento } from '@shared/components/recurso-em-desenvolvimento/recurso-em-desenvolvimento';

@Component({
  selector: 'app-dashboard-eventos',
  imports: [RecursoEmDesenvolvimento],
  templateUrl: './dashboard-eventos.html',
  styleUrl: './dashboard-eventos.scss',
})
export class DashboardEventos {
  private headerService = inject(HeaderService);

  constructor() {
    effect(() => {
      this.headerService.definirCabecalho(
        'Eventos',
        'Eventos',
        'Competições, festivais e atividades programadas nas quadras.'
      );
    });
  };
}
