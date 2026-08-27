import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { BasicCard } from '../basic-card/basic-card';
import { RouterLink } from '@angular/router';
import { QuadrasService } from '@core/services/quadras-service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-main-page',
  imports: [
    BasicCard,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    RouterLink
  ],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss',
})
export class MainPage {
  private quadrasService = inject(QuadrasService);

  protected readonly quadras = toSignal(
    this.quadrasService.getQuadras(),
    { initialValue: [] }
  );

  protected getQuantQuadrasCadastradas = computed(() => {
    const lista = this.quadras();
    return lista ? lista.length : 0
  });

  protected readonly quantQuadrasAtivas: number = 3;
  protected readonly quantEventosAgendados: number = 3;
  protected readonly quantPerfisDeAcesso: number = 67;

}
