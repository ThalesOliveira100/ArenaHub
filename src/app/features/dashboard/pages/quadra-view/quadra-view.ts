import { CurrencyPipe } from '@angular/common';
import { Component, effect, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Usuario } from '@core/models/usuario.model';
import { AtivosService } from '@core/services/ativos/ativos-service';
import { GradesStateService } from '@core/services/grades/grades-state-service';
import { HeaderService } from '@core/services/header/header-service';
import { QuadrasStateService } from '@core/services/quadras/quadras-state-service';
import { UsuarioService } from '@core/services/user/usuarios-service';
import { DiaSemanaPipe } from '@shared/pipes/dia-semana.pipe';
import { forkJoin, of, switchMap } from 'rxjs';

interface EquipeQuadra {
  gestor: Usuario | null;
  monitores: Usuario[];
}

@Component({
  selector: 'app-quadra-view',
  imports: [
    CurrencyPipe,
    DiaSemanaPipe
  ],
  templateUrl: './quadra-view.html',
  styleUrl: './quadra-view.scss',
})
export class QuadraView {
  private headerService = inject(HeaderService);
  private quadrasState = inject(QuadrasStateService);
  private gradesState = inject(GradesStateService);
  private ativosService = inject(AtivosService);
  private userService = inject(UsuarioService);

  id = input<string>();

  protected readonly quadra = toSignal(
    toObservable(this.id).pipe(
      switchMap((id) => (id ? this.quadrasState.getQuadraPorId(id) : of(null)))
    )
  );

  protected readonly grades = toSignal(
    toObservable(this.quadra).pipe(
      switchMap((quadra) => (quadra ? this.gradesState.getGradesPorQuadra(this.quadra()!.id) : of(null)))
    ),
    { initialValue: [] }
  );

  protected readonly ativos = toSignal(
    toObservable(this.quadra).pipe(
      switchMap((quadra) => (quadra ? this.ativosService.getAtivosPorQuadra(this.quadra()!.id) : of(null)))
    ),
    { initialValue: [] }
  );

  protected readonly equipe = toSignal<EquipeQuadra, EquipeQuadra>(
    toObservable(this.quadra).pipe(
      switchMap((quadra) => {
        if (!quadra) return of({ gestor: null, monitores: [] });

        const gestor$ = quadra.gestorId
          ? this.userService.getUsuarioPorId(quadra.gestorId)
          : of(null);

        const monitores$ = quadra.monitoresId?.length
          ? forkJoin(quadra.monitoresId.map((mId) => this.userService.getUsuarioPorId(mId)))
          : of([]);

        return forkJoin({ gestor: gestor$, monitores: monitores$ });
      })
    ),
    { initialValue: { gestor: null, monitores: [] } }
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
          'Todos os detalhes da quadra selecionada.',
          {
            label: 'Editar',
            icon: 'edit',
            color: 'primary',
            action: () => console.log('funcionando')
          }
        )
      };
    });
  };
}
