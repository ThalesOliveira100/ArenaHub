import { Component, effect, inject } from '@angular/core';
import { HeaderService } from '@core/services/header/header-service';
import { RecursoEmDesenvolvimento } from '@shared/components/recurso-em-desenvolvimento/recurso-em-desenvolvimento';

@Component({
  selector: 'app-dashboard-config',
  imports: [RecursoEmDesenvolvimento],
  templateUrl: './dashboard-config.html',
  styleUrl: './dashboard-config.scss',
})
export class DashboardConfig {
  private headerService = inject(HeaderService);

  constructor() {
    effect(() => {
      this.headerService.definirCabecalho(
        'Configurações',
        'Configurações',
        'Configurações gerais do aplicativo.',
      );
    });
  };
}
