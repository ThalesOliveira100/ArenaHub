import { inject, Injectable } from '@angular/core';
import { AutenticacaoService } from '@core/auth/autenticacao.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { of, switchMap } from 'rxjs';
import { GradeHorarioService } from './grade-horario-service';
import { QuadrasStateService } from '../quadras/quadras-state-service';

@Injectable({
  providedIn: 'root',
})
export class GradesStateService {
  private authService = inject(AutenticacaoService);
  private gradesService = inject(GradeHorarioService);
  private quadrasService = inject(QuadrasStateService);
  private usuarioLogado = this.authService.usuarioLogado;
  private quadrasPorUsuario = this.quadrasService.quadrasPorUsuario;

  public readonly gradesDoUsuario = toSignal(
    toObservable(this.usuarioLogado).pipe(
      switchMap((usuario) => {
        if (!usuario || !usuario.id) return of([]);
        if (usuario.perfil === 'ADMIN') return this.gradesService.getGradeHorarios();

        const quadras = this.quadrasPorUsuario();
        if (quadras.length === 0) return of([]);

        const ids = quadras.map((q) => q.id);
        return this.gradesService.getGradesHorariosByQuadras(ids);
      }),
    ),
    { initialValue: [] },
  );
}
