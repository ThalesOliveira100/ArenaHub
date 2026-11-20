import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { AtivosService } from './ativos-service';
import { AtivoImobilizado } from '@core/models/ativo-imobilizado.model';

@Injectable({
  providedIn: 'root',
})
export class AtivosStateService {
  private ativosService = inject(AtivosService)
  private refresh$ = new BehaviorSubject<void>(undefined);

  public readonly todosOsAtivos = toSignal(
    this.refresh$.pipe(
      switchMap(() => this.ativosService.getAtivos()),
    ),
    { initialValue: [] },
  );

  public getAtivosPorId(id: number): Observable<AtivoImobilizado[]> {
    return this.ativosService.getAtivosPorId(id);
  }

  public getAtivosPorQuadra(quadraId: number): Observable<AtivoImobilizado[]> {
    return this.ativosService.getAtivosPorQuadra(quadraId);
  }

  public recarregar() {
    this.refresh$.next();
  }
}
