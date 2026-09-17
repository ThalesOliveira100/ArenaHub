import { inject, Injectable } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { QuadrasService } from './quadras-service';
import { BehaviorSubject, combineLatest, Observable, of, switchMap, tap } from 'rxjs';
import { AutenticacaoService } from '@core/auth/autenticacao.service';
import { Quadra } from '@core/models/quadra.model';

@Injectable({
  providedIn: 'root',
})
export class QuadrasStateService {
  private authService = inject(AutenticacaoService);
  private quadrasService = inject(QuadrasService);
  private usuarioLogado = this.authService.usuarioLogado;
  private usuarioLogado$ = toObservable(this.usuarioLogado);
  private refresh$ = new BehaviorSubject<void>(undefined);

  public readonly todasAsQuadras = toSignal(
    this.refresh$.pipe(
      switchMap(() => this.quadrasService.getQuadras()),
    ),
    { initialValue: [] },
  );

  public getQuadraPorId(id: number | string): Observable<Quadra> {
    return this.quadrasService.getQuadraPorId(Number(id));
  }

  public getQuadraPorIdMemoria(id: number | string): Quadra | undefined {
    const idNum = Number(id);
    return this.todasAsQuadras().find((q) => Number(q.id) === idNum);
  }

  public readonly quadrasAtivas = toSignal(
    this.refresh$.pipe(
      switchMap(() => this.quadrasService.getQuadrasAtivas()),
    ),
    { initialValue: [] },
  );

  public recarregar() {
    this.refresh$.next();
  }

  public readonly quadrasPorUsuario = toSignal(
    combineLatest([this.refresh$, this.usuarioLogado$]).pipe(
      switchMap(([_, usuario]) => {
        if (!usuario || !usuario?.id) return of([]);
        if (usuario.perfil === 'MONITOR') return this.quadrasService.getQuadrasByMonitor(usuario.id);
        if (usuario.perfil === 'GESTOR') return this.quadrasService.getQuadrasByGestor(usuario.id);
        if (usuario.perfil === 'ADMIN') return this.quadrasService.getQuadras();

        return of([]);
      })
    ),
    { initialValue: [] }
  );

  // --- MÉTODOS DE AÇÃO ---

  public criarQuadra(quadra: Omit<Quadra, 'id'> ) {
    return this.quadrasService.criarQuadra(quadra).pipe(
      tap(() => this.recarregar())
    );
  }

  public atualizarQuadra(id: number | string, quadra: Partial<Quadra>) {
    return this.quadrasService.atualizarQuadra(id, quadra).pipe(
      tap(() => this.recarregar())
    );
  }

  public deletarQuadra(id: number | string) {
    return this.quadrasService.deletarQuadra(id).pipe(
      tap(() => this.recarregar())
    );
  }
}
