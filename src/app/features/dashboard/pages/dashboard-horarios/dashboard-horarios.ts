import { Component, computed, effect, inject } from '@angular/core';
import { DashboardStateService } from '@core/services/dashboard-state-service';
import { HeaderService } from '@core/services/header/header-service';
import { RecursoEmDesenvolvimento } from '@shared/components/recurso-em-desenvolvimento/recurso-em-desenvolvimento';

@Component({
  selector: 'app-dashboard-horarios',
  imports: [RecursoEmDesenvolvimento],
  templateUrl: './dashboard-horarios.html',
  styleUrl: './dashboard-horarios.scss',
})
export class DashboardHorarios {
  private headerService = inject(HeaderService);

  constructor() {
    effect(() => {
      this.headerService.definirCabecalho(
        'Horários',
        'Horários',
        'Grade semanal de utilização das quadras.'
      );
    });
  };
}
