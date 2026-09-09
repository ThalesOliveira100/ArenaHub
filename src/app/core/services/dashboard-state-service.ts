import { RelatoriosConsumoService } from './relatorios-consumo-service';
import { EventosService } from './eventos-service';
import { GradeHorarioService } from './grade-horario-service';
import { QuadrasService } from './quadras-service';
import { computed, inject, Injectable } from '@angular/core';
import { AutenticacaoService } from '@core/auth/autenticacao.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { forkJoin, map, of, switchMap } from 'rxjs';
import { MultasService } from './multas-service';
import { UsuarioService } from './usuarios-service';
import { parseDataEHora } from '@core/utils/date.utils';

@Injectable({
  providedIn: 'root',
})
export class DashboardStateService {
  private authService = inject(AutenticacaoService);
  private quadrasService = inject(QuadrasService);
  private gradesService = inject(GradeHorarioService);
  private eventosService = inject(EventosService);
  private multasService = inject(MultasService);
  private usuariosService = inject(UsuarioService);
  private relatoriosConsumoService = inject(RelatoriosConsumoService);

  // Usuario logado
  public readonly usuarioLogado = this.authService.usuarioLogado;

  // Usuários
  public readonly todosOsUsuarios = toSignal(this.usuariosService.getUsuarios(), {initialValue: []});

  // Quadras
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

  public readonly todosOsEventos = toSignal(this.eventosService.getEventos(), { initialValue: []});

  public readonly eventosEmAndamento = computed(() => {
    const lista = this.todosOsEventos();
    if (!lista || lista.length === 0) return [];

    const agora = new Date();

    return lista.filter((evento) => {
      if (!evento?.data || !evento?.horaInicio || !evento?.horaFinal) return false;

      const inicio = parseDataEHora(evento.data, evento.horaInicio);
      const fim = parseDataEHora(evento.data, evento.horaFinal);

      return agora >= inicio && agora <= fim;
    });
  });

  public readonly eventosFuturos = computed(() => {
    const lista = this.todosOsEventos();
    if (!lista || lista.length === 0) return [];

    const agora = new Date();

    return lista.filter(evento => {
      if (!evento || !evento.data || !evento.horaFinal) return false;

      const dataHoraFim = parseDataEHora(evento.data, evento.horaFinal);

      return dataHoraFim >= agora;
    });
  });

  public readonly quantidadeEventosFuturos = computed(() => this.eventosFuturos().length);

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

  // Multas
  public readonly todasAsMultas = toSignal(this.multasService.getMultas(), { initialValue: [] });

  public readonly multasPendentes = toSignal(this.multasService.getMultasPendentes(), { initialValue: [] });
}
