import { Component, effect, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { HeaderService } from '@core/services/header/header-service';
import { QuadrasService } from '@core/services/quadras/quadras-service';
import { QuadrasStateService } from '@core/services/quadras/quadras-state-service';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-quadra-view',
  imports: [],
  templateUrl: './quadra-view.html',
  styleUrl: './quadra-view.scss',
})
export class QuadraView {
  private headerService = inject(HeaderService);
  private quadrasState = inject(QuadrasStateService);

  id = input<string>();

  protected readonly quadra = toSignal(
    toObservable(this.id).pipe(
      switchMap((id) => (id ? this.quadrasState.getQuadraPorId(id) : of(null)))
    )
  );

  constructor() {
    effect(() => {
      const q = this.quadra();

      if (q) {
        this.headerService.definirCabecalho(
          q.nome,
          [
            { label: 'Início', route: '/dashboard/geral' },
            { label: 'Quadras', route: '/dashboard/quadras' },
            { label: q.nome }
          ],
          q.descricao || 'Detalhes da quadra selecionada.'
        )
      };
    });
  };
}
