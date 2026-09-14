import { inject, Injectable } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { QuadrasService } from './quadras-service';
import { of, switchMap } from 'rxjs';
import { AutenticacaoService } from '@core/auth/autenticacao.service';

@Injectable({
  providedIn: 'root',
})
export class QuadrasStateService {
  private authService = inject(AutenticacaoService);
  private quadrasService = inject(QuadrasService);
  private usuarioLogado = this.authService.usuarioLogado;

  public readonly todasAsQuadras = toSignal(this.quadrasService.getQuadras(), { initialValue: [] });

  public readonly quadrasAtivas = toSignal(this.quadrasService.getQuadrasAtivas(), { initialValue: [] });

  public readonly quadrasPorUsuario = toSignal(
    toObservable(this.usuarioLogado).pipe(
      switchMap((usuario) => {
        if (!usuario || !usuario?.id) return of([]);
        if (usuario.perfil === 'MONITOR') return this.quadrasService.getQuadrasByMonitor(usuario.id);
        if (usuario.perfil === 'GESTOR') return this.quadrasService.getQuadrasByGestor(usuario.id);
        if (usuario.perfil === 'ADMIN') return this.quadrasService.getQuadras();

        return of([]);
      }),
    ),
    { initialValue: [] },
  );
}
