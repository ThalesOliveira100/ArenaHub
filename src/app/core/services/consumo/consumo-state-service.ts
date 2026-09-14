import { inject, Injectable } from '@angular/core';
import { AutenticacaoService } from '@core/auth/autenticacao.service';
import { QuadrasStateService } from '../quadras/quadras-state-service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { forkJoin, map, of, switchMap } from 'rxjs';
import { RelatoriosConsumoService } from './relatorios-consumo-service';

@Injectable({
  providedIn: 'root',
})
export class ConsumoStateService {
  private authService = inject(AutenticacaoService);
  private quadrasService = inject(QuadrasStateService);
  private relatoriosConsumoService = inject(RelatoriosConsumoService);
  private usuarioLogado = this.authService.usuarioLogado;
  private quadrasPorUsuario = this.quadrasService.quadrasPorUsuario;


  public readonly dadosConsumoDoUsuario = toSignal(
    toObservable(this.quadrasPorUsuario).pipe(
      switchMap((quadras) => {
        const usuario = this.usuarioLogado();

        if (!quadras || quadras.length === 0 || !usuario || usuario.perfil === 'PUBLICO') return of([]);

        if (usuario.perfil === 'ADMIN') return this.relatoriosConsumoService.getDadosConsumo();

        const requests = quadras.map((q) => this.relatoriosConsumoService.getDadosConsumo(String(q.id)));

        return forkJoin(requests).pipe(map((resultados) => resultados.flat()));
      }),
    ),
    { initialValue: [] },
  );
}
