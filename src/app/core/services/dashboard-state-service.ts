import { RelatoriosConsumoService } from './relatorios-consumo-service';
import { EventosService } from './eventos-service';
import { GradeHorarioService } from './grade-horario-service';
import { QuadrasService } from './quadras-service';
import { computed, inject, Injectable } from '@angular/core';
import { AutenticacaoService } from '@core/auth/autenticacao.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { forkJoin, map, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardStateService {
  private authService = inject(AutenticacaoService);
  private quadrasService = inject(QuadrasService);
  private gradesService = inject(GradeHorarioService);
  private eventosService = inject(EventosService);
  private relatoriosConsumoService = inject(RelatoriosConsumoService);

  // Usuario
  public readonly usuarioLogado = this.authService.usuarioLogado;

  // Quadras
  public readonly todasAsQuadras = toSignal(this.quadrasService.getQuadras(), { initialValue: [] });

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

  // Grade de Horarios
  public readonly gradesDoUsuario = toSignal(
    toObservable(this.usuarioLogado).pipe(
      switchMap((usuario) => {
        if (!usuario || !usuario.id) return of([]);
        if (usuario.perfil === 'ADMIN') return this.gradesService.getGradeHorarios();

        const quadras = this.quadrasPorUsuario();
        if (quadras.length === 0) return of([]);

        const ids = quadras.map((q) => q.id);
        return this.quadrasService.getGradesHorariosByQuadras(ids);
      }),
    ),
    { initialValue: [] },
  );

  // Relatório Dados Consumo
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

  public readonly dadosConsumoMensalOcupacaoQuadra = computed(() => {
    return this.dadosConsumoDoUsuario();
  });

  // Eventos
  public readonly eventosDoUsuario = toSignal(
    toObservable(this.usuarioLogado).pipe(
      switchMap((usuario) => {
        if (!usuario || !usuario.id) {
          return of([]);
        }

        if (usuario.perfil === 'ADMIN') {
          return this.eventosService.getEventos();
        }

        const quadras = this.quadrasPorUsuario();
        if (quadras.length === 0) {
          return of([]);
        }

        const ids = quadras.map((q) => q.id);
        const requests = ids.map(id => this.eventosService.getEventosPorQuadra(id));

        return forkJoin(requests).pipe(
          map(resultados => resultados.flat())
        );
      }),
    ),
    { initialValue: [] },
  );

  public readonly eventosFormatados = computed(() => {
    const eventos = this.eventosDoUsuario();
    const quadras = this.todasAsQuadras();

    if (!eventos || eventos.length === 0) return [];

    return eventos.map(evento => {
      const quadra = quadras.find(q => q.id === evento.quadraId);

      return {
        ...evento,
        nomeQuadra: quadra ? quadra.nome : `Quadra (ID: ${evento.quadraId})`
      };
    });
  });
}
