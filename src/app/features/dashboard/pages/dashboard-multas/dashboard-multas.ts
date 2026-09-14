import { Component, effect, inject } from '@angular/core';
import { HeaderService } from '@core/services/header/header-service';
import { RecursoEmDesenvolvimento } from '@shared/components/recurso-em-desenvolvimento/recurso-em-desenvolvimento';

@Component({
  selector: 'app-dashboard-multas',
  imports: [RecursoEmDesenvolvimento],
  templateUrl: './dashboard-multas.html',
  styleUrl: './dashboard-multas.scss',
})
export class DashboardMultas {
  private headerService = inject(HeaderService);

  constructor() {
    effect(() => {
      this.headerService.definirCabecalho(
        'Multas',
        'Multas',
        'Consulte multas pendentes e registradas nas quadras.',
      );
    });
  };
}
